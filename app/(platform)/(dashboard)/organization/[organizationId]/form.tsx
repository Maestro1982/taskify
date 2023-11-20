'use client';

import { useFormState } from 'react-dom';

import { create } from '@/actions/create-board';
import { Button } from '@/components/ui/button';

export const Form = () => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create, initialState);
  return (
    <form action={dispatch}>
      <input
        id='title'
        name='title'
        required
        placeholder='Enter a board title'
        className='border border-white p-1'
      />
      <Button type='submit' variant='primary'>
        Submit
      </Button>
    </form>
  );
};
