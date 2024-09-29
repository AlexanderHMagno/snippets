'use client';
import * as actions from '@/actions';
import GeneralButton from '@/components/GeneralButton';
import { useFormState } from 'react-dom';

const initialState = {
  message: '',
};
const NewSnippet: React.FC = () => {
  const [state, formAction] = useFormState(
    actions.createNewSnippet,
    initialState
  );

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <div className="mt-10 flex justify-around">
        <h3 className="text-xl font-bold mb-4">Create Snippet</h3>
        <GeneralButton href="/" text="Go back" />
      </div>

      <form action={formAction}>
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
        {state?.message && (
          <div className="mt-2 text-red-600 pan">{state.message}</div>
        )}
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
