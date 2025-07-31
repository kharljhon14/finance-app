import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { JSX, useRef, useState } from 'react';
import { useGetAccounts } from './api/use-get-accounts';
import { useCreateAccount } from './api/use-create-account';
import Select from '@/components/select';

export function useSelectAccount(): [() => JSX.Element, () => Promise<unknown>] {
  const accountsQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name
    });

  const accountOptions = (accountsQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id
  }));

  const [promise, setPromise] = useState<{ resolve: (value?: string) => void } | null>(null);
  const selectvalue = useRef<string | undefined>(undefined);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(selectvalue.current);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const AccountDialog = () => (
    <Dialog
      open={promise !== null}
      onOpenChange={(open) => !open && handleCancel()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>Please select an account to continue.</DialogDescription>
        </DialogHeader>
        <Select
          placeholder="Select an account"
          options={accountOptions}
          onCreate={onCreateAccount}
          onChange={(value) => (selectvalue.current = value)}
          disabled={accountsQuery.isLoading || accountMutation.isPending}
        />
        <DialogFooter className=" pt-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [AccountDialog, confirm];
}
