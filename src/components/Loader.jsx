import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-opacity-50 bg-white backdrop-filter backdrop-blur-sm z-50">
      <div className="flex justify-center items-center">
        <ThreeCircles
          height={100}
          width={100}
          color="#010155"
          visible={true}
          ariaLabel="three-circles-rotating"
        />
      </div>
    </div>
  );
};

export default Loader;
