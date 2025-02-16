import './App.css'

import { useURLShortener } from './hooks/useURLShortener';

function App() {
  const { postShortenURL, inputUrl, setInputUrl, serverResponse } = useURLShortener();

  function handleInputURLChange(event: React.ChangeEvent<HTMLInputElement>) {
    const originalUrl = event.target.value;
    setInputUrl(originalUrl);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    postShortenURL();
  }

  // Make a POST request to the backend to shorten the URL
  return (
    <>
      <div className="card">
        <h1>URL shortener</h1>
        <div className="cardContent">
          <p>
            Enter the URL to shorten
          </p>

          <form onSubmit={handleFormSubmit}>
            URL<br/>
            <input type="text" value={inputUrl} onChange={handleInputURLChange}/>
            <button type="submit" onClick={() => postShortenURL()}>
              Shorten
            </button>
          </form>

          {serverResponse.shortUrl && (serverResponse.originalUrl == inputUrl) && (
            <div>
              <div className="success">
                Success! Here's you short URL:
              </div>
              <p>
                Short URL: <a href={serverResponse.shortUrl} target="_blank">{serverResponse.shortUrl}</a>
              </p>
              <p>
                Original URL was: <a href={serverResponse.originalUrl} target="_blank">{serverResponse.originalUrl}</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
