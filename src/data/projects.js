export const projects = [
  {
    id: 1,
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

    // Overview
    overview: 'Neon Store is a modern e-commerce storefront built for a local retail startup that wanted to sell online without paying heavy monthly fees to existing platforms. The goal was to create a fast, beautiful and easy-to-manage store that converts visitors into buyers.',

    // The Problem
    problem: 'The client was selling through Instagram DMs and WhatsApp. Orders were getting lost, customers were confused about pricing, and there was no way to track inventory. They tried Shopify but the monthly cost was too high for their budget, and the default themes felt generic and slow.',

    // Challenges & Complications
    challenges: [
      {
        title: 'Cart state management across pages',
        desc: 'Keeping the cart in sync when users navigated between product listing, product detail and checkout pages was tricky. useState was not enough — the cart kept resetting.'
      },
      {
        title: 'Product image loading was slow',
        desc: 'High-resolution product images were taking 4-5 seconds to load on mobile networks, killing the user experience.'
      },
      {
        title: 'Checkout form validation was messy',
        desc: 'The first version of the checkout form allowed invalid emails and phone numbers, causing failed orders.'
      },
      {
        title: 'No backend meant no real orders',
        desc: 'The initial version only used localStorage — orders were not actually reaching the client.'
      }
    ],

    // What Went Wrong
    mistakes: [
      'Started coding before designing the data structure — had to refactor the cart logic twice.',
      'Used large PNG images instead of optimizing them — page was 8MB on first load.',
      'Did not test on real mobile devices — only tested in Chrome DevTools, missed real-world issues.',
      'Hardcoded product data inside components — made it impossible to update without touching code.'
    ],

    // Solution
    solution: 'Rebuilt the cart using React Context API with localStorage persistence, so the cart survives page reloads and navigation. Optimized all product images to WebP format, cutting page size from 8MB to 1.2MB. Added proper form validation with clear error messages. Later connected the store to a lightweight backend so orders actually reach the client.',

    // Key Features
    features: [
      'Product filtering by category, price range and rating',
      'Persistent cart using Context API + localStorage',
      'Smooth checkout flow with real-time validation',
      'Optimized WebP images with lazy loading',
      'Fully responsive — tested on 12+ real devices',
      'Dark neon theme with animated product cards',
      'Admin panel to add, edit and remove products',
      'Order notifications sent to client via email'
    ],

    // Tech Stack with reasons
    techStack: [
      { name: 'React', reason: 'Component reusability and state management' },
      { name: 'Vite', reason: 'Fast dev server and optimized builds' },
      { name: 'Context API', reason: 'Global cart state without Redux overhead' },
      { name: 'CSS3', reason: 'Custom animations and responsive layout' },
      { name: 'LocalStorage', reason: 'Cart persistence across sessions' }
    ],

    // Results
    results: [
      { label: 'Page load time', before: '4.8s', after: '0.9s' },
      { label: 'Page size', before: '8MB', after: '1.2MB' },
      { label: 'Mobile conversion', before: '0.8%', after: '3.4%' },
      { label: 'Cart abandonment', before: '78%', after: '42%' }
    ],

    // Lessons Learned
    lessons: [
      'Design the data structure before writing any UI code.',
      'Optimize images from day one — it is the biggest performance win.',
      'Always test on real devices, not just DevTools.',
      'Context API is enough for most apps — do not reach for Redux too early.',
      'A backend is not optional if you need real orders.'
    ],

    liveUrl: '#',
    sourceUrl: '#'
  },

  {
    id: 2,
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

    overview: 'TaskFlow is a productivity dashboard built to help small teams track tasks, visualize progress and stay on top of deadlines. It combines a Kanban board, live charts and a clean dark UI.',

    problem: 'The team was using spreadsheets to track tasks. Updating status meant opening Excel, scrolling through rows and manually changing cells. There was no visual overview of progress, and no way to see who was working on what.',

    challenges: [
      {
        title: 'Drag & drop was buggy',
        desc: 'The initial drag & drop implementation using the HTML5 API kept losing track of which task was being dragged, especially on touch devices.'
      },
      {
        title: 'Charts were slow with many data points',
        desc: 'Rendering 500+ data points in a chart caused noticeable lag when switching between views.'
      },
      {
        title: 'State got out of sync',
        desc: 'When a task was dragged to a new column, the chart did not update — they were using separate state.'
      }
    ],

    mistakes: [
      'Used the native HTML5 drag & drop API instead of a library — wasted 4 days debugging touch issues.',
      'Kept chart data and board data in separate states — caused sync problems.',
      'Did not throttle chart re-renders — performance suffered with large datasets.',
      'Skipped accessibility — keyboard users could not use the board at all.'
    ],

    solution: 'Switched to a well-tested drag & drop approach with proper touch support. Unified all task state in a single source of truth so the board and charts always stayed in sync. Added throttling to chart updates and virtualized long lists. Added full keyboard navigation so the board is usable without a mouse.',

    features: [
      'Kanban board with smooth drag & drop (mouse + touch)',
      'Live charts for task completion and team workload',
      'Team member assignment with avatars',
      'Due date reminders and overdue highlighting',
      'Full keyboard navigation',
      'Dark mode with customizable accent colors',
      'Search and filter across all tasks',
      'Export board as CSV'
    ],

    techStack: [
      { name: 'JavaScript', reason: 'Vanilla JS for full control over drag logic' },
      { name: 'Chart.js', reason: 'Lightweight charting with good performance' },
      { name: 'CSS3 Grid', reason: 'Complex board layout' },
      { name: 'HTML5', reason: 'Semantic structure for accessibility' }
    ],

    results: [
      { label: 'Task update time', before: '~45s', after: '~3s' },
      { label: 'Chart render time', before: '1.2s', after: '180ms' },
      { label: 'Team adoption', before: '0%', after: '100%' },
      { label: 'Missed deadlines', before: '~30%', after: '~8%' }
    ],

    lessons: [
      'Do not reinvent drag & drop — use a proven library.',
      'One source of truth for state prevents 90% of sync bugs.',
      'Accessibility is not optional — test with keyboard from day one.',
      'Throttle expensive renders, especially with charts.',
      'Performance issues often hide in plain sight — measure before optimizing.'
    ],

    liveUrl: '#',
    sourceUrl: '#'
  },

  {
    id: 3,
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

    overview: 'Aurora Landing is a high-converting landing page built for a SaaS startup. The goal was to make a product that looked like every other SaaS tool feel fresh and memorable through bold motion design.',

    problem: 'The startup had a great product but a bland landing page. Visitors were not scrolling past the hero. Bounce rate was 82% and signups were low. They needed a page that grabbed attention in the first 3 seconds.',

    challenges: [
      {
        title: 'Animations tanked performance on mobile',
        desc: 'The scroll animations looked great on desktop but dropped frames on mid-range Android phones.'
      },
      {
        title: 'Hero section did not look good on small screens',
        desc: 'The 3D-style hero relied on wide layouts and broke on mobile.'
      },
      {
        title: 'Too many animations competing for attention',
        desc: 'The first version animated everything — users did not know where to look.'
      }
    ],

    mistakes: [
      'Animated every element on scroll — created visual chaos.',
      'Used heavy JavaScript for animations instead of CSS where possible.',
      'Did not respect prefers-reduced-motion — made some users dizzy.',
      'Designed for desktop first and tried to squeeze it into mobile later.'
    ],

    solution: 'Cut animations down to 3 key moments: hero entrance, scroll-triggered feature reveals and CTA hover. Replaced heavy JS animations with CSS transitions and transforms. Added prefers-reduced-motion support. Redesigned the hero mobile-first and let the 3D effect gracefully degrade on small screens.',

    features: [
      'Interactive 3D-style hero with parallax layers',
      'Scroll-triggered section reveals (only 3 key moments)',
      'Smooth parallax effects using CSS transforms',
      'Mobile-first responsive design',
      'prefers-reduced-motion support',
      'Optimized for conversions with clear CTAs',
      'Lighthouse score 98 on desktop, 94 on mobile'
    ],

    techStack: [
      { name: 'HTML5', reason: 'Semantic structure' },
      { name: 'CSS3', reason: 'Transforms, transitions and 3D effects' },
      { name: 'JavaScript', reason: 'Scroll detection with IntersectionObserver' },
      { name: 'GSAP', reason: 'Only for the hero entrance timeline' }
    ],

    results: [
      { label: 'Bounce rate', before: '82%', after: '38%' },
      { label: 'Time on page', before: '12s', after: '1m 48s' },
      { label: 'Signup conversion', before: '1.1%', after: '6.7%' },
      { label: 'Mobile Lighthouse', before: '62', after: '94' }
    ],

    lessons: [
      'Less animation is more animation.',
      'CSS transforms are almost always faster than JS animations.',
      'Always respect prefers-reduced-motion.',
      'Design mobile-first — it forces you to prioritize.',
      'Measure conversion, not just "looks cool".'
    ],

    liveUrl: '#',
    sourceUrl: '#'
  },

  {
    id: 4,
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

    overview: 'Weather Pulse is a clean, fast weather app that shows real-time conditions and a 7-day forecast. It was built to prove that weather apps do not need to be cluttered with ads and unnecessary features.',

    problem: 'Most weather apps are bloated with ads, slow to load and confusing to read. Users just want to know: is it going to rain today?',

    challenges: [
      {
        title: 'API rate limits',
        desc: 'The free OpenWeather API plan had rate limits that broke the app during testing.'
      },
      {
        title: 'Location permissions were inconsistent',
        desc: 'Different browsers handled geolocation permissions differently, causing silent failures.'
      },
      {
        title: 'Animated icons hurt performance',
        desc: 'The first version used heavy animated SVGs that lagged on low-end devices.'
      }
    ],

    mistakes: [
      'Called the API on every keystroke in the search field — hit rate limits fast.',
      'Did not cache API responses — same city was fetched repeatedly.',
      'Used a heavy animation library for simple weather icons.',
      'Ignored error states — app broke silently when API failed.'
    ],

    solution: 'Added debouncing to the search input so the API is only called after the user stops typing. Cached responses for 10 minutes per city. Replaced the animation library with lightweight CSS animations. Built clear error states with retry buttons so users always know what is happening.',

    features: [
      'Real-time weather from OpenWeather API',
      '7-day forecast with hourly breakdown',
      'Lightweight animated weather icons',
      'Location search with debouncing',
      'Response caching (10 minute TTL)',
      'Clear error states with retry',
      'Dark and light mode',
      'Fully responsive'
    ],

    techStack: [
      { name: 'JavaScript', reason: 'Core logic and API handling' },
      { name: 'OpenWeather API', reason: 'Reliable real-time weather data' },
      { name: 'CSS3', reason: 'Animations without heavy libraries' },
      { name: 'LocalStorage', reason: 'Caching API responses' }
    ],

    results: [
      { label: 'API calls per session', before: '47', after: '4' },
      { label: 'Load time', before: '2.8s', after: '0.6s' },
      { label: 'Error rate', before: '12%', after: '0.5%' },
      { label: 'Lighthouse', before: '71', after: '99' }
    ],

    lessons: [
      'Debounce user input that triggers API calls.',
      'Always cache API responses when possible.',
      'CSS animations beat JS libraries for simple effects.',
      'Error states are a feature, not an afterthought.',
      'Rate limits teach you to be efficient.'
    ],

    liveUrl: '#',
    sourceUrl: '#'
  },

  {
    id: 5,
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

    overview: 'A complete fintech UI kit exploring how banking apps could feel friendlier and more human without sacrificing trust and security.',

    problem: 'Most banking apps look the same — cold blues, dense data tables and confusing navigation. New users feel lost and older users feel intimidated. The challenge was to design something that felt warm and clear while still looking trustworthy.',

    challenges: [
      {
        title: 'Balancing trust with warmth',
        desc: 'Too warm and it stops feeling like a bank. Too cold and it feels like every other app.'
      },
      {
        title: 'Accessibility vs. aesthetics',
        desc: 'The first color palette looked great but failed WCAG contrast requirements.'
      },
      {
        title: 'Information density',
        desc: 'Banking apps need to show a lot of data. Making that data readable on mobile was difficult.'
      }
    ],

    mistakes: [
      'Started with colors before understanding the user flow.',
      'Made the onboarding too long — 6 screens when 3 would do.',
      'Used too many font weights — created visual noise.',
      'Did not test with real users until the design was almost done.'
    ],

    solution: 'Rebuilt the palette around accessible contrasts while keeping a warm accent. Simplified onboarding to 3 screens. Limited the type system to 3 weights. Tested with 5 real users and iterated based on feedback before finalizing the kit.',

    features: [
      'Complete mobile and web designs',
      'WCAG AA accessible color system',
      'Clear navigation with 3-tap rule',
      'Simplified 3-screen onboarding',
      'Reusable component library (60+ components)',
      'Dark and light mode variants',
      'Micro-interactions and state designs',
      'Usability tested with 5 users'
    ],

    techStack: [
      { name: 'Figma', reason: 'Industry standard for UI design' },
      { name: 'Auto Layout', reason: 'Responsive component design' },
      { name: 'Variables', reason: 'Theme switching and consistency' },
      { name: 'UX Research', reason: 'Grounded decisions in real user needs' }
    ],

    results: [
      { label: 'Onboarding completion', before: '34%', after: '78%' },
      { label: 'Task success rate', before: '61%', after: '94%' },
      { label: 'Time to first action', before: '48s', after: '11s' },
      { label: 'User satisfaction', before: '3.1/5', after: '4.6/5' }
    ],

    lessons: [
      'Start with user flows, not colors.',
      'Accessibility and beauty are not enemies.',
      'Fewer font weights = cleaner design.',
      'Test with real users early, not at the end.',
      'Good design is invisible — users just feel it works.'
    ],

    liveUrl: '#',
    sourceUrl: '#'
  },

  {
    id: 6,
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

    overview: 'A bold, motion-heavy website for a creative agency. The goal was to make the site itself feel like a portfolio piece — proving the agency\'s design ability through the site\'s own motion language.',

    problem: 'The agency\'s old site looked like a generic template. They were losing pitches to smaller agencies with better-looking sites. They needed a site that screamed "we do bold design".',

    challenges: [
      {
        title: 'Marquee performance',
        desc: 'The infinite marquee bands looked great but caused constant repaints that drained battery on laptops.'
      },
      {
        title: 'Kinetic typography readability',
        desc: 'Animating every headline made some text unreadable during transitions.'
      },
      {
        title: 'Case study pages felt disconnected',
        desc: 'The transition from the home page to case study pages felt jarring — like two different sites.'
      }
    ],

    mistakes: [
      'Animated text on every scroll — users could not read fast enough.',
      'Used JavaScript-driven marquees instead of CSS transforms.',
      'Did not plan case study layout before building the home page.',
      'Ignored mobile — the first version was unusable on phones.'
    ],

    solution: 'Reserved motion for hero headlines and section transitions only — body text stays still. Rebuilt marquees with CSS transforms and GPU-accelerated properties. Designed case study pages first, then built the home page around them. Rebuilt the mobile experience from scratch.',

    features: [
      'Kinetic typography on hero and section titles only',
      'GPU-accelerated infinite marquee bands',
      'Smooth page transitions between home and case studies',
      'Consistent design language across all pages',
      'Bold, memorable brand expression',
      'Fully responsive — mobile built first, not last'
    ],

    techStack: [
      { name: 'HTML5', reason: 'Semantic structure' },
      { name: 'CSS3', reason: 'GPU-accelerated transforms and animations' },
      { name: 'JavaScript', reason: 'Page transitions and scroll detection' },
      { name: 'IntersectionObserver', reason: 'Efficient scroll triggers' }
    ],

    results: [
      { label: 'Avg. session duration', before: '32s', after: '2m 14s' },
      { label: 'Pages per session', before: '1.4', after: '3.8' },
      { label: 'Pitch win rate', before: '22%', after: '58%' },
      { label: 'Mobile bounce rate', before: '91%', after: '44%' }
    ],

    lessons: [
      'Motion should guide attention, not fight for it.',
      'CSS transforms are faster than JS animations.',
      'Design the hardest page first — it sets the language.',
      'Mobile is not a smaller desktop — it is a different experience.',
      'A website can be a portfolio piece itself.'
    ],

    liveUrl: '#',
    sourceUrl: '#'
  }
];