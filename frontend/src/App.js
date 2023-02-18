import { useState } from "react";
import axios from "axios";

function App() {
  const [originalURL, setOriginalURL] = useState("");
  const [shortUrlData, setShortUrlData] = useState({});
  const [error, setError] = useState(null);

  const postLink = async () => {
    axios
      .post("http://localhost:5000/api/url", { originalURL })
      .catch((err) => setError(err.response.data))
      .then((response) => {
        // console.log(response)
        setShortUrlData(response.data)
      });
  };

  // console.log(shortUrlData)
  const handleSubmt = (e) => {
    e.preventDefault();
    setError(null);
  };

  return (
    <>
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
              {`https://${shortUrlData.shortID}.shot-ly.onrender.com`}
            </a>
          </span>
          <img src={shortUrlData.qr} alt="QR" />
        </div>
      )}
      {error && <span>{error}</span>}
    </>
  );
}

export default App;
