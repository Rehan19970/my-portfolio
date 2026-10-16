import { useState, useEffect } from 'react';
import { getAllSkills } from '../api/skills';

export function useSkills() {
  const [skills, setSkills] = useState({ frontend: [], tools: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetch() {
      try {
        const data = await getAllSkills();
        if (mounted) {
          setSkills({
            frontend: data.filter((s) => s.category === 'frontend'),
            tools: data.filter((s) => s.category === 'tools'),
          });
        }
      } catch (err) {
        console.error('Skills fetch error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetch();
    return () => { mounted = false; };
  }, []);

  return { skills, loading };
}