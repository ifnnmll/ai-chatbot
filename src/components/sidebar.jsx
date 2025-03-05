import { Plus, History, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-72 h-screen bg-gray-900 text-gray-200 p-6 flex flex-col">
      <h2 className="text-lg font-bold mb-6">PanAi</h2>
      <ul className="space-y-4">
        <li className="flex items-center gap-2 cursor-pointer hover:text-white">
          <Plus size={20} /> Chat Baru
        </li>
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
