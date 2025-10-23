import BoardCard from '@/components/shared/board-card';
import CreateBoard from '@/components/shared/create-board';
import { useBoards } from '@/hooks/use-board';

export default function Boards() {
  const { data: boards, isPending } = useBoards();

  return (
    <div>
      <CreateBoard />

      <h1 className='font-bold text-2xl mb-4'>Boards</h1>
      {!isPending && boards && (
        <ul className='flex flex-row flex-wrap gap-4'>
          {boards?.map((board) => (
            <BoardCard key={board.hashId} {...board} />
          ))}
        </ul>
      )}
      {!isPending && !boards && (
        <p className='text-muted-foreground text-sm'>No boards found</p>
      )}
      {isPending && (
        <p className='text-muted-foreground text-sm'>Loading boards...</p>
      )}
    </div>
  );
}
