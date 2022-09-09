import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {topics} from '../utils/constants'

const Discover = () => {

  const router = useRouter()
  const {topic}= router.query
  const activeTopicStyle =
    'xl:border-2  border-r-2 border-green-500 xl:border-green-500 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#00af12] hover:xl:border-green-500';
  const topicStyle =
    'xl:border-2 hover:bg-primary hover:border-r-2 border-green-500 xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black hover:text-[#00af12] hover:xl:border-green-500';
  return (
    <div className="xl:border-b-2 xl:border-gray-400 ">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Thème Populaires
      </p>
      <div className="flex gap-3 pl-1 flex-wrap mb-5">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="font-bold text-2xl xl:text-md">{item.icon}</span>
              <span className="capitalize font-medium text-md hidden xl:block">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Discover