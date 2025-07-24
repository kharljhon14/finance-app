import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';

import AccountForm, { NewCategoryFormValues } from './category-form';

import { useOpenCategory } from '../hooks/use-open-category';
import { useGetCategory } from '../hooks/api/use-get-category';
import { Loader2 } from 'lucide-react';
import { useUpdateCategory } from '../hooks/api/use-update-category';
import { useDeleteCategory } from '../hooks/api/use-delete-category';
import { useConfirm } from '@/hooks/use-confirm';

export default function EditCategorySheet() {
  const { id, isOpen, onClose } = useOpenCategory();

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this category.'
  );

  const categoryQuery = useGetCategory(id);
  const updateMutation = useUpdateCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isLoading = categoryQuery.isLoading;
  const isPending = updateMutation.isPending || deleteMutation.isPending;

  const onSubmit = (values: NewCategoryFormValues) => {
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

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name
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
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category.</SheetDescription>
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
