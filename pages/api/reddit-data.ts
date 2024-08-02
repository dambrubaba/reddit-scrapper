import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    const response = await axios.get(`https://www.reddit.com/search.json?q=${keyword}&limit=10`);
    const posts = response.data.data.children.map((child: any) => ({
      title: child.data.title,
      subreddit: child.data.subreddit,
      score: child.data.score,
      num_comments: child.data.num_comments,
      author: child.data.author,
    }));

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Reddit' });
  }
}