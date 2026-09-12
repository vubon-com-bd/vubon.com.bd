import { BLOG_STATUS } from '@vubon/shared-constants/src/content/blog-status.constants';
import { BLOG } from '@vubon/shared-constants/src/content/blog.constants';

export interface BlogInput {
  title: string;
  slug: string;
  content: string;
  status: string;
  type: string;
  isPublished: boolean;
}

export const validateBlog = (blog: Partial<BlogInput>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!blog.title) errors.push('Blog title is required');
  if (!blog.slug) errors.push('Blog slug is required');
  if (!blog.content) errors.push('Blog content is required');
  if (blog.status && !Object.keys(BLOG_STATUS).includes(blog.status)) {
    errors.push('Invalid blog status');
  }
  if (blog.type && !Object.keys(BLOG.BLOG_TYPES).includes(blog.type)) {
    errors.push('Invalid blog type');
  }
  return { isValid: errors.length === 0, errors };
};

export const isBlogPublished = (blog: BlogInput): boolean => {
  return blog.isPublished && blog.status === 'published';
};
