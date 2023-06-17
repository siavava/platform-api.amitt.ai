import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import { reformatPostTags } from './utils';
import { PostType } from './types';

const router = Router();

router.get('/', (req, res) => {
  // res.json({ message: 'welcome to my blog api!' });

  res.sendFile('./index.html', { root: `${__dirname}/../public` });
});

router.get('/test', (req, res) => {
  res.json({ message: 'This is a test route.' });
});

// ? your routes will go here
router.post('/posts', async (req, res) => {
  try {
    const postInfo = req.body;
    const post: PostType = await Posts.createPost(postInfo);
    return res.json(post);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/posts', async (req, res) => {
  try {
    const rawPosts: PostType[] = await Posts.getPosts();
    const posts = rawPosts.map((post) => {
      return reformatPostTags(post);
    });
    console.log(`posts: ${posts}`);
    return res.json(posts);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post: PostType | null = await Posts.getPost(id);
    return post
      ? res.json(reformatPostTags(post))
      : res.status(404).json({ error: 'Post not found' });
  } catch (error) {
    // return res.status(404).json({ error: error.message });
    return res.status(404).json({ error: 'Post not found' });
  }
});

router.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Posts.deletePost(id);
    return res.status(200).json({ id });
  } catch (error: any) {
    return res.json({ error: error.message });
  }
});

router.put('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const postInfo = req.body;
    const post: PostType | null = await Posts.updatePost(id, postInfo);
    return res.json(post);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
