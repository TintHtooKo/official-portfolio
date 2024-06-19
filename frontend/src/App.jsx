import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Spinner from './assets/gear-spinner.svg';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time with setTimeout
    const timer = setTimeout(() => {
      setLoading(false);  // Set loading to false after timeout
    }, 2000);  // Simulating 2 seconds loading time, adjust as needed

    return () => clearTimeout(timer);  // Cleanup the timer on unmount
  }, []);

  return (
    <div className="app">
      <NavBar />
      {loading ? (
        <div className="loading-overlay">
          <img src={Spinner} className='load-spin' alt="Loading spinner" />
          {/* You can add a spinner or any other loading animation here */}
        </div>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
}
