import { TrashIcon } from "@heroicons/react/24/solid";
import { useClearDataMutation } from "../data/mutation";
const Settings = () => {
  const { mutate } = useClearDataMutation();
  return (
    <div className="flex-1 flex items-center justify-center">
      <button
        className="flex items-center gap-2 bg-purple-100 px-12 py-2.5 rounded-md text-purple-900 active:bg-purple-200"
        onClick={() => mutate()}
      >
        <TrashIcon className="w-4 h-4" />
        Clear all data
      </button>
    </div>
  );
};

export default Settings;
