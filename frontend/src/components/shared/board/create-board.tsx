import { createBoardSchema, type CreateBoardSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../ui/form';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { useCreateBoard } from '@/hooks/use-board';

export default function CreateBoard() {
  const form = useForm<CreateBoardSchema>({
    resolver: zodResolver(createBoardSchema),
  });

  const { mutate, isPending } = useCreateBoard();

  function handleCreate(data: CreateBoardSchema) {
    mutate(data);
  }

  return (
    <div className='flex flex-col gap-2 mb-4'>
      <h2 className='font-bold'>Create a new board</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreate)}
          className='flex flex-col gap-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <div className='flex flex-col gap-1 max-w-sm'>
                  <Label htmlFor={field.name}>Name</Label>
                  <FormControl>
                    <Input {...field} id={field.name} type='text' />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='self-start' disabled={isPending}>
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}
