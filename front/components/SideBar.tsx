import React,{useState} from 'react'
import Link from 'next/link'
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import{ImCancelCircle} from 'react-icons/im'

import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';
import useAuthStore from '../store/authStore';


const SideBar: NextPage = () => {
  const [showSideBar, setShowSideBar] = useState<Boolean>(true);
  const { pathname } = useRouter();
  const { fetchAllUsers, allUsers }: any = useAuthStore();
  const normalLink ='flex items-center gap-3 hover:bg-primary p-3 justify-center rounded-lg hover:border-r-2 border-green-500 xl:justify-start cursor-pointer font-semibold text-[#00af12] ';
  const activeLink ='flex items-center gap-3 hover:bg-primary p-3 justify-center rounded-lg hover:border-r-2 border-green-500 xl:justify-start cursor-pointer font-semibold text-[#00af12] ';
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
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className="text-2xl text-lime-500">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block ">Acceuil</span>
              </div>
            </Link>
          </div>
          <Discover />
          <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default SideBar