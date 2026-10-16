import { useState, useEffect } from 'react';
import { getSettings } from '../api/settings';

export function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetch() {
      try {
        const data = await getSettings();
        if (mounted) setSettings(data);
      } catch (err) {
        console.error('Settings fetch error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetch();
    return () => { mounted = false; };
  }, []);

  return { settings, loading };
}