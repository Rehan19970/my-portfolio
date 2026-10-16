import { useState, useEffect } from 'react';
import { getProjectBySlug } from '../api/projects';

export function useProject(slug) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    let mounted = true;

    async function fetchProject() {
      try {
        setLoading(true);
        const data = await getProjectBySlug(slug);
        if (mounted) {
          setProject(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.response?.data?.message || 'Project not found');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProject();
    return () => { mounted = false; };
  }, [slug]);

  return { project, loading, error };
}