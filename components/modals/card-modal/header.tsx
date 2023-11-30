'use client';

import { ElementRef, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Layout } from 'lucide-react';
import { toast } from 'sonner';

import { useAction } from '@/hooks/use-action';
import { updateCard } from '@/actions/update-card';

import { CardWithList } from '@/types';

import { FormInput } from '@/components/form/form-input';
import { Skeleton } from '@/components/ui/skeleton';

interface HeaderProps {
  data: CardWithList;
}

export const Header = ({ data }: HeaderProps) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const inputRef = useRef<ElementRef<'input'>>(null);

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      });
      toast.success(`Renamed to "${data.title}".`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const [title, setTitle] = useState(data.title);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const boardId = params.boardId as string;

    if (title === data.title) {
      return;
    }

    execute({
      title,
      boardId,
      id: data.id,
    });
  };

  return (
    <div className='flex items-start gap-x-3 mb-6 w-full'>
      <Layout className='h-5 w-5 mt-1 text-neutral-700 dark:text-neutral-500' />
      <div className='w-full'>
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id='title'
            defaultValue={title}
            className='font-semibold text-xl px-1 text-neutral-700 dark:text-neutral-300 bg-transparent relative -left-1.5 w-[95%] focus-visible:bg-white dark:focus-visible:bg-black focus-visible:border-input mb-0.5 truncate'
          />
        </form>
        <p className='text-sm text-muted-foreground'>
          in list <span className='underline'>{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className='flex items-start gap-x-3 mb-6'>
      <Skeleton className='h-6 w-6 mt-1 bg-neutral-200 dark:bg-neutral-500' />
      <div>
        <Skeleton className='h-6 w-24 mb-1 bg-neutral-200 dark:bg-neutral-500' />
        <Skeleton className='h-4 w-12 bg-neutral-200 dark:bg-neutral-500' />
      </div>
    </div>
  );
};
