import React from 'react';
import { BiCommentX } from 'react-icons/bi';
import { BsFillSignpostSplitFill } from 'react-icons/bs';
import { MdOutlineVideocamOff } from 'react-icons/md';


interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">
        {text === 'Pas de commentaires.. Soyez le premier !' ? (
          <BiCommentX />
        ) : (
          <BsFillSignpostSplitFill />
        )}
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResults;
