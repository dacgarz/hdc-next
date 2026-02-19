'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import PostCard from './PostCard'
import './BlogList.css'

export default function BlogList({ posts }) {
  const [selectedTag, setSelectedTag] = useState(null)
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

  const allTags = [...new Set(posts.flatMap((post) => post.tags))]
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts

  return (
    <div className="app">
      <Header onOpenModal={openModal} />

      <section className="blog-hero">
        <div className="container">
          <h1>Our Blog</h1>
          <p>Insights, tips, and stories from the world of web development</p>
        </div>
      </section>

      <section className="blog-content">
        <div className="container">
          {allTags.length > 0 && (
            <div className="tag-filter">
              <button
                className={`filter-tag ${!selectedTag ? 'active' : ''}`}
                onClick={() => setSelectedTag(null)}
              >
                All Posts
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`filter-tag ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 ? (
            <div className="no-posts">
              <p>No posts available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="posts-grid">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <ContactModal isOpen={modalOpen} onClose={closeModal} formType={formType} />
    </div>
  )
}
