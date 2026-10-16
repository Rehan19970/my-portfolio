import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    // Hero Section
    heroName: { type: String, default: 'Rehan' },
    heroTitle: { type: String, default: 'Web Developer' },
    heroSubtitle: {
      type: String,
      default: 'I build modern, responsive and interactive web experiences that bring ideas to life.',
    },
    helloText: { type: String, default: "Hello, I'm" },

    // Stats
    stats: [
      {
        value: { type: Number, default: 0 },
        label: { type: String, default: '' },
      },
    ],

    // About
    aboutTitle: { type: String, default: 'Turning ideas into living, breathing websites' },
    aboutParagraph1: { type: String, default: '' },
    aboutParagraph2: { type: String, default: '' },

    // Facts
    facts: [
      {
        label: { type: String, default: '' },
        value: { type: String, default: '' },
      },
    ],

    // Contact Info
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },

    // Social Links
    social: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
      whatsapp: { type: String, default: '' },
      facebook: { type: String, default: '' },
      youtube: { type: String, default: '' },
    },

    // Resume
    resumeUrl: { type: String, default: '' },
    resumeFileName: { type: String, default: '' },

    // SEO
    siteTitle: { type: String, default: 'Rehan | Web Developer' },
    siteDescription: { type: String, default: 'Modern, responsive and interactive web experiences.' },
  },
  { timestamps: true }
);

export default mongoose.model('Settings', settingsSchema);