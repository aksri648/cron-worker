const URLS = [
  'https://event-managment-platform-api.onrender.com',
  'https://corporate-agentic-ai-ticket-system.onrender.com',
  'https://tts-api-hn4k.onrender.com',
  'https://pdf-drm-backend.onrender.com'
];

export default {
  async fetch(request, env, ctx) {
    return new Response('Cron worker is running. Scheduled task pings every 10 minutes.', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },

  async scheduled(event, env, ctx) {
    const results = await Promise.allSettled(
      URLS.map(url => fetch(url).then(r => r.status))
    );
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') console.log(URLS[i], r.value);
      else console.error(URLS[i], r.reason?.message);
    });
  },
};
