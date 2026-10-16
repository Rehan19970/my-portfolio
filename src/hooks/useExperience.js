import { useState, useEffect } from 'react';
import { getAllExperience } from '../api/experience';

export function useExperience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetch() {
      try {
        const data = await getAllExperience();
        if (mounted) setExperience(data);
      } catch (err) {
        console.error('Experience fetch error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetch();
    return () => { mounted = false; };
  }, []);

  return { experience, loading };
}