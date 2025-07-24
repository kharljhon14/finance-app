import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';

import AccountForm, { NewAccountFormValues } from './account-form';

import { useOpenAccount } from '../hooks/use-open-account';
import { useGetAccount } from '../hooks/api/use-get-account';
import { Loader2 } from 'lucide-react';
import { useUpdateAccount } from '../hooks/api/use-update-account';
import { useDeleteAccount } from '../hooks/api/use-delete-account';
import { useConfirm } from '@/hooks/use-confirm';

export default function EditAccountSheet() {
  const { id, isOpen, onClose } = useOpenAccount();

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this account.'
  );

  const accountQuery = useGetAccount(id);
  const updateMutation = useUpdateAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const isLoading = accountQuery.isLoading;
  const isPending = updateMutation.isPending || deleteMutation.isPending;

  const onSubmit = (values: NewAccountFormValues) => {
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

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name
      }
    : {
        name: ''
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
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className=" absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin size-4 text-muted-foreground" />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
