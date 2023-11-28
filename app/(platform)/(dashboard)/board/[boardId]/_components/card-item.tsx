'use client';

import { Card } from '@prisma/client';
import { Draggable } from '@hello-pangea/dnd';

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          role='button'
          className='truncate border-2 border-transparent hover:border-black dark:hover:border-neutral-400 py-2 px-3 text-sm bg-white dark:bg-neutral-700 dark:text-neutral-300 rounded-md shadow-sm'
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
