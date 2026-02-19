import PostEditorClient from '@/components/admin/PostEditor'

export const metadata = {
  title: 'Edit Post - Admin',
}

export default function EditPostPage({ params }) {
  return <PostEditorClient slug={params.slug} />
}
