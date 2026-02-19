import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Header from '../Header'
import Footer from '../Footer'
import './BlogPost.css'

function BlogPost({ onOpenModal }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    loadPost()
  }, [slug])

  const loadPost = async () => {
    try {
      const response = await fetch('/.netlify/functions/getPosts')
      const posts = await response.json()
      const foundPost = posts.find(p => p.slug === slug)

      if (foundPost) {
        // Check if post is published and not scheduled for future
        const now = new Date()
        const publishDate = new Date(foundPost.publishDateTime)
        
        if (foundPost.status === 'published' && publishDate <= now) {
          setPost(foundPost)
        } else {
          setNotFound(true)
        }
      } else {
        setNotFound(true)
      }
    } catch (error) {
      console.error('Error loading post:', error)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPlainTextExcerpt = (htmlContent) => {
    const div = document.createElement('div')
    div.innerHTML = htmlContent
    const text = div.textContent || div.innerText || ''
    return text.substring(0, 160)
  }

  if (loading) {
    return (
      <div className="app">
        <Header onOpenModal={onOpenModal} />
        <div className="loading-post">Loading...</div>
        <Footer />
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="app">
        <Header onOpenModal={onOpenModal} />
        <div className="post-not-found">
          <h1>Post Not Found</h1>
          <p>The post you're looking for doesn't exist or is not yet published.</p>
          <button onClick={() => navigate('/blog')} className="back-button">
            Back to Blog
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.featureImage,
    "datePublished": post.publishDateTime,
    "dateModified": post.updatedAt || post.publishDateTime,
    "author": {
      "@type": "Organization",
      "name": "Honeyfoot Digital Co."
    },
    "publisher": {
      "@type": "Organization",
      "name": "Honeyfoot Digital Co.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://app.honeyfootco.com/logo.png"
      }
    },
    "description": getPlainTextExcerpt(post.content),
    "keywords": post.tags.join(', ')
  }

  return (
    <div className="app">
      <Helmet>
        <title>{post.title} - Honeyfoot Digital Co.</title>
        <meta name="description" content={getPlainTextExcerpt(post.content)} />
        <meta name="keywords" content={post.tags.join(', ')} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={getPlainTextExcerpt(post.content)} />
        <meta property="og:image" content={post.featureImage} />
        <meta property="og:url" content={`https://app.honeyfootco.com/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.publishDateTime} />
        <meta property="article:modified_time" content={post.updatedAt || post.publishDateTime} />
        <meta property="article:author" content="Honeyfoot Digital Co." />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={getPlainTextExcerpt(post.content)} />
        <meta name="twitter:image" content={post.featureImage} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Header onOpenModal={onOpenModal} />

      <article className="blog-post">
        <div className="post-header">
          {post.featureImage && (
            <div className="post-hero-image">
              <img src={post.featureImage} alt={post.title} />
            </div>
          )}
          <div className="post-header-content container">
            <div className="post-meta">
              <time dateTime={post.publishDateTime}>
                {formatDate(post.publishDateTime)}
              </time>
            </div>
            <h1>{post.title}</h1>
          </div>
        </div>

        <div className="post-content container">
          <div 
            className="post-body" 
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
          {post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map(tag => (
                <span key={tag} className="post-tag">{tag}</span>
              ))}
            </div>
          )}
        <div className="post-footer container">
          <button onClick={() => navigate('/blog')} className="back-button">
            ← Back to Blog
          </button>
        </div>
      </article>

      <Footer />
    </div>
  )
}

export default BlogPost
