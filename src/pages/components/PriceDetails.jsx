import React from 'react';

const PriceDetails = ({ cartItems, appliedCoupon }) => {
    const totalCartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const subtotal = cartItems.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0);
    const originalTotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
    const productDiscount = originalTotal - subtotal;
    const couponDiscount = appliedCoupon ? Math.round(subtotal * appliedCoupon.rate / 100) : 0;
    const deliveryCharge = subtotal >= 999 ? 0 : 49;
    const grandTotal = subtotal - couponDiscount + deliveryCharge;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-3 pb-3 border-b border-gray-100">
                Price Details
            </h3>

            <div className="flex flex-col gap-2.5 text-sm sm:text-base">
                <div className="flex justify-between text-gray-600">
                    <span>Price ({totalCartCount} item{totalCartCount !== 1 ? 's' : ''})</span>
                    <span className="font-medium text-gray-800">₹{originalTotal}</span>
                </div>
                <div className="flex justify-between text-green-600">
                    <span>Product Discount</span>
                    <span className="font-semibold">- ₹{productDiscount}</span>
                </div>
                {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Coupon ({appliedCoupon.code})</span>
                        <span className="font-semibold">- ₹{couponDiscount}</span>
                    </div>
                )}
                <div className="flex justify-between text-gray-600">
                    <span>Delivery Charges</span>
                    <span className={deliveryCharge === 0 ? 'font-semibold text-green-600' : 'font-medium text-gray-800'}>
                        {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                    </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-2.5 mt-1">
                    <div className="flex justify-between text-base sm:text-lg font-bold text-gray-900">
                        <span>Total Amount</span>
                        <span>₹{grandTotal}</span>
                    </div>
                </div>
            </div>

            {(productDiscount + couponDiscount) > 0 && (
                <div className="mt-3 bg-green-50 border border-green-200 rounded-xl px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-green-700 font-semibold text-center">
                    🎉 You save ₹{productDiscount + couponDiscount} on this order!
                </div>
            )}
        </div>
    );
};

export default PriceDetails;
