import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/axios';
import type { TBoard, TCard } from '@/types';
import { useNavigate, useParams } from 'react-router';
import type { CreateBoardSchema } from '@/schemas';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function useBoard() {
  const params = useParams();

  const id = params.boardId;

  return useQuery({
    queryKey: ['board', id],
    queryFn: async () => {
      const res = await api.get<{ board: TBoard; cards: TCard[] }>(
        `${BACKEND_URL}/boards/${id}`
      );
      return res.data;
    },
  });
}

export function useBoards() {
  return useQuery({
    queryKey: ['boards'],
    queryFn: async () => {
      const res = await api.get<TBoard[]>(`${BACKEND_URL}/boards`);
      return res.data;
    },
  });
}

export function useCreateBoard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (board: CreateBoardSchema) => {
      const res = await api.post(`${BACKEND_URL}/boards`, board);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });

      navigate(`/${data.hashId}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });
}

export function useUpdateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      board,
      id,
    }: {
      board: CreateBoardSchema;
      id: string;
    }) => {
      const res = await api.put(`${BACKEND_URL}/boards/${id}`, board);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });
}

export function useDeleteBoard() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`${BACKEND_URL}/boards/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });

      navigate('/');
    },
  });
}
