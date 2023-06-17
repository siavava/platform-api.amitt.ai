import { PostType } from '../types';

/**
 * Reformat post tags
 * @param post
 * @returns post with tags as a string
 * 
 * @example
 * const post = {
 *  title: 'title',
 *  id: 1,
 *  tags: ['tag1', 'tag2'],
 *  content: 'content',
 *  coverUrl: 'coverUrl',
 * };
 * const postWithTagsAsString = reformatPostTags(post);
 * console.log(postWithTagsAsString);
 * // {
 * //   title: 'title',
 * //   id: 1,
 * //   tags: 'tag1,tag2',
 * //   content: 'content',
 * //   coverUrl: 'coverUrl',
 * // }
 */
export function reformatPostTags(post: PostType) {
  const { title, id, tags, content, coverUrl } = post;
  const joinedTags = typeof tags === 'string'
    ? tags
    : tags?.join(',');
  return {
    title,
    id,
    tags: joinedTags,
    content,
    coverUrl,
  } as PostType;
}
