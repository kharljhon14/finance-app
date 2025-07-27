import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { insertTransactionsSchema } from '@/db/schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import Select from '@/components/select';
import DatePicker from '@/components/date-picker';
import { Textarea } from '@/components/ui/textarea';

const newTransactionFormSchema = z.object({
  date: z.coerce.date<Date>(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional()
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiSchema = insertTransactionsSchema.omit({
  id: true
});

export type NewTransactionFormValues = z.input<typeof newTransactionFormSchema>;
export type ApiTransactionFormValues = z.input<typeof apiSchema>;
interface Props {
  id?: string;
  defaultValues?: NewTransactionFormValues;
  onSubmit: (values: ApiTransactionFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
}

export default function TransactionForm({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
  disabled
}: Props) {
  const form = useForm<NewTransactionFormValues>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues
  });

  const handleOnSubmit: SubmitHandler<NewTransactionFormValues> = (values) => {
    console.log(values);
  };

  const handleOnDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4 pt-4 mx-4"
        onSubmit={form.handleSubmit(handleOnSubmit)}
      >
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select an account"
                  options={accountOptions}
                  onCreate={onCreateAccount}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select a category"
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={disabled}
                  placeholder="Add a payee"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ''}
                  disabled={disabled}
                  placeholder="Optional notes"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          disabled={disabled}
        >
          {id ? 'Save Changes' : 'Create Transaction'}
        </Button>
        {!!id && (
          <Button
            className="w-full"
            type="button"
            disabled={disabled}
            onClick={handleOnDelete}
            variant="outline"
          >
            <Trash /> <p>Delete Transaction</p>
          </Button>
        )}
      </form>
    </Form>
  );
}
