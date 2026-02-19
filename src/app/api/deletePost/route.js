import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const repo = process.env.GITHUB_REPO
    const token = process.env.GITHUB_TOKEN

    const getResponse = await fetch(
      `https://api.github.com/repos/${repo}/contents/public/posts/posts.json`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (!getResponse.ok) {
      throw new Error('Failed to fetch posts from GitHub')
    }

    const data = await getResponse.json()
    const sha = data.sha
    const content = Buffer.from(data.content, 'base64').toString('utf8')
    let posts = JSON.parse(content)

    const originalLength = posts.length
    posts = posts.filter((p) => p.slug !== slug)

    if (posts.length === originalLength) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const newContent = Buffer.from(JSON.stringify(posts, null, 2)).toString('base64')

    const updateResponse = await fetch(
      `https://api.github.com/repos/${repo}/contents/public/posts/posts.json`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Delete post: ${slug}`,
          content: newContent,
          sha: sha,
          branch: 'main',
        }),
      }
    )

    if (!updateResponse.ok) {
      throw new Error('Failed to delete post on GitHub')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
