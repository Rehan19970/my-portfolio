import { useState, useEffect } from 'react';
import { getAllSkills } from '../api/skills';

export function useSkills() {
  const [skills, setSkills] = useState({ frontend: [], tools: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetch() {
      try {
        console.log('🎯 Fetching skills...');
        const data = await getAllSkills();
        console.log('✅ Skills data:', data);

        if (mounted) {
          const frontend = data.filter((s) => s.category === 'frontend');
          const tools = data.filter((s) => s.category === 'tools');
          console.log('📊 Frontend:', frontend.length, '| Tools:', tools.length);

          setSkills({ frontend, tools });
        }
      } catch (err) {
        console.error('❌ Skills fetch error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetch();
    return () => { mounted = false; };
  }, []);

  return { skills, loading };
}