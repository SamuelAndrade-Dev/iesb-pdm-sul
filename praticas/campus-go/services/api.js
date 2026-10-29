const API_BASE_URL = (process.env.EXPO_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com')
  .replace(/\/+$/, '');

export async function getNotices() {
  const response = await fetch(`${API_BASE_URL}/posts?_limit=10`);
  if (!response.ok) {
    throw new Error(`Não foi possível carregar os avisos (HTTP ${response.status}).`);
  }

  const notices = await response.json();
  if (!Array.isArray(notices)) {
    throw new Error('A resposta de avisos está em um formato inesperado.');
  }

  return notices;
}
