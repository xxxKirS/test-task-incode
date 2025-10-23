import { Button } from '@/components/ui/button';
import { useBoard, useDeleteBoard } from '@/hooks/use-board';
import { Check, Edit, Trash2, X } from 'lucide-react';
import { useState } from 'react';

export default function Board() {
  const [isEdit, setISEdit] = useState(false);
  const { data: board, isPending, error } = useBoard();

  const { mutate: deleteBoard, isPending: isDeleting } = useDeleteBoard();

  if (isPending) return <div>Loading...</div>;

  console.log(board);

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
        <h1 className='text-2xl font-bold'>{board.board.name}</h1>

        <div className='flex flex-row items-center gap-2'>
          {!isEdit && (
            <>
              <Button variant='secondary' onClick={() => setISEdit(true)}>
                <Edit className='h-4 w-4' />
              </Button>
              <Button
                variant='destructive'
                disabled={isDeleting}
                onClick={() => deleteBoard(board.board._id)}
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            </>
          )}
          {isEdit && (
            <>
              <Button variant='success' onClick={() => setISEdit(false)}>
                <Check className='h-4 w-4' />
              </Button>
              <Button variant='destructive' onClick={() => setISEdit(false)}>
                <X className='h-4 w-4' />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
