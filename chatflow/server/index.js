const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// ─── Channel Data ──────────────────────────────────────────
const channels = [
  { id: 'general',  name: 'General',       description: 'General discussion for everyone',   memberCount: 128 },
  { id: 'tech',     name: 'Tech Talk',     description: 'Programming, frameworks & tools',   memberCount: 64  },
  { id: 'design',   name: 'Design Lab',    description: 'UI/UX, colors & inspiration',       memberCount: 42  },
  { id: 'random',   name: 'Random',        description: 'Off-topic fun and casual chat',     memberCount: 95  },
  { id: 'music',    name: 'Music Lounge',  description: 'Share your favorite tracks',        memberCount: 37  },
  { id: 'gaming',   name: 'Gaming',        description: 'Games, reviews & discussions',      memberCount: 53  },
];

// ─── Message Data ──────────────────────────────────────────
const messages = {
  general: [
    { id: 1, sender: 'System',  text: 'Welcome to the General channel!',                    time: '09:00' },
    { id: 2, sender: 'Alice',   text: 'Hey everyone! 👋',                                   time: '09:05' },
    { id: 3, sender: 'Bob',     text: 'Morning Alice! How is your project going?',          time: '09:06' },
    { id: 4, sender: 'Alice',   text: 'Pretty good! Just finished the login page.',         time: '09:08' },
    { id: 5, sender: 'Charlie', text: 'Nice! Let me know if you need help with the API.',   time: '09:10' },
    { id: 6, sender: 'Bob',     text: 'We should have a team meeting this afternoon.',      time: '09:15' },
  ],
  tech: [
    { id: 1, sender: 'Dave',    text: 'Has anyone tried React 19 yet?',                     time: '10:00' },
    { id: 2, sender: 'Eve',     text: 'Yes! Server Components are finally stable.',         time: '10:05' },
    { id: 3, sender: 'Dave',    text: 'The performance improvements are impressive.',       time: '10:08' },
    { id: 4, sender: 'Frank',   text: 'I migrated our project last week. Highly recommend.',time: '10:12' },
    { id: 5, sender: 'Eve',     text: 'Any breaking changes we should watch for?',          time: '10:20' },
  ],
  design: [
    { id: 1, sender: 'Grace',   text: 'Check out this color palette I made 🎨',             time: '11:00' },
    { id: 2, sender: 'Henry',   text: 'Looks amazing! What tool did you use?',              time: '11:02' },
    { id: 3, sender: 'Grace',   text: 'Figma with the Coolors plugin. Super handy!',        time: '11:05' },
    { id: 4, sender: 'Henry',   text: 'I will try it out. Thanks for the tip!',             time: '11:08' },
  ],
  random: [
    { id: 1, sender: 'Ivy',     text: 'Beautiful weather today ☀️',                         time: '08:00' },
    { id: 2, sender: 'Jack',    text: 'Yeah, perfect for a hike!',                          time: '08:05' },
    { id: 3, sender: 'Ivy',     text: 'Anyone want to go this weekend?',                    time: '08:10' },
    { id: 4, sender: 'Jack',    text: 'Count me in!',                                       time: '08:12' },
    { id: 5, sender: 'Kate',    text: 'Which trail are you thinking?',                      time: '08:15' },
  ],
  music: [
    { id: 1, sender: 'Leo',     text: 'Just discovered an incredible album 🎧',             time: '14:00' },
    { id: 2, sender: 'Mia',     text: 'Oh which one? I need new music!',                    time: '14:02' },
    { id: 3, sender: 'Leo',     text: 'It is a jazz fusion record. Totally unique sound.',  time: '14:05' },
  ],
  gaming: [
    { id: 1, sender: 'Noah',    text: 'Anyone playing the new RPG release?',                time: '15:00' },
    { id: 2, sender: 'Olivia',  text: 'Yes! Already 20 hours in. It is so good.',           time: '15:03' },
    { id: 3, sender: 'Noah',    text: 'No spoilers please! I just started.',                time: '15:05' },
    { id: 4, sender: 'Olivia',  text: 'Haha no worries. You are going to love it.',         time: '15:08' },
  ],
};

// ─── API Routes ────────────────────────────────────────────

// GET /api/channels - return all channels
app.get('/api/channels', (req, res) => {
  console.log('[API] GET /api/channels');
  res.json(channels);
});

// GET /api/channels/:id/messages - return messages for a channel
app.get('/api/channels/:id/messages', (req, res) => {
  const { id } = req.params;
  console.log(`[API] GET /api/channels/${id}/messages`);

  const channelMessages = messages[id];
  if (!channelMessages) {
    return res.status(404).json({ error: 'Channel not found' });
  }
  res.json(channelMessages);
});

// POST /api/channels/:id/messages - add a new message
app.post('/api/channels/:id/messages', (req, res) => {
  const { id } = req.params;
  const { sender, text } = req.body;
  console.log(`[API] POST /api/channels/${id}/messages from ${sender}`);

  if (!messages[id]) {
    return res.status(404).json({ error: 'Channel not found' });
  }

  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  const newMessage = {
    id: Date.now(),
    sender,
    text,
    time,
  };

  messages[id].push(newMessage);
  res.status(201).json(newMessage);
});

// ─── Start Server ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  ✅ ChatFlow API Server running at http://localhost:${PORT}`);
  console.log(`  📡 Endpoints:`);
  console.log(`     GET  /api/channels`);
  console.log(`     GET  /api/channels/:id/messages`);
  console.log(`     POST /api/channels/:id/messages\n`);
});
