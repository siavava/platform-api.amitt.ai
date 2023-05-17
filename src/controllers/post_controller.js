import Post from '../models/post_model';

export async function createPost(postFields) {
  // await creating a post
  const post = new Post();
  post.title = postFields?.title;
  post.tags = postFields?.tags.split(',') || [];
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
export async function getPost(id) {
  // await finding one post
  const post = await Post.findById(id);
  return post;
}
export async function deletePost(id) {
  // await deleting a post

  const post = await Post.findByIdAndRemove(id);
  return post.$isDeleted();
}
export async function updatePost(id, postFields) {
  // await updating a post by id
  const post = await Post.findById(id);
  post.title = postFields.title || post.title;
  await post.save();
  await post.updateOne(postFields);
}
