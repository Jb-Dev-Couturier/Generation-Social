import axios from 'axios';
import NoResults from '../components/NoResults';
import PostCard from '../components/PostCard';
import { Post } from '../types';

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
  const { data } = await axios.get('http://localhost:3000/api/post');

  return {
    props: {
      posts: data,
    },
  };
};

export default Home;
