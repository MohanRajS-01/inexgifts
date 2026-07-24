import { FiHome, FiGrid, FiGift, FiShoppingBag, FiUser } from 'react-icons/fi';

const MobileBottomNav = ({ setView, currentView }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex justify-between items-center px-2 pt-3 pb-3 z-50">
      
      <button 
        className={`flex-1 flex flex-col items-center justify-center space-y-1 transition-colors ${currentView === 'home1' ? 'text-[#4f46e5]' : 'text-gray-500 hover:text-[#4f46e5]'}`}
        onClick={() => setView('home1')}
      >
        <FiHome className="h-6 w-6 stroke-[2.5]" />
        <span className="text-[11px] font-bold">Home</span>
      </button>

      <button 
        className={`flex-1 flex flex-col items-center justify-center space-y-1 transition-colors ${currentView === 'categories' ? 'text-[#4f46e5]' : 'text-gray-500 hover:text-[#4f46e5]'}`}
        onClick={() => setView('categories')}
      >
        <FiGrid className="h-6 w-6 stroke-[2]" />
        <span className="text-[11px] font-medium">Categories</span>
      </button>

      {/* Center Gift Button - Floating */}
      <div className="flex-1 flex flex-col items-center justify-center relative -top-5">
        <button 
          className={`h-[56px] w-[56px] rounded-full text-white flex items-center justify-center shadow-lg transform transition-all active:scale-95 ${currentView === 'gift' ? 'bg-[#5B3EE0] ring-4 ring-indigo-100 shadow-indigo-500/50 scale-105' : 'bg-[#4f46e5] shadow-indigo-500/40'}`}
          onClick={() => setView('gift')}
        >
          <FiGift className="h-7 w-7 stroke-[2]" />
        </button>
        <span className={`text-[11px] font-medium mt-1 absolute -bottom-5 ${currentView === 'gift' ? 'text-[#4f46e5] font-bold' : 'text-gray-500'}`}>Gifts</span>
      </div>

      <button 
        className={`flex-1 flex flex-col items-center justify-center space-y-1 transition-colors ${currentView === 'orders' ? 'text-[#4f46e5]' : 'text-gray-500 hover:text-[#4f46e5]'}`}
        onClick={() => setView('orders')}
      >
        <FiShoppingBag className="h-6 w-6 stroke-[2]" />
        <span className="text-[11px] font-medium">Orders</span>
      </button>

      <button 
        className={`flex-1 flex flex-col items-center justify-center space-y-1 transition-colors ${currentView === 'profile' ? 'text-[#4f46e5]' : 'text-gray-500 hover:text-[#4f46e5]'}`}
        onClick={() => setView('profile')}
      >
        <FiUser className="h-6 w-6 stroke-[2]" />
        <span className="text-[11px] font-medium">Profile</span>
      </button>

    </div>
  );
};

export default MobileBottomNav;
