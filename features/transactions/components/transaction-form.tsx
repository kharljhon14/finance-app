import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { insertTransactionsSchema } from '@/db/schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

const newTransactionFormSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional()
});

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
    onSubmit(values);
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
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g. Cash, Bank, Credit Card"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          disabled={disabled}
        >
          {id ? 'Save Changes' : 'Create Account'}
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
