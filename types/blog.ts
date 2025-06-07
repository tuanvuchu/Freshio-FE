export type BlogData = {
  title: string;
  image: string;
  description: string;
  content: Array<{ paragraph: string; quote?: string }>;
  slug: string;
  created_at: Date;
  author: string;
  comment_count: number;
  categories: Array<{ name?: string; slug?: number }>;
};
