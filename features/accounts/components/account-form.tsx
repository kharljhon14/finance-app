import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { insertAccountSchema } from '@/db/schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

const newAccountFormSchema = insertAccountSchema.pick({
  name: true
});

export type NewAccountFormValues = z.input<typeof newAccountFormSchema>;

interface Props {
  id?: string;
  defaultValues?: NewAccountFormValues;
  onSubmit: (values: NewAccountFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
}

export default function AccountForm({ id, defaultValues, onSubmit, onDelete, disabled }: Props) {
  const form = useForm<NewAccountFormValues>({
    resolver: zodResolver(newAccountFormSchema),
    defaultValues
  });

  const handleOnSubmit: SubmitHandler<NewAccountFormValues> = (values) => {
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
          {id ? 'Save changes' : 'Create account'}
        </Button>
        {!!id && (
          <Button
            className="w-full"
            type="button"
            disabled={disabled}
            onClick={handleOnDelete}
            variant="outline"
          >
            <Trash /> <p>Delete Account</p>
          </Button>
        )}
      </form>
    </Form>
  );
}
