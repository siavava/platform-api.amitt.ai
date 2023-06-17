import Post from '../models/post_model';
import { PostType } from '../types';

export async function createPost(postFields: PostType) {
  // await creating a post
  const post = new Post();
  post.title = postFields?.title;
  post.tags = typeof postFields.tags === "string"
    ? postFields?.tags.split(',')
    : typeof postFields.tags === "undefined"
      ? [] : postFields.tags;
  post.content = postFields?.content || '';
  post.coverUrl = postFields?.coverUrl || '';
  await post.save();
  return post;
}
export async function getPosts() {
  // await finding posts
  const posts = await Post.find({});
  return posts || {};
}
export async function getPost(id: string) {
  // await finding one post
  const post = await Post.findById(id);
  return post;
}
export async function deletePost(id: string) {
  // await deleting a post

  const post  = await Post.findByIdAndRemove(id);
  if (!post) throw new Error(`Post ${id} not found`);
  return post.$isDeleted();
}
export async function updatePost(id: string, postFields: PostType) {
  // await updating a post by id
  const post = await Post.findById(id);
  if (!post) throw new Error(`Post ${id} not found`);
  post.title = postFields.title || post.title;
  await post.updateOne(postFields);
  return post;
}
