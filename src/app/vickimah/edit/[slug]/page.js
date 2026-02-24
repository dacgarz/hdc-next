import PostEditorClient from '@/components/admin/PostEditor'

export const metadata = {
  title: 'Edit Post - Admin',
}

export default async function EditPostPage({ params }) {
  const { slug } = await params
  return <PostEditorClient slug={slug} />
}