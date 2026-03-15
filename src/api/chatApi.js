// API base URL - uses the proxy defined in package.json during development
const BASE_URL = '/api';

// Fetch all channels from the API server
export async function fetchChannels() {
  const response = await fetch(`${BASE_URL}/channels`);
  if (!response.ok) {
    throw new Error('Failed to fetch channels');
  }
  return response.json();
}

// Fetch messages for a specific channel from the API server
export async function fetchMessages(channelId) {
  const response = await fetch(`${BASE_URL}/channels/${channelId}/messages`);
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  return response.json();
}

// Send a new message to a channel via the API server
export async function sendMessage(channelId, sender, text) {
  const response = await fetch(`${BASE_URL}/channels/${channelId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sender, text }),
  });
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  return response.json();
}
