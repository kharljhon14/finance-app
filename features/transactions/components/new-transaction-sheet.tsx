import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useNewTransaction } from '../hooks/use-new-transaction';
import TransactionForm, { ApiTransactionFormValues } from './transaction-form';

import { useCreateTransaction } from '../hooks/api/use-create-transaction';
import { useCreateCategory } from '@/features/categories/hooks/api/use-create-category';
import { useGetCategories } from '@/features/categories/hooks/api/use-get-categories';
import { Loader2 } from 'lucide-react';

export default function NewTransactionSheet() {
  const { isOpen, onClose } = useNewTransaction();

  const categoryMutation = useCreateCategory();
  const categoriesQuery = useGetCategories();
  const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
  const categoryOptions = (categoriesQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id
  }));

  // ACCOUNTS
  const accountMutation = useCreateCategory();
  const accountsQuery = useGetCategories();
  const onCreateAccount = (name: string) => accountMutation.mutate({ name });
  const accountOptions = (accountsQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id
  }));

  const createMutation = useCreateTransaction();

  const isPending =
    createMutation.isPending || categoryMutation.isPending || accountMutation.isPending;

  const isLoading = categoriesQuery.isLoading || accountsQuery.isLoading;

  const onSubmit = (values: ApiTransactionFormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={onClose}
    >
      <SheetContent>
        <SheetHeader className="text-center">
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add a new transaction.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
