import React from 'react';

const NoNavLayout = ({ children }) => {
  return (
    <div className="dark:bg-secondary-dark-bg bg-main-bg min-h-screen">
      {children}
    </div>
  );
};

export default NoNavLayout;
