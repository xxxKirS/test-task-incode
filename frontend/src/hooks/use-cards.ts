import { type CreateCardSchema } from './../schemas/index';
import { api } from '@/api/axios';
import type { TCardUpdate, TReorder } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function useCreateCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      card,
      boardId,
    }: {
      card: CreateCardSchema;
      boardId: string;
    }) => {
      const res = await api.post(`${BACKEND_URL}/cards`, { boardId, ...card });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
}

export function useUpdateCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (card: TCardUpdate) => {
      const res = await api.patch(`${BACKEND_URL}/cards/${card.id}`, card);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });
}

export function useReorderCards() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cards: TReorder[]) => {
      const res = await api.put(`${BACKEND_URL}/cards/reorder`, { cards });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
}

export function useDeleteCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`${BACKEND_URL}/cards/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
}
