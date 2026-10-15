import { getCollection } from 'astro:content';
export async function publishedProjects() {
  return (await getCollection('projects', ({ data }) => data.status === 'published')).sort(
    (a, b) => a.data.order - b.data.order,
  );
}
