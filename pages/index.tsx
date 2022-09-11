import axios from 'axios';
import NoResults from '../components/NoResults';
import PostCard from '../components/PostCard';
import { Post } from '../types';
import { BASE_URL } from '../utils';

interface IProps {
  posts: Post[];
}

const Home = ({ posts }: IProps) => {

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {posts.length ? (
        posts.map((post: Post) => (
          <PostCard post={post} key={post._id} />
        ))
      ) : (
        <NoResults text={'Pas de Post Soyez le Premier'} />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query:{topic}

}:{
  query: {topic : string}
}) => {
  let response = null
  if(topic){
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }else{

    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      posts: response.data
    },
  };
};

export default Home;
