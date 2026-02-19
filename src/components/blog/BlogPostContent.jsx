'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import { useState } from 'react'
import './BlogPost.css'

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPostContent({ post }) {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [formType, setFormType] = useState('')

  const openModal = (type) => {
    setFormType(type)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setFormType('')
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.featureImage,
    datePublished: post.publishDateTime,
    dateModified: post.updatedAt || post.publishDateTime,
    author: { '@type': 'Organization', name: 'Honeyfoot Digital Co.' },
    publisher: {
      '@type': 'Organization',
      name: 'Honeyfoot Digital Co.',
      logo: { '@type': 'ImageObject', url: 'https://app.honeyfootco.com/logo.png' },
    },
    description: post.content.replace(/<[^>]+>/g, '').substring(0, 160),
    keywords: post.tags.join(', '),
  }

  return (
    <div className="app">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header onOpenModal={openModal} />

      <article className="blog-post">
        <div className="post-header">
          {post.featureImage && (
            <div className="post-hero-image">
              <img src={post.featureImage} alt={post.title} />
            </div>
          )}
          <div className="post-header-content container">
            <div className="post-meta">
              <time dateTime={post.publishDateTime}>{formatDate(post.publishDateTime)}</time>
            </div>
            <h1>{post.title}</h1>
          </div>
        </div>

        <div className="post-content container">
          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="post-tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="post-footer container">
          <button onClick={() => router.push('/blog')} className="back-button">
            ← Back to Blog
          </button>
        </div>
      </article>

      <Footer />
      <ContactModal isOpen={modalOpen} onClose={closeModal} formType={formType} />
    </div>
  )
}
