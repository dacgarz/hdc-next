import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/blog/BlogPostContent'

async function getPost(slug) {
  try {
    const repo = process.env.GITHUB_REPO
    const token = process.env.GITHUB_TOKEN

    const response = await fetch(
      `https://api.github.com/repos/${repo}/contents/public/posts/posts.json`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) return null

    const data = await response.json()
    const content = Buffer.from(data.content, 'base64').toString('utf8')
    const posts = JSON.parse(content)
    const post = posts.find((p) => p.slug === slug)

    if (!post) return null

    const now = new Date()
    const publishDate = new Date(post.publishDateTime)
    if (post.status !== 'published' || publishDate > now) return null

    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found' }

  const plainText = post.content.replace(/<[^>]+>/g, '').substring(0, 160)

  return {
    title: `${post.title} - Honeyfoot Digital Co.`,
    description: plainText,
    keywords: post.tags.join(', '),
    openGraph: {
      type: 'article',
      title: post.title,
      description: plainText,
      images: post.featureImage ? [post.featureImage] : [],
      url: `https://app.honeyfootco.com/blog/${post.slug}`,
      publishedTime: post.publishDateTime,
      modifiedTime: post.updatedAt || post.publishDateTime,
      authors: ['Honeyfoot Digital Co.'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: plainText,
      images: post.featureImage ? [post.featureImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}
