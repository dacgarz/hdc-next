'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from './ProtectedRoute'
import './AdminPanel.css'

function AdminPanelInner() {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/getPosts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error loading posts:', error)
      setMessage('Error loading posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (slug, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const response = await fetch('/api/deletePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })

      if (response.ok) {
        setMessage('Post deleted successfully')
        loadPosts()
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error('Failed to delete post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      setMessage('Error deleting post')
    }
  }

  const getStatusBadge = (post) => {
    const now = new Date()
    const publishDate = new Date(post.publishDateTime)
    if (post.status === 'draft') return <span className="badge badge-draft">Draft</span>
    if (publishDate > now) return <span className="badge badge-scheduled">Scheduled</span>
    return <span className="badge badge-published">Published</span>
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  if (loading) {
    return <div className="admin-panel"><div className="loading">Loading posts...</div></div>
  }

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <div className="admin-header-section">
          <h1>Manage Blog Posts</h1>
          <button className="btn-create" onClick={() => router.push('/vickimah/new')}>
            + Create New Post
          </button>
        </div>

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts yet. Create your first post!</p>
            <button className="btn-create" onClick={() => router.push('/vickimah/new')}>
              Create First Post
            </button>
          </div>
        ) : (
          <div className="posts-table-container">
            <table className="posts-table">
              <thead>
                <tr>
                  <th>Title</th><th>Status</th><th>Publish Date</th><th>Tags</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.slug}>
                    <td>
                      <div className="post-title">
                        {post.featureImage && (
                          <img src={post.featureImage} alt={post.title} className="post-thumbnail" />
                        )}
                        <span>{post.title}</span>
                      </div>
                    </td>
                    <td>{getStatusBadge(post)}</td>
                    <td>{formatDate(post.publishDateTime)}</td>
                    <td>
                      <div className="tags">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                        {post.tags.length > 3 && <span className="tag">+{post.tags.length - 3}</span>}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-edit" onClick={() => router.push(`/vickimah/edit/${post.slug}`)}>Edit</button>
                        <button className="btn-delete" onClick={() => handleDelete(post.slug, post.title)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="admin-footer">
          <button className="btn-view-blog" onClick={() => router.push('/blog')}>
            View Public Blog
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminPanel() {
  return (
    <ProtectedRoute>
      <AdminPanelInner />
    </ProtectedRoute>
  )
}
