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
      logo: { '@type': 'ImageObject', url: 'https://honeyfootco.com/HDC-Logo.webp' },
    },
    description: post.content.replace(/<[^>]+>/g, '').substring(0, 160),
    keywords: post.tags.join(', '),
    url: `https://honeyfootco.com/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://honeyfootco.com/blog/${post.slug}`,
    },
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
          <a href="tel:3057070889" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call for a Free Consultation
          </a>
        </div>
      </article>

      <Footer />
      <ContactModal isOpen={modalOpen} onClose={closeModal} formType={formType} />
    </div>
  )
}
