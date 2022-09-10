import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {topics} from '../utils/constants'

const Discover = () => {

  const router = useRouter()
  const {topic}= router.query
  const activeTopicStyle =
    'flex items-center gap-3 hover:bg-primary p-3 border justify-center rounded-lg border-r-2 border-green-500 xl:justify-start cursor-pointer font-semibold bg-[#00af12] hover:border-[#00af12] hover:border';
  const topicStyle =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center rounded-lg hover:border-r-2 border-green-500 xl:justify-start cursor-pointer font-semibold';
  return (
    <div className="xl:border-b-2 xl:border-gray-400 ">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Thème Populaires
      </p>
      <div className="flex gap-3 pl-1 flex-wrap mb-5 lg:flex-col ">
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