'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from './ProtectedRoute'
import './PostEditor.css'

function RichTextEditor({ value, onChange }) {
  const [content, setContent] = useState(value || '')

  useEffect(() => { setContent(value || '') }, [value])

  const handleChange = (e) => {
    setContent(e.target.value)
    onChange(e.target.value)
  }

  const insertFormatting = (tag, closeTag) => {
    const textarea = document.getElementById('content-editor')
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const before = content.substring(0, start)
    const after = content.substring(end)
    const newContent = `${before}${tag}${selectedText}${closeTag || tag}${after}`
    setContent(newContent)
    onChange(newContent)
    setTimeout(() => {
      textarea.focus()
      const newPosition = start + tag.length + selectedText.length
      textarea.setSelectionRange(newPosition, newPosition)
    }, 0)
  }

  const formatButtons = [
    { label: 'H1', action: () => insertFormatting('<h1>', '</h1>') },
    { label: 'H2', action: () => insertFormatting('<h2>', '</h2>') },
    { label: 'H3', action: () => insertFormatting('<h3>', '</h3>') },
    { label: 'Bold', action: () => insertFormatting('<strong>', '</strong>') },
    { label: 'Italic', action: () => insertFormatting('<em>', '</em>') },
    { label: 'Link', action: () => insertFormatting('<a href="URL">', '</a>') },
    { label: 'List', action: () => insertFormatting('<ul>\n  <li>', '</li>\n</ul>') },
    { label: 'Paragraph', action: () => insertFormatting('<p>', '</p>') },
  ]

  return (
    <div className="rich-text-editor">
      <div className="editor-toolbar">
        {formatButtons.map((btn, idx) => (
          <button key={idx} type="button" onClick={btn.action} className="toolbar-btn">{btn.label}</button>
        ))}
      </div>
      <div className="editor-container">
        <textarea
          id="content-editor"
          value={content}
          onChange={handleChange}
          placeholder="Write your post content here..."
          className="editor-textarea"
        />
        <div className="editor-preview">
          <div className="preview-label">Preview:</div>
          <div className="preview-content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  )
}

function PostEditorInner({ slug }) {
  const router = useRouter()
  const isEditing = !!slug

  const [formData, setFormData] = useState({
    title: '', featureImage: '', content: '',
    tags: '', publishDate: '', publishTime: '', status: 'draft',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (isEditing) loadPost()
  }, [slug])

  const loadPost = async () => {
    try {
      const response = await fetch('/api/getPosts')
      const posts = await response.json()
      const post = posts.find((p) => p.slug === slug)
      if (post) {
        const publishDate = new Date(post.publishDateTime)
        setFormData({
          title: post.title,
          featureImage: post.featureImage || '',
          content: post.content,
          tags: post.tags.join(', '),
          publishDate: publishDate.toISOString().split('T')[0],
          publishTime: publishDate.toTimeString().slice(0, 5),
          status: post.status,
        })
      }
    } catch (error) {
      console.error('Error loading post:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }))
  }

  const generateSlug = (title) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const publishDateTime = new Date(`${formData.publishDate}T${formData.publishTime}`)
      const now = new Date()

      const postData = {
        title: formData.title,
        slug: isEditing ? slug : generateSlug(formData.title),
        featureImage: formData.featureImage,
        content: formData.content,
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        publishDateTime: publishDateTime.toISOString(),
        status: publishDateTime > now ? 'scheduled' : formData.status,
        updatedAt: new Date().toISOString(),
      }

      if (!isEditing) postData.createdAt = new Date().toISOString()

      const response = await fetch('/api/savePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post: postData, isEditing, originalSlug: slug }),
      })

      if (response.ok) {
        setMessage(isEditing ? 'Post updated successfully!' : 'Post created successfully!')
        setTimeout(() => router.push('/vickimah'), 1500)
      } else {
        throw new Error('Failed to save post')
      }
    } catch (error) {
      console.error('Error saving post:', error)
      setMessage('Error saving post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="post-editor-container">
      <div className="post-editor">
        <h1>{isEditing ? 'Edit Post' : 'Create New Post'}</h1>

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required placeholder="Enter post title" />
          </div>

          <div className="form-group">
            <label htmlFor="featureImage">Feature Image URL *</label>
            <input type="url" id="featureImage" name="featureImage" value={formData.featureImage} onChange={handleChange} required placeholder="https://example.com/image.jpg" />
            {formData.featureImage && (
              <div className="image-preview"><img src={formData.featureImage} alt="Preview" /></div>
            )}
          </div>

          <div className="form-group">
            <label>Content *</label>
            <RichTextEditor value={formData.content} onChange={handleContentChange} />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="web design, development, tips" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="publishDate">Publish Date *</label>
              <input type="date" id="publishDate" name="publishDate" value={formData.publishDate} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="publishTime">Publish Time *</label>
              <input type="time" id="publishTime" name="publishTime" value={formData.publishTime} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => router.push('/vickimah')} className="btn-secondary" disabled={loading}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function PostEditor({ slug }) {
  return (
    <ProtectedRoute>
      <PostEditorInner slug={slug} />
    </ProtectedRoute>
  )
}
