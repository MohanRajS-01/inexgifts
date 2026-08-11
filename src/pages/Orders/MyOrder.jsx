import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiChevronRight, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import ReviewModal from '../components/ReviewModal';

export default function MyOrder({ setView }) {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedReviewItem, setSelectedReviewItem] = useState(null);
  const [selectedReviewOrder, setSelectedReviewOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    if (currentUser?.email) {
      const data = await orderService.getOrders(currentUser.email);
      setOrders(data);
    } else {
      setOrders([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();

    // Subscribe to order sync updates
    const handleOrderSync = () => {
      fetchOrders();
    };
    window.addEventListener('inex_orders_updated', handleOrderSync);
    return () => window.removeEventListener('inex_orders_updated', handleOrderSync);
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView && setView('home1')}
            className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">My Orders</h1>
            <p className="text-[11px] text-slate-500 font-medium">Track and manage your gift orders</p>
          </div>
        </div>

        <button
          onClick={() => setView && setView('gift')}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          Explore Gifts <FiChevronRight className="h-4 w-4" />
        </button>
      </header>

      {/* Content */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {loading ? (
          <div className="py-16 text-center text-slate-400">
            <FiClock className="h-8 w-8 animate-spin mx-auto mb-2 text-indigo-600" />
            <p className="text-sm font-semibold">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center shadow-sm my-6">
            <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiShoppingBag className="h-8 w-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">No Orders Placed Yet</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6 max-w-sm mx-auto">
              You haven't placed any gift orders yet. Explore our custom LED photo lamps, cushions, and personalized hampers!
            </p>
            <button
              onClick={() => setView && setView('home1')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-full shadow-lg shadow-indigo-600/20 transition-all"
            >
              Start Shopping Now
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusStep = order.status === 'Delivered' ? 3 : order.status === 'Shipped' ? 2 : 1;

              return (
                <div key={order.id} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden">
                  
                  {/* Order Top Summary */}
                  <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</span>
                        <span className="text-sm font-extrabold text-slate-900">{order.id}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Placed on {order.date || 'Today'}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-slate-900">
                        ₹{order.totalAmount}
                      </span>
                    </div>
                  </div>

                  {/* Tracking Stepper */}
                  <div className="px-5 py-4 border-b border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
                      <span className="flex items-center gap-1 text-indigo-600"><FiPackage /> Order Confirmed</span>
                      <span className={`flex items-center gap-1 ${statusStep >= 2 ? 'text-indigo-600' : 'text-slate-400'}`}><FiTruck /> Shipped</span>
                      <span className={`flex items-center gap-1 ${statusStep >= 3 ? 'text-emerald-600' : 'text-slate-400'}`}><FiCheckCircle /> Delivered</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                      <div className={`h-full transition-all duration-500 ${
                        statusStep === 3 ? 'w-full bg-emerald-500' : statusStep === 2 ? 'w-2/3 bg-indigo-600' : 'w-1/3 bg-amber-500'
                      }`}></div>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="p-4 sm:p-5 divide-y divide-slate-100">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image || '/LEDphoto.jpg'}
                            alt={item.title}
                            className="h-14 w-14 rounded-2xl object-cover border border-slate-100 bg-slate-50 shrink-0"
                          />
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">Qty: {item.quantity || 1} • Size: {item.selectedOption || 'Standard'}</p>
                            
                            {/* Rate & Review Button for Delivered Orders */}
                            {order.status === 'Delivered' && (
                              <button
                                onClick={() => {
                                  setSelectedReviewItem(item);
                                  setSelectedReviewOrder(order);
                                  setReviewModalOpen(true);
                                }}
                                className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg transition active:scale-95 shadow-sm"
                              >
                                ⭐ Rate & Review Product
                              </button>
                            )}
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 shrink-0">
                          ₹{(item.currentPrice || item.price || 999) * (item.quantity || 1)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping address footer */}
                  {order.shippingAddress && (
                    <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-[11px] text-slate-500 flex flex-wrap justify-between items-center gap-2">
                      <span>
                        Delivery Address: <strong className="text-slate-700">
                          {(order.shippingAddress.street || '').replace(/,\s*Chennai\s*$/i, '')}
                          {order.shippingAddress.city && order.shippingAddress.city.toLowerCase() !== 'chennai' ? `, ${order.shippingAddress.city}` : ''} ({order.shippingAddress.pincode})
                        </strong>
                      </span>
                      <span className="text-indigo-600 font-semibold cursor-pointer hover:underline" onClick={() => setView && setView('home1')}>Buy Again</span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Review & Rating Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        item={selectedReviewItem}
        order={selectedReviewOrder}
        onReviewSubmitted={() => {
          fetchOrders();
        }}
      />
    </div>
  );
}
