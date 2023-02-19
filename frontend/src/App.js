import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

function App() {
  const [originalURL, setOriginalURL] = useState("");
  const [shortUrlData, setShortUrlData] = useState({});
  const [error, setError] = useState(null);

  const postLink = async () => {
    axios
      .post("/api/url", { originalURL })
      .catch((err) => setError(err.response.data))
      .then((response) => {
        // console.log(response)
        setShortUrlData(response.data);
      });
  };

  // console.log(shortUrlData)
  const handleSubmt = (e) => {
    e.preventDefault();
    setError(null);
  };

  return (
    <BrowserRouter>
      <h4>URL shortner</h4>
      <form onSubmit={handleSubmt}>
        <input
          type="text"
          placeholder="enter a valid url"
          value={originalURL}
          onChange={(e) => setOriginalURL(e.target.value)}
        />
        <button onClick={postLink}>submit</button>
      </form>
      {shortUrlData.shortID && (
        <div className="container">
          <span>
            Short URL:
            <a href={`https://${shortUrlData.shortID}.shot-ly.onrender.com`}>
              {`${shortUrlData.shortID}.shot-ly.onrender.com`}
            </a>
          </span>
          <img src={shortUrlData.qr} alt="QR" />
        </div>
      )}
      {error && <span>{error}</span>}
      <Route
        path="/:urlCode"
        render={({ match }) => {
          const urlCode = match.params.urlCode;
          const longUrl = `https://${urlCode}.shot-ly.onrender.com`;

          // Redirect to the long URL
          return <Redirect to={longUrl} />;
        }}
      />
    </BrowserRouter>
  );
}

export default App;
