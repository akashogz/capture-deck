import { EditorLayout } from '@/components/EditorLayout'

export default async function EditorPage({ params }) {
  const { mode } = await params

  return <EditorLayout initialMode={mode} />
}