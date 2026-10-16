import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, required: true },
    category: { type: String, required: true, enum: ['app', 'land', 'ui'] },
    tags: [{ type: String }],
    shortDesc: { type: String, required: true },
    gradient: { type: String, default: 'linear-gradient(135deg,#0a3a8a,#12b5ff)' },
    accent: { type: String, default: '#22e5ff' },
    year: { type: String, required: true },
    duration: { type: String, required: true },
    role: { type: String, required: true },
    client: { type: String },
    team: { type: String },

    // Images
    coverImage: { type: String, default: '' },      // Case study hero image
    screenshots: [{ type: String }],                // Gallery

    overview: { type: String, required: true },
    problem: { type: String, required: true },

    challenges: [
      {
        title: String,
        desc: String,
      },
    ],

    mistakes: [{ type: String }],

    solution: { type: String, required: true },

    features: [{ type: String }],

    techStack: [
      {
        name: String,
        reason: String,
      },
    ],

    results: [
      {
        label: String,
        before: String,
        after: String,
      },
    ],

    lessons: [{ type: String }],

    liveUrl: { type: String, default: '#' },
    sourceUrl: { type: String, default: '#' },

    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);