import React, { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

import { Post } from '../types';

interface IProps {
  post: Post;
}

const PostCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  return (
    <div className="flex flex-col border-b-2 border-[#00af12] pb-6 bg-zinc-800 rounded-2xl">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer rounded font-semibold ">
          <div className="md:w-16 md:h-16 w-10 h-10 rounded-full border-2 border-[#00af12] shadow-md shadow-white">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="PhotoProfil"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center gap-2">
                <p className="flex items-center gap-2 md:text-md font-bold  text-[#fff]">
                  {post.postedBy.userName}
                  {''}
                  <GoVerified className="text-[#00af12] text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  @{post.postedBy.userName}
                </p>
              </div>
            </Link>
            <Link href={`/`}>
              <p className="mt-2 font-normal text-[#fff]">{post.caption}</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex gap-4 relative">
        {post.video ? (
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="rounded-3xl"
          >
            <Link href={`/detail/${post._id}`}>
              <video
                loop
                className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-white border border-[#00af12]"
                src={post.video.asset.url}
                ref={videoRef}
              ></video>
            </Link>
            {isHover && (
              <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-center w-[100px] md:w-[50px] lg:w-[600px] p-3">
                {playing ? (
                  <button onClick={onVideoPress}>
                    <BsFillPauseFill className="text-black text-2xl lg:text-4xl hover:text-[#00af12]" />
                  </button>
                ) : (
                  <button onClick={onVideoPress}>
                    <BsFillPlayFill className="text-black text-2xl lg:text-4xl hover:text-[#00af12]" />
                  </button>
                )}
                {isVideoMuted ? (
                  <button onClick={() => setIsVideoMuted(false)}>
                    <HiVolumeOff className="text-black text-2xl lg:text-4xl hover:text-[#00af12]" />
                  </button>
                ) : (
                  <button onClick={() => setIsVideoMuted(true)}>
                    <HiVolumeUp className="text-black text-2xl lg:text-4xl hover:text-[#00af12]" />
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <Link href={`/detail/${post._id}`}>
            <img
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-white object-contain border border-[#00af12]"
              src={post.image.asset.url}
              alt="PhotoProfil"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostCard;
