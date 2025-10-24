import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function AppLayout() {
  const { boardId } = useParams();
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  function handleSearch() {
    navigate(`/${ref.current?.value}`);
  }

  useEffect(() => {
    setValue(boardId || '');
  }, [boardId]);

  return (
    <QueryClientProvider client={queryClient}>
      <main className='max-w-4xl mx-auto py-8 md:py-12 px-4'>
        <div className='flex gap-2 flex-row mb-6'>
          <Input
            placeholder='Board id...'
            defaultValue={boardId}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={ref}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <Outlet />
      </main>
    </QueryClientProvider>
  );
}
