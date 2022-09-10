import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import NoResults from './NoResults';
import { IUser } from '../types';

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { allUsers, userProfile }: any = useAuthStore();

  return (
    <div className="border-t-2 border-[#00af12] bg-zinc-800 pt-4 px-10 mt-4  border-b-2 lg:pb-0 pb-[100px] text-white">
      <div className="overflow-scroll bg-scroll-[#00af12] lg:h-[457px]">
        {comments?.length ? (
          comments.map((item, idx) => (
            <>
              {allUsers.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12">
                            <Image
                              width={34}
                              height={34}
                              className="rounded-full"
                              src={user.image}
                              alt="user-profile"
                              layout="responsive"
                            />
                          </div>

                          <p className="flex gap-1 cursor-pointer items-center text-[18px] font-bold leading-6 text-zinc-300">
                            @{user.userName}{' '}
                            <GoVerified className="text-[#00af12]" />
                          </p>
                        </div>
                      </Link>
                      <div>
                        <p className="-mt-5 ml-16 text-[16px] text-zinc-500 mr-8">
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="Pas de commentaires.. Soyez le premier !" />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10 ">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-primary px-6 py-4 text-zinc-800 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-1 focus:border-[#00af12] flex-1 rounded-lg"
              placeholder="Que voulez vous dire..."
            />
            <button
              className="text-md text-[#00af12]  border-2 border-[#00af12] bg-primary rounded-lg px-6 py-4 hover:bg-[#00af12] hover:text-[#ffffff] hover:scale-95"
              onClick={addComment}
            >
              {isPostingComment ? 'En cours...' : 'Commenter'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
