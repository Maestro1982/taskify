'use client';

import { useParams, useRouter } from 'next/navigation';
import { ElementRef, useState, useRef } from 'react';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';

import { ListWrapper } from './list-wrapper';

import { useAction } from '@/hooks/use-action';

import { createList } from '@/actions/create-list';

import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { FormInput } from '@/components/form/form-input';
import { FormSubmit } from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';

export const ListForm = () => {
  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created.`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const boardId = formData.get('boardId') as string;

    execute({
      title,
      boardId,
    });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className='w-full p-3 rounded-md bg-white dark:bg-neutral-900 space-y-4 shadow-md'
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id='title'
            className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition dark:focus:bg-neutral-900'
            placeholder='Enter list title...'
          />
          <input hidden value={params.boardId} name='boardId' />
          <div className='flex items-center gap-x-1'>
            <FormSubmit>Add list</FormSubmit>
            <Button onClick={disableEditing} size='sm' variant='ghost'>
              <X className='h-5 w-5 dark:text-neutral-500' />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className='w-full rounded-md bg-white/80 dark:bg-neutral-900/80 hover:bg-white/50 dark:hover:bg-neutral-900/50 transition p-3 flex items-center font-medium text-sm dark:text-neutral-300'
      >
        <Plus className='w-4 h-4 mr-2' />
        Add a list
      </button>
    </ListWrapper>
  );
};
