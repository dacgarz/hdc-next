import Link from 'next/link'
import './PostCard.css'

function getExcerpt(content) {
  const text = content.replace(/<[^>]+>/g, '')
  return text.substring(0, 150) + (text.length > 150 ? '...' : '')
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <Link href={`/blog/${post.slug}`} className="post-card-link">
        {post.featureImage && (
          <div className="post-card-image">
            <img src={post.featureImage} alt={post.title} />
          </div>
        )}
        <div className="post-card-content">
          <div className="post-card-meta">
            <span className="post-date">{formatDate(post.publishDateTime)}</span>
            {post.tags.length > 0 && (
              <span className="post-tag">{post.tags[0]}</span>
            )}
          </div>
          <h3 className="post-card-title">{post.title}</h3>
          <p className="post-card-excerpt">{getExcerpt(post.content)}</p>
          <span className="read-more">Read More →</span>
        </div>
      </Link>
    </article>
  )
}
