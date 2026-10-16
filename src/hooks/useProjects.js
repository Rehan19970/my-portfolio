import { useState, useEffect } from 'react';
import { getAllProjects } from '../api/projects';
import { projects as fallbackProjects } from '../data/projects';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProjects() {
      try {
        setLoading(true);
        const data = await getAllProjects();
        if (mounted) {
          setProjects(data);
          setError(null);
        }
      } catch (err) {
        console.warn('API failed, using fallback data');
        if (mounted) {
          setProjects(fallbackProjects);
          setError(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProjects();
    return () => { mounted = false; };
  }, []);

  return { projects, loading, error };
}