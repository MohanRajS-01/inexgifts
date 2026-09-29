import { FiHome, FiHeart, FiGift, FiShoppingBag, FiUser } from 'react-icons/fi';

const MobileBottomNav = ({ setView, currentView, wishlistCount = 0 }) => {
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
        className={`flex-1 flex flex-col items-center justify-center space-y-1 transition-colors ${currentView === 'wishlist' ? 'text-[#4f46e5]' : 'text-gray-500 hover:text-[#4f46e5]'}`}
        onClick={() => setView('wishlist')}
      >
        <div className="relative">
          <FiHeart className="h-6 w-6 stroke-[2]" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[9px] font-bold text-white shadow">
              {wishlistCount}
            </span>
          )}
        </div>
        <span className="text-[11px] font-medium">Wishlist</span>
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
