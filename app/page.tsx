'use client'
 
import { useCompletion } from 'ai/react';
 
export default function SloganGenerator() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion();
 
  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <form onSubmit={handleSubmit}>
        <input
          className="fixed w-full max-w-md bottom-0 border border-gray-300 color-black rounded mb-8 shadow-xl p-2"
          value={input}
          placeholder="Describe your business..."
          onChange={handleInputChange}
        />
      </form>
      <div className="whitespace-pre-wrap my-6 color-white" >
		<p className='mr-5 text-lg text-slate-800'>Example names:</p>
		{completion}
		</div>
    </div>
  );
}