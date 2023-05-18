import { Router } from 'express';
import * as Posts from './controllers/post_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// ? your routes will go here
router.post('/posts', async (req, res) => {
  try {
    const postInfo = req.body;
    const post = await Posts.createPost(postInfo);
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/posts', async (req, res) => {
  try {
    const rawPosts = await Posts.getPosts();
    const posts = rawPosts.map((post) => {
      return reformatPostTags(post);
    });
    console.log(`posts: ${posts}`);
    return res.json(posts);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.getPost(id);
    return res.json(reformatPostTags(post));
  } catch (error) {
    // return res.status(404).json({ error: error.message });
    return res.status(404).json({ error: 'Post not found'});
  }
});

router.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Posts.deletePost(id);
    return res.status(200).json({ id });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

router.put('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const postInfo = req.body;
    const post = await Posts.updatePost(id, postInfo);
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

function reformatPostTags(post) {
  const {
    title, id, tags, content, coverUrl,
  } = post;
  return {
    title,
    id,
    tags: tags.join(','),
    content,
    coverUrl,
  };
}

export default router;
