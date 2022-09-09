import React from 'react'
import { footerList1, footerList2, footerList3 } from '../utils/constants';
import { AiFillCopyrightCircle } from 'react-icons/ai';


const List = ({items, mt}:{items:string[], mt:boolean}) => (
  <div className={`flex flex-wrap gap-2 ${mt &&'mt-5'} `}>
    {items.map((item) => (
      <p
        key={item}
        className='text-gray-400 text-sm hover:underline hover:text-[#00af12] cursor-pointer'
      >
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <p className="mt-5 text-sm flex items-center justify-center">
        2022 GenSocial <AiFillCopyrightCircle /> Tout droits réservés
      </p>
    </div>
  );
}

export default Footer