import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TCard } from '@/types';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { createCardSchema, type CreateCardSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteCard, useUpdateCard } from '@/hooks/use-cards';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type Props = {
  card: TCard;
};

export function CardItem({ card }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const { mutateAsync: updateCard, isPending: isPendingUpdate } =
    useUpdateCard();
  const { mutateAsync: deleteCard, isPending: isPendingDelete } =
    useDeleteCard();

  const form = useForm<CreateCardSchema>({
    resolver: zodResolver(createCardSchema),
    defaultValues: { name: card.name, description: card.description },
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  function handleSubmit(data: CreateCardSchema) {
    updateCard({ id: card._id, ...data });
    setIsEditing(false);
    form.reset();
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='p-2 bg-white border rounded-md shadow-sm'
    >
      <div className='flex flex-row gap-2 items-center justify-between'>
        {isEditing ? (
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => <input {...field} />}
          />
        ) : (
          <h4 className='font-semibold flex-1 truncate'>{card.name}</h4>
        )}
        <div className='flex items-center gap-2'>
          {/* Drag handle: attach sortable attributes/listeners here so other buttons stay interactive */}
          <button
            type='button'
            {...attributes}
            {...listeners}
            aria-label='drag-handle'
            className='p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-menu'
            >
              <path d='M3 12h18M3 6h18M3 18h18' />
            </svg>
          </button>

          <Button
            variant={'secondary'}
            size={'icon'}
            className='p-1! size-8'
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className='h-2 w-2' />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={'destructive'}
                size={'icon'}
                className='p-1! size-8'
              >
                <Trash2 className='h-2 w-2' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this card and remove data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isPendingDelete}>
                  Cancel
                </AlertDialogCancel>
                <Button
                  variant={'destructive'}
                  onClick={() => deleteCard(card._id)}
                  disabled={isPendingDelete}
                >
                  {isPendingDelete ? 'Deleting...' : 'Delete'}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Dialog modal open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit card</DialogTitle>
            <DialogDescription>
              Fill the form to edit the card
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='flex flex-col gap-4'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex flex-col'>
                      <Label>Name</Label>

                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex flex-col'>
                      <Label>Description</Label>

                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex gap-2'>
                <Button type='submit' disabled={isPendingUpdate}>
                  Save
                </Button>
                <Button
                  type='reset'
                  disabled={isPendingUpdate}
                  variant={'secondary'}
                  onClick={() => {
                    console.log('cancel');
                    setIsEditing(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
