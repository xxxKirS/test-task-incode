import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateCard } from '@/hooks/use-cards';
import { createCardSchema, type CreateCardSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateCard({ boardId }: { boardId: string }) {
  const [isCreating, setIsCreating] = useState(false);

  const { mutate: createCard, isPending: isCreatingCard } = useCreateCard();

  const form = useForm<CreateCardSchema>({
    resolver: zodResolver(createCardSchema),
    defaultValues: { name: '', description: '' },
  });

  function handleSubmit(data: CreateCardSchema) {
    console.log(data);
    createCard({ card: data, boardId }, { onSuccess: () => form.reset() });
    setIsCreating(false);
  }

  return (
    <div className='bg-gray-300 h-22 flex items-center justify-center'>
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogTrigger asChild>
          <Plus className='text-white cursor-pointer' />
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new card</DialogTitle>
            <DialogDescription>
              Fill the form to create a new card
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
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
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex flex-col gap-1 max-w-sm'>
                      <Label htmlFor={field.name}>Description</Label>
                      <FormControl>
                        <Input {...field} id={field.name} type='text' />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className='flex flex-row gap-2'>
                <Button
                  type='reset'
                  onClick={() => {
                    setIsCreating(false);
                    form.reset();
                  }}
                  variant={'outline'}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={isCreatingCard}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
