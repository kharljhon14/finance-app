'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useDeleteAccount } from '@/features/accounts/hooks/api/use-delete-account';

import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction';
import { useConfirm } from '@/hooks/use-confirm';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';

interface Props {
  id: string;
}

export default function Actions({ id }: Props) {
  const { onOpen } = useOpenTransaction();
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'Your are about to delete this trasaction.'
  );
  const deleteMutation = useDeleteAccount(id);

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };
  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="size-8 p-0"
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={false}
            onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={false}
            onClick={handleDelete}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
