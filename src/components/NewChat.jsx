import { Plus } from "lucide-react";

const NewChat = ({ onClick }) => {
  return (
    <button onClick={onClick} className="p-2 rounded-full hover:bg-gray-700">
      <Plus size={24} className="text-white" />
    </button>
  );
};

export default NewChat;