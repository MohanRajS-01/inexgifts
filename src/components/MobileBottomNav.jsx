import { FiHome, FiGrid, FiGift, FiShoppingBag, FiUser } from 'react-icons/fi';

const MobileBottomNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex justify-between items-center px-2 pt-3 pb-3 z-50">
      
      <button className="flex-1 flex flex-col items-center justify-center space-y-1 text-[#4f46e5]">
        <FiHome className="h-6 w-6 stroke-[2.5]" />
        <span className="text-[11px] font-bold">Home</span>
      </button>

      <button className="flex-1 flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-[#4f46e5] transition-colors">
        <FiGrid className="h-6 w-6 stroke-[2]" />
        <span className="text-[11px] font-medium">Categories</span>
      </button>

      {/* Center Gift Button - Floating */}
      <div className="flex-1 flex flex-col items-center justify-center relative -top-5">
        <button className="h-[56px] w-[56px] rounded-full bg-[#4f46e5] text-white flex items-center justify-center shadow-lg shadow-indigo-500/40 transform transition-transform active:scale-95">
          <FiGift className="h-7 w-7 stroke-[2]" />
        </button>
        <span className="text-[11px] font-medium text-gray-500 mt-1 absolute -bottom-5">Gifts</span>
      </div>

      <button className="flex-1 flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-[#4f46e5] transition-colors">
        <FiShoppingBag className="h-6 w-6 stroke-[2]" />
        <span className="text-[11px] font-medium">Orders</span>
      </button>

      <button className="flex-1 flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-[#4f46e5] transition-colors">
        <FiUser className="h-6 w-6 stroke-[2]" />
        <span className="text-[11px] font-medium">Profile</span>
      </button>

    </div>
  );
};

export default MobileBottomNav;
