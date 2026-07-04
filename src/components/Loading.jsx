import React from 'react';

const Loading = () => (
  <div className="w-full flex items-center justify-center py-12">
    <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-white/30 animate-spin" aria-hidden="true"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

export default Loading;
