import { useDroppable } from '@dnd-kit/core';
import type { ColumnType, TCard } from '@/types';
import { CardItem } from './card-item';
import CreateCard from './create-card';

type Props = {
  boardId: string;
  column: ColumnType;
  title: string;
  cards: TCard[];
};

export function Column({ column, title, cards, boardId }: Props) {
  const { setNodeRef } = useDroppable({ id: column });

  return (
    <div className='flex-1 bg-gray-100 p-4 rounded-xl min-h-[400px]'>
      <h2 className='font-semibold mb-3'>{title}</h2>
      <div ref={setNodeRef} className='flex flex-col gap-3'>
        {cards
          .sort((a, b) => a.position - b.position)
          .map((card) => (
            <CardItem key={card._id} card={card} />
          ))}
        {column === 'todo' && <CreateCard boardId={boardId} />}
      </div>
    </div>
  );
}
