import React,{useState} from 'react'
import Link from 'next/link'

import GoogleLogin from 'react-google-login';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import{ImCancelCircle} from 'react-icons/im'

import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';


const SideBar = () => {
    const [showSideBar, setShowSideBar] = useState(true)
    const userProfile = false;
    const normalLink =
      'flex items-center gap-3 hover:bg-primary p-3 justify-center rounded-lg hover:border-r-2 border-green-500 xl:justify-start cursor-pointer font-semibold text-[#00af12] ';
  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl "
        onClick={() => setShowSideBar((prev) => !prev)}
      >
        {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSideBar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-green-500 xl:border-0 p-3">
          <div className="xl:border-b-2 border-green-500 xl:pb-4">
            <Link href={'/'}>
              <div className={normalLink}>
                <p className="text-2xl text-lime-500">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block ">Acceuil</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400">
                Connectez Vous pour liker et partager avec nous
              </p>
              <div className="pr-4">
                <GoogleLogin
                  clientId=""
                  render={(renderProps) => (
                    <button
                      className="bg-white text-lg text-lime-500 border-[1px] border-green-500 rounded-md px-6 py-3 font-semibold outline-none w-full mt-3 cursor-pointer hover:bg-green-500  hover:scale-95 hover:text-white"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Se Connecter
                    </button>
                  )}
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy="single-host-origin"
                />
              </div>
            </div>
          )}
          <Discover/>
          <SuggestedAccounts/>
          <Footer/>
        </div>
      )}
    </div>
  );
}

export default SideBar