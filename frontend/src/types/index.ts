// src/types/index.ts
export type ColumnType = 'todo' | 'in_progress' | 'done';

export type TCard = {
  _id: string;
  title: string;
  description?: string;
  column: ColumnType;
  position: number;
};

export type TBoard = {
  _id: string;
  name: string;
  hashId: string;
};

export type TCardUpdate = {
  id: string;
  name: string;
  description?: string;
};
