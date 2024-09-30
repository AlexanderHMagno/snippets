import * as actions from '@/actions';
import GeneralButton from '@/components/GeneralButton';

export default async function Home() {
  const data = await actions.getAllSnippets();

  const displayFunctions = data.map((code) => {
    return (
      <div
        key={code.id}
        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out mb-4 flex justify-between align-top w-96 min-w-full"
      >
        <h4 className="text-lg font-semibold text-gray-800 mb-2 ">
          {code.title}
        </h4>
        <GeneralButton href={`snippets/${code.id}`} text="View" />
      </div>
    );
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex justify-between w-full items-baseline">
        <h1 className="text-3xl mb-10">Functions</h1>
        <GeneralButton href={`snippets/new`} text="Create Snippet" />
      </div>
      {displayFunctions}
    </div>
  );
}
