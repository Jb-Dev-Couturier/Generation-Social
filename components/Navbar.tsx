import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import {GoogleLogin, googleLogout} from '@react-oauth/google'
import { useRouter } from 'next/router'
import {AiOutlineLogout} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import { ImUpload2 } from 'react-icons/im';


import Logo from '../utils/GS-logo.png'
import { createOrGetUser } from '../utils'

import { IUser } from '../types';
import useAuthStore from '../store/authStore'

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState('');
  const { userProfile, addUser, removeUser, } = useAuthStore();
 const router = useRouter();

    useEffect(() => {
      setUser(userProfile);
    }, [userProfile]);

    const handleSearch = (e: { preventDefault: () => void }) => {
      e.preventDefault();

      if (searchValue) {
        router.push(`/search/${searchValue}`);
      }
    };
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-green-500 py-2 px-4 bg-zinc-800 rounded-b-lg ">
      <Link href={'/'}>
        <div className="w-[150px] md:w-[180px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="GSocial"
            layout="responsive"
          />
        </div>
      </Link>
      <div className="relative hidden lg:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-zinc-800"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="focus:bg-primary overflow-hidden bg-white p-2 md:text-md font-medium border-2 border-[#0a6413] focus:outline-none focus:border-2 focus:border-[#00af12] w-[450px] md:w-[450px] rounded-full  md:top-0"
            placeholder="Rechercher Compte Ou Post"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-[-50px] bg-white hover:bg-[#00af12] right-6 top-4 border-l-2 border-r-2 border-[#00af12] pl-2 pr-2 text-2xl hover:text-[#ffffff] rounded-full"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {user ? (
          <div className="flex gap-5 md:gap-10 text-[#00af12] capitalize ">
            <Link href="/upload">
              <button className="border border-[#00af12] px-3 py-1 md:px-5  text-md font-semibold flex items-center gap-2 rounded-md hover:scale-95">
                <ImUpload2 className="text-xl text-[#00af12]" />
                {''}
                <span className="text-[#00af12] hidden md:block">Partager</span>
              </button>
            </Link>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={user.image}
                    alt="PhotoProfil"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2 rounded-full shadow-sm shadow-white hover:scale-95"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={26} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('Erreur de connection')}
          />
        )}
      </div>
    </div>
  );
}

export default Navbar