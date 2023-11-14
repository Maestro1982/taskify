import { Medal } from 'lucide-react';

const MarketingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <div className='mb-4 flex items-center border shadow-sm p-4 bg-[#faf0bc] text-[#776603] rounded-full uppercase'>
          <Medal className='w-6 h-6 mr-2' />
          No 1 Task Management
        </div>
        <h1 className='text-3xl md:text-5xl text-center text-neutral-800 mb-6'>
          Taskify helps team move
        </h1>
        <div className='text-3xl md:text-5xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit'>
          work forward.
        </div>
      </div>
    </div>
  );
};
export default MarketingPage;
