async function fetchWithApiKey(
  url: string,
  apiKey: string,
  type: string
): Promise<any> {
  try {
    const response = await fetch(url, {
      method: type, // or 'POST', etc.
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'api_key': apiKey, // custom header for API key
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}

export default fetchWithApiKey