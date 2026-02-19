import BlogList from '@/components/blog/BlogList'

export const metadata = {
  title: 'Blog - Honeyfoot Digital Co.',
  description: 'Read our latest articles about web design, development, and digital solutions.',
  openGraph: {
    title: 'Blog - Honeyfoot Digital Co.',
    description: 'Read our latest articles about web design, development, and digital solutions.',
    type: 'website',
  },
}

async function getPosts() {
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
        next: { revalidate: 60 }, // Revalidate every 60 seconds (ISR)
      }
    )

    if (!response.ok) {
      if (response.status === 404) return []
      throw new Error('Failed to fetch posts')
    }

    const data = await response.json()
    const content = Buffer.from(data.content, 'base64').toString('utf8')
    return JSON.parse(content)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const allPosts = await getPosts()

  const now = new Date()
  const publishedPosts = allPosts
    .filter((post) => {
      const publishDate = new Date(post.publishDateTime)
      return post.status === 'published' && publishDate <= now
    })
    .sort((a, b) => new Date(b.publishDateTime) - new Date(a.publishDateTime))

  return <BlogList posts={publishedPosts} />
}
