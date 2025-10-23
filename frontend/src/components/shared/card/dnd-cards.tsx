import type { TCard, TReorder, ColumnType } from '@/types';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Column } from './column';
import { useState, useEffect } from 'react';

const columns = [
  { key: 'todo', title: 'To Do' },
  { key: 'in_progress', title: 'In Progress' },
  { key: 'done', title: 'Done' },
] as const;

interface Props {
  boardId: string;
  cards: TCard[];
  onReorder: (updates: TReorder[]) => void;
}

export default function DndCards({ boardId, cards, onReorder }: Props) {
  const [localCards, setLocalCards] = useState<TCard[]>(cards);

  useEffect(() => {
    setLocalCards(cards);
  }, [cards]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeCard = localCards.find((c) => c._id === activeId);
    const overCard = localCards.find((c) => c._id === overId);

    // If `overId` is a column key (dropping onto an empty column),
    // update the active card's column so it visually moves into that column.
    const isColumn = columns.some((col) => col.key === overId);

    if (!activeCard) return;

    if (isColumn) {
      if (activeCard.column !== overId) {
        setLocalCards((prev) =>
          prev.map((c) =>
            c._id === activeId ? { ...c, column: overId as ColumnType } : c
          )
        );
      }
      return;
    }

    if (!overCard) return;

    if (activeCard.column !== overCard.column) {
      setLocalCards((prev) =>
        prev.map((c) =>
          c._id === activeId ? { ...c, column: overCard.column } : c
        )
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    const activeCard = localCards.find((c) => c._id === activeId);
    const overCard = localCards.find((c) => c._id === overId);
    const isColumn = columns.some((col) => col.key === overId);
    if (!activeCard) return;

    // Dropped onto an empty column (overId is column key)
    if (isColumn) {
      const targetColumn = overId as ColumnType;
      const targetCards = localCards
        .filter((c) => c.column === targetColumn)
        .sort((a, b) => a.position - b.position);
      const newPosition = targetCards.length; // append to end

      const updatedCards = localCards.map((c) =>
        c._id === activeId
          ? { ...c, column: targetColumn, position: newPosition }
          : c
      );

      setLocalCards(updatedCards);
      onReorder([
        {
          id: activeId,
          column: targetColumn,
          position: newPosition,
        },
      ]);

      return;
    }

    if (!overCard) return;

    if (activeCard.column === overCard.column) {
      const sameColCards = localCards.filter(
        (c) => c.column === activeCard.column
      );
      const oldIndex = sameColCards.findIndex((c) => c._id === activeId);
      const newIndex = sameColCards.findIndex((c) => c._id === overId);
      const reordered = arrayMove(sameColCards, oldIndex, newIndex);

      const updatedCards = localCards.map((c) => {
        const updated = reordered.find((r) => r._id === c._id);
        return updated ? { ...c, position: reordered.indexOf(updated) } : c;
      });

      setLocalCards(updatedCards);
      onReorder(
        reordered.map((c, i) => ({
          id: c._id,
          column: c.column,
          position: i,
        }))
      );
    } else {
      const updatedCards = localCards.map((c) =>
        c._id === activeId
          ? { ...c, column: overCard.column, position: overCard.position }
          : c
      );
      setLocalCards(updatedCards);
      onReorder([
        {
          id: activeId,
          column: overCard.column,
          position: overCard.position,
        },
      ]);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className='flex gap-4'>
        {columns.map((col) => {
          const colCards = localCards
            .filter((c) => c.column === col.key)
            .sort((a, b) => a.position - b.position);

          return (
            <SortableContext
              key={col.key}
              items={colCards.map((c) => c._id)}
              strategy={verticalListSortingStrategy}
            >
              <Column
                boardId={boardId}
                column={col.key}
                title={col.title}
                cards={colCards}
              />
            </SortableContext>
          );
        })}
      </div>
    </DndContext>
  );
}
