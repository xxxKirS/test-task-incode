// src/components/DndContextWrapper.tsx
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { TCard, ColumnType, TReorder } from '@/types';

type Props = {
  cards: TCard[];
  onReorder: (updates: TReorder[]) => void;
  children: React.ReactNode;
};

export const DndContextWrapper = ({ cards, onReorder, children }: Props) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeCard = cards.find((c) => c._id === active.id);
    if (!activeCard) return;

    const overCard = cards.find((c) => c._id === over.id);
    const newColumn: ColumnType = overCard?.column || (over.id as ColumnType);

    // Filtrs
    const columnCards = cards
      .filter((c) => c.column === newColumn)
      .sort((a, b) => a.position - b.position);

    const oldColumnCards = cards
      .filter((c) => c.column === activeCard.column && c._id !== activeCard._id)
      .sort((a, b) => a.position - b.position);

    // New Position
    let newCardsInColumn: TCard[];
    if (overCard) {
      const overIndex = columnCards.findIndex((c) => c._id === overCard._id);
      newCardsInColumn = [
        ...columnCards.slice(0, overIndex),
        { ...activeCard, column: newColumn },
        ...columnCards.slice(overIndex),
      ];
    } else {
      newCardsInColumn = [...columnCards, { ...activeCard, column: newColumn }];
    }

    // Position
    const updatedCards = newCardsInColumn.map((card, index) => ({
      id: card._id,
      column: newColumn,
      position: index,
    }));

    // Update old column
    const updates =
      activeCard.column !== newColumn
        ? [
            ...oldColumnCards.map((card, index) => ({
              id: card._id,
              column: activeCard.column,
              position: index,
            })),
            ...updatedCards,
          ]
        : updatedCards;

    onReorder(updates);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DndContext>
  );
};
