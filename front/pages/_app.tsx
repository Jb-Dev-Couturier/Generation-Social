import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';

import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
        <Navbar />
        <div className="flex gap-6 md:gap-10">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
            <SideBar />
          </div>
          <div className=" flex flex-col gap-10 overflow-auto h-[88vh] video flex-1">
            <Toaster position="top-center" reverseOrder={true} />
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
