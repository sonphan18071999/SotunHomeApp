import type { ExpenseCategory, FeeAdjustmentType } from '@/types/entities';

export const FEE_ADJUSTMENT_TYPES: readonly { value: FeeAdjustmentType; label: string }[] = [
  { value: 'Cleaning', label: 'Cleaning' },
  { value: 'Extra bed', label: 'Extra bed' },
  { value: 'Pet', label: 'Pet' },
  { value: 'Early check-in', label: 'Early check-in' },
  { value: 'Late check-out', label: 'Late check-out' },
  { value: 'Service', label: 'Service' },
  { value: 'Discount', label: 'Discount' },
] as const;

export const EXPENSE_CATEGORIES: readonly { value: ExpenseCategory; label: string }[] = [
  { value: 'Utilities', label: 'Utilities' },
  { value: 'Staff', label: 'Staff' },
  { value: 'Laundry', label: 'Laundry' },
  { value: 'Amenities', label: 'Amenities' },
  { value: 'Repair', label: 'Repair' },
  { value: 'Platform fee', label: 'Platform fee' },
  { value: 'Tax', label: 'Tax' },
  { value: 'Other', label: 'Other' },
] as const;
