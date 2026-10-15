import { getCollection } from 'astro:content';
export async function publishedNotes() {
  return (
    await getCollection(
      'notes',
      ({ data }) => data.status === 'published' && data.publishedAt <= new Date(),
    )
  ).sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}
