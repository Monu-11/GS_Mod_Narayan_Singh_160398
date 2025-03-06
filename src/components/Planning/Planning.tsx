// @ts-nocheck
import React, { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import data from '../../data.json';
import {
  CalendarProps,
  PlanningProps,
  SKUProps,
  StoreProps,
} from '@/core/types';

ModuleRegistry.registerModules([AllCommunityModule]);

const Planning = () => {
  const rowData = useMemo(() => generateRowData(data), [data]);
  const columnDefs = useMemo(
    () => generateCalendarColumns(data.Calendar),
    [data.Calendar]
  );

  const onCellValueChanged = useCallback((params: any) => {
    if (!params.colDef.field.includes('_salesUnits')) return;

    const week = params.colDef.field.split('_')[0];
    params.node.setData({
      ...params.data,
      [`${week}_salesDollars`]:
        params.data[`${week}_salesUnits`] * params.data.price,
      [`${week}_gmDollars`]:
        params.data[`${week}_salesDollars`] -
        params.data[`${week}_salesUnits`] * params.data.cost,
      [`${week}_gmPercent`]:
        params.data[`${week}_salesDollars`] !== 0
          ? params.data[`${week}_gmDollars`] /
            params.data[`${week}_salesDollars`]
          : 0,
    });
  }, []);

  return (
    <div className='ag-theme-alpine' style={{ height: 600, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs as any}
        defaultColDef={{ resizable: true, sortable: true, filter: true }}
        onCellValueChanged={onCellValueChanged}
      />
    </div>
  );
};

// **Generate Cross-Joined Data Efficiently**
const generateRowData = (data: {
  Stores: StoreProps[];
  SKUs: SKUProps[];
  Calendar: CalendarProps[];
  Planning: PlanningProps[];
}) => {
  return data.Stores.flatMap((store) =>
    data.SKUs.map((sku) => {
      const row = {
        store: store.Label,
        sku: sku.Label,
        price: sku.Price,
        cost: sku.Cost,
      };
      data.Calendar.forEach((week) => {
        const plan = data.Planning.find(
          (p) =>
            p.Store === store.ID && p.SKU === sku.ID && p.Week === week.Week
        );
        const salesUnits = plan?.SalesUnits || 0;
        row[`${week.Week}_salesUnits`] = salesUnits;
        row[`${week.Week}_salesDollars`] = salesUnits * sku.Price;
        row[`${week.Week}_gmDollars`] =
          row[`${week.Week}_salesDollars`] - salesUnits * sku.Cost;
        row[`${week.Week}_gmPercent`] =
          row[`${week.Week}_salesDollars`] !== 0
            ? row[`${week.Week}_gmDollars`] / row[`${week.Week}_salesDollars`]
            : 0;
      });
      return row;
    })
  );
};

// **Generate Calendar Columns Efficiently**
const generateCalendarColumns = (calendarData: CalendarProps[]) => {
  const weeksByMonth = groupWeeksByMonth(calendarData);
  return [
    { field: 'store', headerName: 'Store', pinned: 'left', width: 200 },
    { field: 'sku', headerName: 'SKU', pinned: 'left', width: 200 },
    ...Object.entries(weeksByMonth).map(([month, weeks]) => ({
      headerName: month,
      children: weeks.map((week) => ({
        headerName: week.Week,
        children: [
          {
            headerName: 'Sales Units',
            field: `${week.Week}_salesUnits`,
            editable: true,
          },
          {
            headerName: 'Sales $',
            field: `${week.Week}_salesDollars`,
            valueFormatter: formatCurrency,
          },
          {
            headerName: 'GM $',
            field: `${week.Week}_gmDollars`,
            valueFormatter: formatCurrency,
          },
          {
            headerName: 'GM %',
            field: `${week.Week}_gmPercent`,
            valueFormatter: formatPercentage,
            cellStyle: getGMCellStyle,
          },
        ],
      })),
    })),
  ];
};

// **Group Weeks by Month**
const groupWeeksByMonth = (calendarData: CalendarProps[]) =>
  calendarData.reduce(
    (acc, week) => {
      acc[week.MonthLabel] = acc[week.MonthLabel] || [];
      acc[week.MonthLabel].push(week);
      return acc;
    },
    {} as Record<string, CalendarProps[]>
  );

// **Utility Functions**
const formatCurrency = (params: { value: number }) =>
  `$${params.value.toFixed(2)}`;
const formatPercentage = (params: { value: number }) =>
  `${(params.value * 100).toFixed(1)}%`;

const getGMCellStyle = (params: { value: number }) => {
  const value = params.value;
  return value >= 0.4
    ? { backgroundColor: 'green', color: 'white' }
    : value >= 0.1
      ? { backgroundColor: 'yellow', color: 'black' }
      : value > 0.05
        ? { backgroundColor: 'orange', color: 'black' }
        : { backgroundColor: 'red', color: 'white' };
};

export default Planning;
