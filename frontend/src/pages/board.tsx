import DndCards from '@/components/shared/card/dnd-cards';
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
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useBoard, useDeleteBoard, useUpdateBoard } from '@/hooks/use-board';
import { useReorderCards } from '@/hooks/use-cards';
import { createBoardSchema, type CreateBoardSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Edit, Trash2, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Board() {
  const [isEdit, setISEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: board, isPending, error } = useBoard();
  const { mutate: deleteBoard, isPending: isDeleting } = useDeleteBoard();
  const { mutate: updateBoard } = useUpdateBoard();
  const { mutate: reorderCards } = useReorderCards();

  const form = useForm<CreateBoardSchema>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: { name: board?.board.name },
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  function handleEdit() {
    form.reset({ name: board!.board.name });
    setISEdit(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }

  function handleUpdate(data: CreateBoardSchema) {
    if (!inputRef.current) return;
    updateBoard(
      { board: data, id: board!.board._id },
      { onSuccess: () => setISEdit(false) }
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
        {isEdit ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className='flex w-full'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='w-full flex flex-row'>
                    <div className='flex flex-col flex-1'>
                      <FormControl>
                        <Input {...field} className='w-full' ref={inputRef} />
                      </FormControl>
                      <FormMessage />
                    </div>
                    <Button variant='success' type='submit'>
                      <Check className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='destructive'
                      onClick={() => setISEdit(false)}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        ) : (
          <h1 className='text-2xl font-bold'>{board.board.name}</h1>
        )}

        <div className='flex flex-row items-center gap-2'>
          {!isEdit && (
            <>
              <Button variant='secondary' onClick={handleEdit}>
                <Edit className='h-4 w-4' />
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
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this board and remove data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>
                      Cancel
                    </AlertDialogCancel>
                    <Button
                      variant={'destructive'}
                      onClick={() => deleteBoard(board.board._id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>

      <DndCards
        boardId={board.board._id}
        cards={board.cards}
        onReorder={reorderCards}
      />
    </div>
  );
}
