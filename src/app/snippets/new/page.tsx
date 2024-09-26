import GeneralButton from '@/components/GeneralButton';
import { db } from '@/db';
import { redirect } from 'next/navigation';

const NewSnippet: React.FC = () => {
  async function handleSubmit(formData: FormData) {
    //This will be a server component
    'use server';

    //Check Users input
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    //Create new entry
    if (title && code) {
      await db.snippet.create({ data: { title, code } });
      redirect('/');
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <div className="mt-10 flex justify-around">
        <h3 className="text-xl font-bold mb-4">Create Snippet</h3>
        <GeneralButton href="/" text="Go back" />
      </div>

      <form action={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Code
          </label>
          <textarea
            id="code"
            name="code"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NewSnippet;
