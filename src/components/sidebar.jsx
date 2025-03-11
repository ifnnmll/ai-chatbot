import { useState } from "react";
import NewChat from "./NewChat";
import SearchChat from "./SearchChat";
import { History, Settings } from "lucide-react";

const Sidebar = () => {
  const [searchActive, setSearchActive] = useState(false);

  const handleNewChat = () => {
    alert("Mulai obrolan baru!");
  };

  const handleSearchChat = () => {
    setSearchActive(!searchActive);
    alert("Cari obrolan"); 
  };

  return (
    <div className="w-72 h-screen bg-gray-900 text-gray-200 p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">AiAnfor</h2>
        <div className="flex gap-2">
          <SearchChat onClick={handleSearchChat} />
          <NewChat onClick={handleNewChat} />
        </div>
      </div>
      <ul className="space-y-4">
        <li className="flex items-center gap-2 cursor-pointer hover:text-white">
          <History size={20} /> Riwayat
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-white">
          <Settings size={20} /> Pengaturan
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
