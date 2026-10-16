import { useEffect, useState } from 'react';
import { getAllExperience } from '../api/experience';

export default function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchExperience() {
      try {
        setLoading(true);
        console.log('🔍 Fetching experience...');
        const data = await getAllExperience();
        console.log('✅ Experience data:', data);

        if (mounted) {
          // Data array hai ya nahi check karo
          if (Array.isArray(data)) {
            setExperience(data);
          } else {
            setExperience([]);
          }
          setError(null);
        }
      } catch (err) {
        console.error('❌ Experience fetch error:', err);
        if (mounted) {
          setError(err.response?.data?.message || err.message || 'Failed to load');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchExperience();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="sec" id="experience">
      <div className="wrap">
        <div className="head" style={{ textAlign: 'center' }}>
          <div className="eyebrow reveal">04 / Experience</div>
          <h2 className="title reveal" style={{ '--d': '.08s' }}>
            My <span>journey</span> so far
          </h2>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', color: '#7fe9ff', padding: '40px 0' }}>
            Loading experience...
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', color: '#ff8a8a', padding: '40px 0' }}>
            Error: {error}
          </div>
        )}

        {!loading && !error && experience.length === 0 && (
          <div style={{ textAlign: 'center', color: '#7f97b8', padding: '40px 0' }}>
            No experience added yet.
          </div>
        )}

        {!loading && experience.length > 0 && (
          <div className="tl">
            {experience.map((item, i) => (
              <div
                key={item._id}
                className="ti reveal in"
                style={{ '--d': `${i * 0.08}s` }}
              >
                <div className="card">
                  <div className="when">{item.when}</div>
                  <h3>{item.title}</h3>
                  <em>{item.company}</em>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}