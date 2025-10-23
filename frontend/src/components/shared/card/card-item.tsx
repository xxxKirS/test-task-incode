import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TCard } from '@/types';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { createCardSchema, type CreateCardSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Props = {
  card: TCard;
};

export function CardItem({ card }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<CreateCardSchema>({
    resolver: zodResolver(createCardSchema),
    defaultValues: { name: card.name, description: card.description },
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  function handleSubmit(data: CreateCardSchema) {
    console.log(data);
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='p-2 bg-white border rounded-md shadow-sm cursor-grab active:cursor-grabbing'
    >
      <div className='flex flex-row gap-2 items-center justify-between'>
        {isEditing ? (
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => <input {...field} />}
          />
        ) : (
          <h4 className='font-semibold flex-1 truncate'>{card.name}</h4>
        )}
        <div className='flex gap-2'>
          <Button
            variant={'secondary'}
            size={'icon'}
            className='!p-1 size-8'
            onClick={(e) => {
              e.stopPropagation();
              console.log('edit');
              setIsEditing(true);
            }}
          >
            <Edit2 className='h-2 w-2' />
          </Button>
          <Button variant={'destructive'} size={'icon'} className='!p-1 size-8'>
            <Trash2 className='h-2 w-2' />
          </Button>
        </div>
      </div>
      <Dialog modal open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit card</DialogTitle>
            <DialogDescription>
              Fill the form to edit the card
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
                    <div className='flex flex-col'>
                      <Label>Name</Label>

                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex flex-col'>
                      <Label>Description</Label>

                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex gap-2'>
                <Button type='submit'>Save</Button>
                <Button
                  type='reset'
                  variant={'secondary'}
                  onClick={() => {
                    console.log('cancel');
                    setIsEditing(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
