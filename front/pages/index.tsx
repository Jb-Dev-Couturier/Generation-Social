import axios from 'axios';
import NoResults from '../components/NoResults';
import PostCard from '../components/PostCard';
import { Post } from '../types';
import { BASE_URL } from '../utils';

interface IProps {
  posts: Post[];
}

const Home = ({ posts }: IProps) => {
  console.log(posts);

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {posts.length ? (
        posts.map((post: Post) => (
          <PostCard post={post} key={post._id} />
        ))
      ) : (
        <NoResults text={'Pas de video'} />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      posts: data,
    },
  };
};

export default Home;
