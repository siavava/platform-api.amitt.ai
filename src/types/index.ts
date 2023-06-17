

export interface PostType {
  id?: number;
  title?: string;
  content?: string;
  tags: string | string[];
  coverUrl?: string;
}
