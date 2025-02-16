import { useState } from "react";

const PREFIX_URL = 'http://localhost:8001';

export type URLShortenerState = {
  inputUrl: string;

  serverResponse: {
    originalUrl: string;
    urlId: string;
    shortUrl: string;
  }
}

export type URLShortener = URLShortenerState & {
  setInputUrl: (newUrl: string) => void;
  postShortenURL: () => Promise<void>;
}

export function useURLShortener(): URLShortener {
  const [urlShortenerState, setURLShortenerState] = useState<URLShortenerState>({
    inputUrl: 'http://google.com/',

    serverResponse: {
      originalUrl: '',
      urlId: '',
      shortUrl: ''
    }
  });

  return {
    inputUrl: urlShortenerState.inputUrl,
    serverResponse: urlShortenerState.serverResponse,

    setInputUrl: (newUrl: string) => {  
      setURLShortenerState({
        ...urlShortenerState,
        inputUrl: newUrl
      });
    },

    postShortenURL: async () => {
      console.log('Shortening URL:', urlShortenerState.inputUrl);
      const response = await fetch('/api/addUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: urlShortenerState.inputUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to shorten the URL');
      }

      const data = await response.json();
      const shortUrl = PREFIX_URL + '/' + data.urlId;
      
      setURLShortenerState({
        ...urlShortenerState,
        serverResponse: {
          originalUrl: urlShortenerState.inputUrl,
          urlId: data.urlId,
          shortUrl: shortUrl
        }
      });
    },
  };
}