import { z } from 'zod';
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
