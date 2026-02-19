import { NextResponse } from 'next/server'

export async function GET() {
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
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json([])
      }
      throw new Error('Failed to fetch posts from GitHub')
    }

    const data = await response.json()
    const content = Buffer.from(data.content, 'base64').toString('utf8')
    const posts = JSON.parse(content)

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 })
  }
}
