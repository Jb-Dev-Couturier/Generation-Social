import type { NextApiRequest, NextApiResponse } from 'next';

import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from './../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query;

    const query = singleUserQuery(id);
    const userPostsQuery = userCreatedPostsQuery(id);
    const userLikedQueryPosts = userLikedPostsQuery(id);

    const user = await client.fetch(query);
    const userPosts = await client.fetch(userPostsQuery);
    const userLikedPosts = await client.fetch(userLikedQueryPosts);

    const data = { user: user[0], userPosts, userLikedPosts };

    res.status(200).json(data);
  }
}
