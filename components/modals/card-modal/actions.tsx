'use client';

import { useParams } from 'next/navigation';
import { Copy, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { CardWithList } from '@/types';

import { useAction } from '@/hooks/use-action';
import { useCardModal } from '@/hooks/use-card-modal';

import { copyCard } from '@/actions/copy-card';
import { deleteCard } from '@/actions/delete-card';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface ActionProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied.`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted.`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  return (
    <div className='space-y-2 mt-2'>
      <p className='font-semibold text-xs dark:text-neutral-300'>Actions</p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant='gray'
        className='w-full justify-start dark:text-neutral-300 dark:bg-neutral-500 dark:hover:bg-neutral-400'
        size='inline'
      >
        <Copy className='h-4 w-4 mr-2 dark:text-neutral-300' />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant='destructive'
        size='inline'
        className='w-full justify-start text-neutral-300'
      >
        <Trash className='h-4 w-4 mr-2 dark:text-neutral-300' />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className='space-y-2 mt-2'>
      <Skeleton className='w-20 h-4 bg-neutral-200 dark:bg-neutral-500' />
      <Skeleton className='w-full h-8 bg-neutral-200 dark:bg-neutral-500' />
      <Skeleton className='w-full h-8 bg-neutral-200 dark:bg-neutral-500' />
    </div>
  );
};
