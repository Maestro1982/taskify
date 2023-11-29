'use client';

import { ElementRef, useRef } from 'react';
import { MoreHorizontal, X } from 'lucide-react';
import { List } from '@prisma/client';
import { toast } from 'sonner';

import {
  Popover,
  PopoverContent,
  PopoverClose,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { FormSubmit } from '@/components/form/form-submit';
import { Separator } from '@/components/ui/separator';

import { useAction } from '@/hooks/use-action';

import { deleteList } from '@/actions/delete-list';
import { copyList } from '@/actions/copy-list';

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted.`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied.`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeDelete({
      id,
      boardId,
    });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeCopy({
      id,
      boardId,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant='ghost'>
          <MoreHorizontal className='w-4 h-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
        <div className='text-sm font-medium text-center text-neutral-600 dark:text-neutral-300 pb-4'>
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 dark:text-neutral-500'
            variant='ghost'
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm dark:text-neutral-300'
          variant='ghost'
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input hidden id='id' name='id' value={data.id} />
          <input hidden id='boardId' name='boardId' value={data.boardId} />
          <FormSubmit
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm dark:text-neutral-300'
            variant='ghost'
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden id='id' name='id' value={data.id} />
          <input hidden id='boardId' name='boardId' value={data.boardId} />
          <FormSubmit
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:text-red-500 dark:text-neutral-300 dark:hover:text-red-500'
            variant='ghost'
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};