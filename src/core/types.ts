import { number, z } from 'zod';
import { userSchema } from '@/schema';

export type AuthFormData = z.infer<typeof userSchema>;

export interface StoreProps {
  SeqNo: number;
  ID: string;
  Label: string;
  City: string;
  State: string;
}

export interface SKUProps {
  ID: string;
  Label: string;
  Class: string;
  Department: string;
  Price: number;
  Cost: number;
}

export interface PlanningProps {
  Store: string;
  SKU: string;
  Week: string;
  SalesUnits: number;
}

export interface CalendarProps {
  SeqNo: number;
  WeekLabel: string;
  Week: string;
  Month: string;
  MonthLabel: string;
}
