import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './PostEditor.css'

// Simple Rich Text Editor Component
function RichTextEditor({ value, onChange }) {
  const [content, setContent] = useState(value || '')

  useEffect(() => {
    setContent(value || '')
  }, [value])

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
    
    // Set cursor position after inserted tags
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
          <button
            key={idx}
            type="button"
            onClick={btn.action}
            className="toolbar-btn"
            title={btn.label}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="editor-container">
        <textarea
          id="content-editor"
          value={content}
          onChange={handleChange}
          placeholder="Write your post content here... Use the toolbar buttons to format text, or write HTML directly."
          className="editor-textarea"
        />
        <div className="editor-preview">
          <div className="preview-label">Preview:</div>
          <div 
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
      <div className="editor-help">
        <strong>Quick Tips:</strong> Use the toolbar buttons or write HTML directly. Common tags: 
        &lt;p&gt;text&lt;/p&gt;, &lt;strong&gt;bold&lt;/strong&gt;, &lt;em&gt;italic&lt;/em&gt;, 
        &lt;span style="color: red"&gt;colored&lt;/span&gt;
      </div>
    </div>
  )
}

function PostEditor() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const isEditing = !!slug

  const [formData, setFormData] = useState({
    title: '',
    featureImage: '',
    content: '',
    tags: '',
    publishDate: '',
    publishTime: '',
    status: 'draft'
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (isEditing) {
      loadPost()
    }
  }, [slug])

  const loadPost = async () => {
    try {
      const response = await fetch('/.netlify/functions/getPosts')
      const posts = await response.json()
      const post = posts.find(p => p.slug === slug)
      
      if (post) {
        const publishDateTime = new Date(post.publishDateTime)
        setFormData({
          title: post.title,
          featureImage: post.featureImage,
          content: post.content,
          tags: post.tags.join(', '),
          publishDate: publishDateTime.toISOString().split('T')[0],
          publishTime: publishDateTime.toTimeString().slice(0, 5),
          status: post.status
        })
      }
    } catch (error) {
      console.error('Error loading post:', error)
      setMessage('Error loading post')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleContentChange = (value) => {
    setFormData(prev => ({
      ...prev,
      content: value
    }))
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

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
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        publishDateTime: publishDateTime.toISOString(),
        status: publishDateTime > now ? 'scheduled' : formData.status,
        updatedAt: new Date().toISOString()
      }

      if (!isEditing) {
        postData.createdAt = new Date().toISOString()
      }

      const response = await fetch('/.netlify/functions/savePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post: postData,
          isEditing,
          originalSlug: slug
        })
      })

      if (response.ok) {
        setMessage(isEditing ? 'Post updated successfully!' : 'Post created successfully!')
        setTimeout(() => {
          navigate('/adminposting123')
        }, 1500)
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
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter post title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="featureImage">Feature Image URL *</label>
            <input
              type="url"
              id="featureImage"
              name="featureImage"
              value={formData.featureImage}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
            />
            {formData.featureImage && (
              <div className="image-preview">
                <img src={formData.featureImage} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <RichTextEditor
              value={formData.content}
              onChange={handleContentChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="web design, development, tips"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="publishDate">Publish Date *</label>
              <input
                type="date"
                id="publishDate"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="publishTime">Publish Time *</label>
              <input
                type="time"
                id="publishTime"
                name="publishTime"
                value={formData.publishTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/adminposting123')}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostEditor
