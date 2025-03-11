import { Search } from "lucide-react";

const SearchChat = ({ onClick }) => {
  return (
    <button onClick={onClick} className="p-2 rounded-full hover:bg-gray-700">
      <Search size={24} className="text-white" />
    </button>
  );
};

export default SearchChat;