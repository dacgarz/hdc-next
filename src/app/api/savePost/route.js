import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { post, isEditing, originalSlug } = await request.json()
    const repo = process.env.GITHUB_REPO
    const token = process.env.GITHUB_TOKEN

    // Get current posts.json from GitHub
    const getResponse = await fetch(
      `https://api.github.com/repos/${repo}/contents/public/posts/posts.json`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    let posts = []
    let sha = null

    if (getResponse.ok) {
      const data = await getResponse.json()
      sha = data.sha
      const content = Buffer.from(data.content, 'base64').toString('utf8')
      posts = JSON.parse(content)
    }

    if (isEditing) {
      const index = posts.findIndex((p) => p.slug === originalSlug)
      if (index !== -1) {
        posts[index] = { ...posts[index], ...post }
      } else {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }
    } else {
      const slugExists = posts.some((p) => p.slug === post.slug)
      if (slugExists) {
        return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 400 })
      }
      posts.push(post)
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
          message: isEditing ? `Update post: ${post.title}` : `Create post: ${post.title}`,
          content: newContent,
          sha: sha,
          branch: 'main',
        }),
      }
    )

    if (!updateResponse.ok) {
      throw new Error('Failed to update posts on GitHub')
    }

    return NextResponse.json({ success: true, post })
  } catch (error) {
    console.error('Error saving post:', error)
    return NextResponse.json({ error: 'Failed to save post', details: error.message }, { status: 500 })
  }
}
