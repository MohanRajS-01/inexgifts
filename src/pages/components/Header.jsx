import React from 'react';

const Header = ({ cartCount = 0, onBack }) => {
    return (
        <div className="w-full bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-3xl mx-auto flex items-center justify-center px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                <h1 className="text-base sm:text-lg font-bold text-gray-900">My Cart</h1>
            </div>
        </div>
    );
};

export default Header;
