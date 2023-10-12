import React from 'react';

export default function Dashboard() {
  return (
    <div className='h-screen '>
      <div
        className='bg-cover bg-center w-full h-screen text-center'
        style={{
          backgroundImage: `url('./dashboard.jpg')`,
        }}
      >
        <div className="bg-white flex flex-col bg-opacity-90 justify-center items-center p-6 h-full">
          <h1 className='text-4xl font-bold mb-4'>Dashboard</h1>
          <h1 className='text-3xl font-bold mb-4'>Under Construction</h1>
        </div>
      </div>
    </div>
  );
}
