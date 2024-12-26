import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                <span className="text-xl text-gray-700">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;
