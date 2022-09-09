import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {GoogleLogin, googleLogout} from '@react-oauth/google'
import { useRouter } from 'next/router'
import {AiOutlineLogout} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import {IoMdAdd} from 'react-icons/io'
import { ImUpload2 } from 'react-icons/im';


import Logo from '../utils/GS-logo.png'
import { createOrGetUser } from '../utils'

import useAuthStore from '../store/authStore'

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
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
      <div>search</div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10 text-[#00af12] capitalize ">
            <Link href="/upload">
              <button className="border border-[#00af12] px-3 py-1 md:px-5  text-md font-semibold flex items-center gap-2 rounded-md hover:scale-95">
                <ImUpload2 className="text-xl text-[#00af12]" />
                {''}
                <span className="text-[#00af12] hidden md:block">Partager</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt="PhotoProfil"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2 rounded-full shadow-sm shadow-white hover:scale-95"
              onClick={()=>{
                googleLogout()
                removeUser()
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