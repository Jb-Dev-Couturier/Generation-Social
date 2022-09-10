import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { BASE_URL } from '../../utils';
import { Post } from '../../types';

import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';

interface IProps {
  postDetails: Post;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const { userProfile }: any = useAuthStore();

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

    const handleLike = async (like: boolean) => {
      if (userProfile) {
        const res = await axios.put(`${BASE_URL}/api/like`, {
          userId: userProfile._id,
          postId: post._id,
          like,
        });
        setPost({ ...post, likes: res.data.likes });
      }
    };

  return (
    <>
      {post && (
        <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
          <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-zinc-800">
            <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
              <p
                className="cursor-pointer bg-zinc-800 rounded-full p-1 border border-[#ffffff] hover:border-[#00af12]"
                onClick={() => router.back()}
              >
                <MdOutlineCancel className="text-[#ffffff] hover:text-[#00af12] text-[35px] hover:opacity-90" />
              </p>
            </div>
            <div className="relative ">
              <div className="lg:h-[100vh] h-[60vh]">
                {postDetails.video ? (
                  //video
                  <video
                    loop
                    ref={videoRef}
                    src={postDetails.video.asset.url}
                    className="h-full cursor-pointer"
                    onClick={onVideoClick}
                  ></video>
                ) : (
                  //image
                  <img
                    className="object-contain h-full cursor-pointer"
                    src={postDetails.image.asset.url}
                    alt="PhotoPost"
                  ></img>
                )}
              </div>

              <div className="absolute top-[45%] left-[45%] cursor-pointer">
                {!isPlaying && postDetails.video && (
                  <button onClick={onVideoClick}>
                    <BsFillPlayFill className="text-[#ffffff] hover:text-[#00af12] text-6xl lg:text-8xl bg-zinc-800 rounded-full p-1 pl-2 border border-[#ffffff] hover:border-[#00af12]" />
                  </button>
                )}
              </div>
            </div>
            {postDetails.video && (
              <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer">
                {isVideoMuted ? (
                  <button onClick={() => setIsVideoMuted(false)}>
                    <HiVolumeOff className="text-[#ffffff] hover:text-[#00af12] text-3xl lg:text-4xl  bg-zinc-800 rounded-full p-1 border border-[#ffffff] hover:border-[#00af12]" />
                  </button>
                ) : (
                  <button onClick={() => setIsVideoMuted(true)}>
                    <HiVolumeUp className="text-[#ffffff] hover:text-[#00af12] text-3xl lg:text-4xl  bg-zinc-800 rounded-full p-1 border border-[#ffffff] hover:border-[#00af12]" />
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
            <div className="lg:mt-20 mt-10">
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className="flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer">
                  <Image
                    width={60}
                    height={60}
                    alt="user-profile"
                    className="rounded-full"
                    src={post.postedBy.image}
                  />
                  <div>
                    <div className="text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center">
                      {post.postedBy.userName.replace(/\s+/g, '')}{' '}
                      <GoVerified className="text-[#00af12] text-xl" />
                    </div>
                    <p className="text-md"> {post.postedBy.userName}</p>
                  </div>
                </div>
              </Link>
              <div className="px-10">
                <p className=" text-md text-gray-600">
                  {' '}
                  <span className=" text-lg font-semibold text-gray-700">
                    Légendes :
                  </span>{' '}
                  {post.caption}
                </p>
              </div>
              <div className="mt-10 px-10">
                {userProfile && (
                  
                   <LikeButton
                     likes={post.likes}
                     flex="flex"
                     handleLike={() => handleLike(true)}
                     handleDislike={() => handleLike(false)}
                   />
                )}
              </div>
              
               <Comments
                //comment={comment}
                //setComment={setComment}
                //addComment={addComment}
                //comments={post.comments}
                //isPostingComment={isPostingComment}
              /> 
            </div>
          </div>
        </div>
      )}
    </>
  );
};

//Appel a sanity pour opbtenir les detail du post
export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: res.data },
  };
};

export default Detail;
