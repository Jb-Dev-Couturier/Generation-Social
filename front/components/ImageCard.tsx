import React from 'react';
import { Image } from '../types';
import { NextPage } from 'next';

interface IProps {
  postImage: Image;
}

const ImageCard: NextPage<IProps> = ({ postImage }) => {
  console.log(postImage);
  return <div>ImageCard</div>;
};

export default ImageCard;
