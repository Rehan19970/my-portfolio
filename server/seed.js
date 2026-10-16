import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './src/models/Project.js';
import Experience from './src/models/Experience.js';
import Skill from './src/models/Skill.js';
import Settings from './src/models/Settings.js';
import connectDB from './src/config/db.js';

dotenv.config();

// ==================== PROJECTS ====================
const projects = [
  {
    slug: 'neon-store',
    title: 'Neon Store',
    category: 'app',
    tags: ['React', 'Vite', 'CSS'],
    shortDesc: 'E-commerce storefront with product filters, cart and a smooth checkout flow.',
    gradient: 'linear-gradient(135deg,#0a3a8a,#12b5ff)',
    accent: '#22e5ff',
    year: '2025',
    duration: '3 weeks',
    role: 'Full Stack Developer',
    client: 'Local retail startup',
    team: 'Solo project',
    overview: 'Neon Store is a modern e-commerce storefront built for a local retail startup that wanted to sell online without paying heavy monthly fees to existing platforms.',
    problem: 'The client was selling through Instagram DMs and WhatsApp. Orders were getting lost, customers were confused about pricing, and there was no way to track inventory.',
    solution: 'Rebuilt the cart using React Context API with localStorage persistence, so the cart survives page reloads and navigation. Optimized all product images to WebP format, cutting page size from 8MB to 1.2MB.',
    challenges: [
      { title: 'Cart state management across pages', desc: 'Keeping the cart in sync when users navigated between product listing, product detail and checkout pages was tricky.' },
      { title: 'Product image loading was slow', desc: 'High-resolution product images were taking 4-5 seconds to load on mobile networks.' },
      { title: 'Checkout form validation was messy', desc: 'The first version of the checkout form allowed invalid emails and phone numbers.' }
    ],
    mistakes: [
      'Started coding before designing the data structure — had to refactor the cart logic twice.',
      'Used large PNG images instead of optimizing them — page was 8MB on first load.',
      'Did not test on real mobile devices — only tested in Chrome DevTools.'
    ],
    features: [
      'Product filtering by category, price range and rating',
      'Persistent cart using Context API + localStorage',
      'Smooth checkout flow with real-time validation',
      'Optimized WebP images with lazy loading',
      'Fully responsive — tested on 12+ real devices',
      'Dark neon theme with animated product cards'
    ],
    techStack: [
      { name: 'React', reason: 'Component reusability and state management' },
      { name: 'Vite', reason: 'Fast dev server and optimized builds' },
      { name: 'Context API', reason: 'Global cart state without Redux overhead' },
      { name: 'CSS3', reason: 'Custom animations and responsive layout' }
    ],
    results: [
      { label: 'Page load time', before: '4.8s', after: '0.9s' },
      { label: 'Page size', before: '8MB', after: '1.2MB' },
      { label: 'Mobile conversion', before: '0.8%', after: '3.4%' }
    ],
    lessons: [
      'Design the data structure before writing any UI code.',
      'Optimize images from day one — it is the biggest performance win.',
      'Always test on real devices, not just DevTools.'
    ],
    liveUrl: '#',
    sourceUrl: '#',
    order: 1
  },
  {
    slug: 'taskflow',
    title: 'TaskFlow Dashboard',
    category: 'app',
    tags: ['JavaScript', 'Charts', 'UI'],
    shortDesc: 'Productivity dashboard with live charts, boards and drag & drop task management.',
    gradient: 'linear-gradient(135deg,#3b1a8a,#8a6bff)',
    accent: '#b49bff',
    year: '2025',
    duration: '4 weeks',
    role: 'Frontend Developer',
    client: 'Internal team tool',
    team: 'Solo project',
    overview: 'TaskFlow is a productivity dashboard built to help small teams track tasks, visualize progress and stay on top of deadlines.',
    problem: 'The team was using spreadsheets to track tasks. Updating status meant opening Excel and manually changing cells. There was no visual overview of progress.',
    solution: 'Unified all task state in a single source of truth so the board and charts always stayed in sync. Added throttling to chart updates and virtualized long lists.',
    challenges: [
      { title: 'Drag & drop was buggy', desc: 'The initial implementation using HTML5 API kept losing track of which task was being dragged.' },
      { title: 'Charts were slow with many data points', desc: 'Rendering 500+ data points caused noticeable lag.' }
    ],
    mistakes: [
      'Used the native HTML5 drag & drop API instead of a library.',
      'Kept chart data and board data in separate states — caused sync problems.',
      'Skipped accessibility — keyboard users could not use the board at all.'
    ],
    features: [
      'Kanban board with smooth drag & drop (mouse + touch)',
      'Live charts for task completion and team workload',
      'Team member assignment with avatars',
      'Full keyboard navigation',
      'Search and filter across all tasks'
    ],
    techStack: [
      { name: 'JavaScript', reason: 'Vanilla JS for full control over drag logic' },
      { name: 'Chart.js', reason: 'Lightweight charting with good performance' },
      { name: 'CSS3 Grid', reason: 'Complex board layout' }
    ],
    results: [
      { label: 'Task update time', before: '~45s', after: '~3s' },
      { label: 'Chart render time', before: '1.2s', after: '180ms' },
      { label: 'Missed deadlines', before: '~30%', after: '~8%' }
    ],
    lessons: [
      'Do not reinvent drag & drop — use a proven library.',
      'One source of truth for state prevents 90% of sync bugs.',
      'Accessibility is not optional — test with keyboard from day one.'
    ],
    liveUrl: '#',
    sourceUrl: '#',
    order: 2
  },
  {
    slug: 'aurora-landing',
    title: 'Aurora Landing',
    category: 'land',
    tags: ['HTML', 'CSS', 'Animation'],
    shortDesc: 'Animated product landing page with scroll effects and an interactive 3D-style hero.',
    gradient: 'linear-gradient(135deg,#8a1a5a,#ff8a5b)',
    accent: '#ffb36b',
    year: '2024',
    duration: '2 weeks',
    role: 'Designer & Developer',
    client: 'SaaS startup',
    team: 'Solo project',
    overview: 'Aurora Landing is a high-converting landing page built for a SaaS startup. The goal was to make a product that looked like every other SaaS tool feel fresh.',
    problem: 'The startup had a great product but a bland landing page. Visitors were not scrolling past the hero. Bounce rate was 82%.',
    solution: 'Cut animations down to 3 key moments: hero entrance, scroll-triggered feature reveals and CTA hover. Replaced heavy JS animations with CSS transitions.',
    challenges: [
      { title: 'Animations tanked performance on mobile', desc: 'Scroll animations looked great on desktop but dropped frames on mid-range Android.' },
      { title: 'Too many animations competing for attention', desc: 'The first version animated everything — users did not know where to look.' }
    ],
    mistakes: [
      'Animated every element on scroll — created visual chaos.',
      'Used heavy JavaScript for animations instead of CSS where possible.',
      'Did not respect prefers-reduced-motion.'
    ],
    features: [
      'Interactive 3D-style hero with parallax layers',
      'Scroll-triggered section reveals (only 3 key moments)',
      'Mobile-first responsive design',
      'prefers-reduced-motion support',
      'Lighthouse score 98 on desktop'
    ],
    techStack: [
      { name: 'HTML5', reason: 'Semantic structure' },
      { name: 'CSS3', reason: 'Transforms and 3D effects' },
      { name: 'JavaScript', reason: 'Scroll detection with IntersectionObserver' }
    ],
    results: [
      { label: 'Bounce rate', before: '82%', after: '38%' },
      { label: 'Time on page', before: '12s', after: '1m 48s' },
      { label: 'Signup conversion', before: '1.1%', after: '6.7%' }
    ],
    lessons: [
      'Less animation is more animation.',
      'CSS transforms are almost always faster than JS animations.',
      'Design mobile-first — it forces you to prioritize.'
    ],
    liveUrl: '#',
    sourceUrl: '#',
    order: 3
  },
  {
    slug: 'weather-pulse',
    title: 'Weather Pulse',
    category: 'app',
    tags: ['JavaScript', 'API', 'CSS'],
    shortDesc: 'Real-time weather app with API integration, forecasts and animated weather icons.',
    gradient: 'linear-gradient(135deg,#0a6a6a,#22d3b6)',
    accent: '#7ff5de',
    year: '2024',
    duration: '1 week',
    role: 'Frontend Developer',
    client: 'Personal project',
    team: 'Solo project',
    overview: 'Weather Pulse is a clean, fast weather app that shows real-time conditions and a 7-day forecast.',
    problem: 'Most weather apps are bloated with ads, slow to load and confusing to read.',
    solution: 'Added debouncing to the search input. Cached responses for 10 minutes per city. Replaced animation library with lightweight CSS animations.',
    challenges: [
      { title: 'API rate limits', desc: 'The free OpenWeather API plan had rate limits that broke the app during testing.' },
      { title: 'Animated icons hurt performance', desc: 'Heavy animated SVGs lagged on low-end devices.' }
    ],
    mistakes: [
      'Called the API on every keystroke — hit rate limits fast.',
      'Did not cache API responses.',
      'Used a heavy animation library for simple weather icons.'
    ],
    features: [
      'Real-time weather from OpenWeather API',
      '7-day forecast with hourly breakdown',
      'Lightweight animated weather icons',
      'Response caching (10 minute TTL)',
      'Dark and light mode'
    ],
    techStack: [
      { name: 'JavaScript', reason: 'Core logic and API handling' },
      { name: 'OpenWeather API', reason: 'Reliable real-time weather data' },
      { name: 'CSS3', reason: 'Animations without heavy libraries' }
    ],
    results: [
      { label: 'API calls per session', before: '47', after: '4' },
      { label: 'Load time', before: '2.8s', after: '0.6s' },
      { label: 'Lighthouse', before: '71', after: '99' }
    ],
    lessons: [
      'Debounce user input that triggers API calls.',
      'Always cache API responses when possible.',
      'CSS animations beat JS libraries for simple effects.'
    ],
    liveUrl: '#',
    sourceUrl: '#',
    order: 4
  },
  {
    slug: 'fintech-ui',
    title: 'Fintech UI Kit',
    category: 'ui',
    tags: ['Figma', 'UI/UX', 'Mobile'],
    shortDesc: 'Clean, user-focused banking app concepts designed for both mobile and web.',
    gradient: 'linear-gradient(135deg,#0a5a2a,#3fe08a)',
    accent: '#a4ffc6',
    year: '2024',
    duration: '3 weeks',
    role: 'UI/UX Designer',
    client: 'Design exploration',
    team: 'Solo project',
    overview: 'A complete fintech UI kit exploring how banking apps could feel friendlier and more human.',
    problem: 'Most banking apps look the same — cold blues, dense data tables and confusing navigation.',
    solution: 'Rebuilt the palette around accessible contrasts while keeping a warm accent. Simplified onboarding to 3 screens.',
    challenges: [
      { title: 'Balancing trust with warmth', desc: 'Too warm and it stops feeling like a bank. Too cold and it feels like every other app.' },
      { title: 'Accessibility vs. aesthetics', desc: 'The first color palette looked great but failed WCAG contrast requirements.' }
    ],
    mistakes: [
      'Started with colors before understanding the user flow.',
      'Made the onboarding too long — 6 screens when 3 would do.',
      'Did not test with real users until the design was almost done.'
    ],
    features: [
      'Complete mobile and web designs',
      'WCAG AA accessible color system',
      'Clear navigation with 3-tap rule',
      'Reusable component library (60+ components)',
      'Usability tested with 5 users'
    ],
    techStack: [
      { name: 'Figma', reason: 'Industry standard for UI design' },
      { name: 'Auto Layout', reason: 'Responsive component design' },
      { name: 'Variables', reason: 'Theme switching and consistency' }
    ],
    results: [
      { label: 'Onboarding completion', before: '34%', after: '78%' },
      { label: 'Task success rate', before: '61%', after: '94%' },
      { label: 'User satisfaction', before: '3.1/5', after: '4.6/5' }
    ],
    lessons: [
      'Start with user flows, not colors.',
      'Accessibility and beauty are not enemies.',
      'Test with real users early, not at the end.'
    ],
    liveUrl: '#',
    sourceUrl: '#',
    order: 5
  },
  {
    slug: 'studio-agency',
    title: 'Studio Agency Site',
    category: 'land',
    tags: ['HTML', 'CSS', 'JavaScript'],
    shortDesc: 'Bold agency website with kinetic typography, marquee bands and smooth transitions.',
    gradient: 'linear-gradient(135deg,#1a1a5a,#4a6bff)',
    accent: '#8fb0ff',
    year: '2024',
    duration: '2 weeks',
    role: 'Designer & Developer',
    client: 'Creative agency',
    team: 'Solo project',
    overview: 'A bold, motion-heavy website for a creative agency. The goal was to make the site itself feel like a portfolio piece.',
    problem: 'The agency\'s old site looked like a generic template. They were losing pitches to smaller agencies with better-looking sites.',
    solution: 'Reserved motion for hero headlines and section transitions only — body text stays still. Rebuilt marquees with CSS transforms.',
    challenges: [
      { title: 'Marquee performance', desc: 'The infinite marquee bands caused constant repaints that drained battery on laptops.' },
      { title: 'Case study pages felt disconnected', desc: 'The transition from home page to case study pages felt jarring.' }
    ],
    mistakes: [
      'Animated text on every scroll — users could not read fast enough.',
      'Used JavaScript-driven marquees instead of CSS transforms.',
      'Ignored mobile — the first version was unusable on phones.'
    ],
    features: [
      'Kinetic typography on hero and section titles only',
      'GPU-accelerated infinite marquee bands',
      'Smooth page transitions between home and case studies',
      'Bold, memorable brand expression',
      'Fully responsive — mobile built first, not last'
    ],
    techStack: [
      { name: 'HTML5', reason: 'Semantic structure' },
      { name: 'CSS3', reason: 'GPU-accelerated transforms' },
      { name: 'JavaScript', reason: 'Page transitions and scroll detection' }
    ],
    results: [
      { label: 'Avg. session duration', before: '32s', after: '2m 14s' },
      { label: 'Pages per session', before: '1.4', after: '3.8' },
      { label: 'Pitch win rate', before: '22%', after: '58%' }
    ],
    lessons: [
      'Motion should guide attention, not fight for it.',
      'CSS transforms are faster than JS animations.',
      'A website can be a portfolio piece itself.'
    ],
    liveUrl: '#',
    sourceUrl: '#',
    order: 6
  }
];

// ==================== EXPERIENCE ====================
const experiences = [
  {
    when: '2025 — PRESENT',
    title: 'Freelance Web Developer',
    company: 'Self-employed · Remote',
    description: 'Designing and building responsive websites for clients. Delivered landing pages and business sites with a focus on speed, SEO basics and clean animation.',
    order: 1
  },
  {
    when: '2025',
    title: 'Frontend Projects & Open Source',
    company: 'Personal & community work',
    description: 'Built 5+ projects with React, Vite and modern CSS, and published them on GitHub to sharpen real-world skills.',
    order: 2
  },
  {
    when: '2024 — 2025',
    title: 'Intensive Web Development Learning',
    company: 'Courses & self-study',
    description: 'Deep-dived into JavaScript, responsive layout, UI design and version control through daily practice and project-based learning.',
    order: 3
  },
  {
    when: '2024',
    title: 'Started My Coding Journey',
    company: 'HTML · CSS · JavaScript',
    description: 'Wrote my first lines of code and fell in love with turning ideas into things people can click, scroll and enjoy.',
    order: 4
  }
];

// ==================== SKILLS ====================
const skills = [
  { name: 'HTML5', level: 95, category: 'frontend', order: 1 },
  { name: 'CSS3 & Animations', level: 92, category: 'frontend', order: 2 },
  { name: 'JavaScript', level: 88, category: 'frontend', order: 3 },
  { name: 'React', level: 82, category: 'frontend', order: 4 },
  { name: 'Responsive Design', level: 94, category: 'tools', order: 5 },
  { name: 'Git & GitHub', level: 85, category: 'tools', order: 6 },
  { name: 'Vite & Tooling', level: 80, category: 'tools', order: 7 },
  { name: 'Figma & UI Design', level: 76, category: 'tools', order: 8 }
];

// ==================== SETTINGS ====================
const settings = {
  heroName: 'Rehan',
  heroTitle: 'Web Developer',
  heroSubtitle: 'I build modern, responsive and interactive web experiences that bring ideas to life. Turning your vision into powerful digital solutions.',
  helloText: "Hello, I'm",
  stats: [
    { value: 5, label: 'Projects Completed' },
    { value: 2, label: 'Happy Clients' },
    { value: 1, label: 'Years of Learning' }
  ],
  aboutTitle: 'Turning ideas into living, breathing websites',
  aboutParagraph1: "I'm Rehan, a web developer who loves building fast, beautiful and interactive websites. I started with simple HTML pages and kept pushing — today I create responsive, animated interfaces with modern tools like React and Vite.",
  aboutParagraph2: 'I care about clean code, pixel-level details and experiences that feel alive. Whether it\'s a business website, a dashboard or a creative portfolio, I focus on performance and a design people actually remember.',
  facts: [
    { label: 'Name', value: 'Rehan' },
    { label: 'Role', value: 'Web Developer' },
    { label: 'Email', value: 'rashidalih291@gmail.com' },
    { label: 'Availability', value: 'Open for freelance' }
  ],
  email: 'rashidalih291@gmail.com',
  phone: '+92 300 0000000',
  location: 'Remote · Worldwide',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    instagram: 'https://instagram.com/yourusername',
    twitter: '',
    whatsapp: '',
    facebook: '',
    youtube: ''
  },
  resumeUrl: '',
  resumeFileName: '',
  siteTitle: 'Rehan | Web Developer',
  siteDescription: 'Modern, responsive and interactive web experiences.'
};

// ==================== SEED FUNCTION ====================
async function seed() {
  try {
    await connectDB();

    console.log('🗑️  Old data delete kar rahe hain...');
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Skill.deleteMany({});
    await Settings.deleteMany({});

    console.log('📦 Projects insert kar rahe hain...');
    await Project.insertMany(projects);
    console.log(`   ✅ ${projects.length} projects added`);

    console.log('📦 Experience insert kar rahe hain...');
    await Experience.insertMany(experiences);
    console.log(`   ✅ ${experiences.length} experience added`);

    console.log('📦 Skills insert kar rahe hain...');
    await Skill.insertMany(skills);
    console.log(`   ✅ ${skills.length} skills added`);

    console.log('📦 Settings insert kar rahe hain...');
    await Settings.create(settings);
    console.log('   ✅ Settings added');

    console.log('');
    console.log('✅ Seed complete!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   - ${projects.length} projects`);
    console.log(`   - ${experiences.length} experience entries`);
    console.log(`   - ${skills.length} skills`);
    console.log('   - Settings (hero, about, social, contact)');
    console.log('');
    console.log('⚠️  Admin account abhi bana nahi hai.');
    console.log('   Admin banane ke liye chalao:');
    console.log('   curl -X POST http://localhost:5000/api/auth/setup');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();