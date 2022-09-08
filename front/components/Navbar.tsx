import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {GoogleLogin,GoogleLogout}from 'react-google-login'
import {AiOutlineLogout} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import {IoMdAdd} from 'react-icons/io'

import Logo from '../utils/GS-logo.png'

const Navbar = () => {
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
    </div>
  );
}

export default Navbar