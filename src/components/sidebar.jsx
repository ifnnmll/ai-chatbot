import { useState } from "react";
import { History, Settings, Menu } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Tombol menu untuk mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-full bg-gray-900 text-gray-200 p-6 flex flex-col transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-72 z-40`}
      >
        {/* Header Sidebar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">AiAnfor</h2>
          <div className="flex gap-3">
            <button className="text-gray-400 hover:text-white">
              <History size={22} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Settings size={22} />
            </button>
          </div>
          {/* Tombol tutup di mobile */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Konten Sidebar (Tambahan jika perlu) */}
        <ul className="space-y-4">
          {/* Bisa ditambahkan menu lain di sini */}
        </ul>
      </div>

      {/* Overlay untuk menutup sidebar di mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
