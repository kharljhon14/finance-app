import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';

import TransactionForm, { ApiTransactionFormValues } from './transaction-form';

import { Loader2 } from 'lucide-react';

import { useConfirm } from '@/hooks/use-confirm';
import { useCreateAccount } from '@/features/accounts/hooks/api/use-create-account';
import { useGetAccounts } from '@/features/accounts/hooks/api/use-get-accounts';
import { useCreateCategory } from '@/features/categories/hooks/api/use-create-category';
import { useGetCategories } from '@/features/categories/hooks/api/use-get-categories';
import { useUpdateTransaction } from '../hooks/api/use-update-transaction';
import { useGetTransaction } from '../hooks/api/use-get-transaction';
import { useOpenTransaction } from '../hooks/use-open-transaction';
import { useDeleteTransaction } from '../hooks/api/use-delete-transaction';
import { convertAmountFromMiliunits } from '@/lib/utils';

export default function EditTransactoinSheet() {
  const { id, isOpen, onClose } = useOpenTransaction();

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this transaction.'
  );

  const transactionQuery = useGetTransaction(id);
  const updateMutation = useUpdateTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const categoryMutation = useCreateCategory();
  const categoriesQuery = useGetCategories();
  const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
  const categoryOptions = (categoriesQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id
  }));

  // ACCOUNTS
  const accountMutation = useCreateAccount();
  const accountsQuery = useGetAccounts();
  const onCreateAccount = (name: string) => accountMutation.mutate({ name });
  const accountOptions = (accountsQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id
  }));

  const isPending =
    deleteMutation.isPending ||
    transactionQuery.isLoading ||
    updateMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading =
    transactionQuery.isLoading || categoriesQuery.isLoading || accountsQuery.isLoading;

  const onSubmit = (values: ApiTransactionFormValues) => {
    updateMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  };

  console.log(transactionQuery.data);

  const defaultValues = transactionQuery.data
    ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        amount: convertAmountFromMiliunits(transactionQuery.data.amount).toString(),
        date: transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes
      }
    : {
        accountId: '',
        categoryId: '',
        amount: '',
        date: new Date(),
        payee: '',
        notes: ''
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet
        open={isOpen}
        onOpenChange={onClose}
      >
        <SheetContent>
          <SheetHeader className="text-center">
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className=" absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin size-4 text-muted-foreground" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
