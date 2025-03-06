//@ts-nocheck
import React, { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import data from '../../data.json';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [selectedStore, setSelectedStore] = useState(
    data.Stores[0]?.Label || ''
  );

  const chartData = useMemo(
    () => generateChartData(selectedStore, data),
    [selectedStore, data]
  );

  return (
    <div className='chart-container'>
      <select
        className='rounded border p-2'
        value={selectedStore}
        onChange={(e) => setSelectedStore(e.target.value)}
      >
        {data.Stores.map((store) => (
          <option key={store.ID} value={store.Label}>
            {store.Label}
          </option>
        ))}
      </select>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

const generateChartData = (storeLabel, data) => {
  const storeData = data.Stores.find((store) => store.Label === storeLabel);
  if (!storeData) return { labels: [], datasets: [] };

  const weeks = data.Calendar.map((week) => week.Week);
  const totalGMDollars = {};
  const totalSalesDollars = {};

  weeks.forEach((week) => {
    totalGMDollars[week] = 0;
    totalSalesDollars[week] = 0;
  });

  data.Planning.forEach((plan) => {
    if (plan.Store === storeData.ID) {
      totalGMDollars[plan.Week] +=
        (plan.SalesUnits || 0) *
          (data.SKUs.find((sku) => sku.ID === plan.SKU)?.Price || 0) -
        (plan.SalesUnits || 0) *
          (data.SKUs.find((sku) => sku.ID === plan.SKU)?.Cost || 0);
      totalSalesDollars[plan.Week] +=
        (plan.SalesUnits || 0) *
        (data.SKUs.find((sku) => sku.ID === plan.SKU)?.Price || 0);
    }
  });

  const gmPercent = weeks.map((week) =>
    totalSalesDollars[week] !== 0
      ? totalGMDollars[week] / totalSalesDollars[week]
      : 0
  );

  return {
    labels: weeks,
    datasets: [
      {
        label: 'GM Dollars',
        data: weeks.map((week) => totalGMDollars[week]),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        yAxisID: 'y',
      },
      {
        label: 'GM %',
        data: gmPercent.map((value) => value * 100),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        yAxisID: 'y1',
      },
    ],
  };
};

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      type: 'linear',
      position: 'left',
      title: { display: true, text: 'GM Dollars' },
    },
    y1: {
      type: 'linear',
      position: 'right',
      title: { display: true, text: 'GM %' },
      grid: { drawOnChartArea: false },
    },
  },
};

export default Chart;
