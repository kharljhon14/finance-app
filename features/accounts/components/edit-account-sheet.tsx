import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';

import AccountForm, { NewAccountFormValues } from './account-form';
import { useCreateAccount } from '../hooks/api/use-create-account';
import { useOpenAccount } from '../hooks/use-open-account';
import { useGetAccount } from '../hooks/api/use-get-account';
import { Loader2 } from 'lucide-react';

export default function EditAccountSheet() {
  const { id, isOpen, onClose } = useOpenAccount();

  const accountQuery = useGetAccount(id);
  const mutation = useCreateAccount();

  const isLoading = accountQuery.isLoading;

  const onSubmit = (values: NewAccountFormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name
      }
    : {
        name: ''
      };

  return (
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
            disabled={mutation.isPending}
            defaultValues={defaultValues}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
