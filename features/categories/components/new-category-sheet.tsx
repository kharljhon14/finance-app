import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useNewCategory } from '../hooks/use-new-category';
import AccountForm, { NewCategoryFormValues } from './category-form';
import { useCreateCategory } from '../hooks/api/use-create-category';

export default function NewCategorySheet() {
  const { isOpen, onClose } = useNewCategory();
  const mutation = useCreateCategory();

  const onSubmit = (values: NewCategoryFormValues) => {
    mutation.mutate(values, {
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
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>Create a new category to track your transactions.</SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: '' }}
        />
      </SheetContent>
    </Sheet>
  );
}
