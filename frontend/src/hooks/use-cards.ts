import { api } from '@/api/axios';
import type { TCardUpdate } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      card,
      boardId,
    }: {
      card: TCardUpdate;
      boardId: string;
    }) => {
      const res = await api.post('/cards', { boardId, ...card });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board, boards'] });
    },
  });
}

export function useUpdateCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (card: TCardUpdate) => {
      const res = await api.put(`/cards/${card.id}`, card);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board, boards'] });
    },
  });
}
