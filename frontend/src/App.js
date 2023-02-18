import { useState } from "react";
import axios from "axios";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrlData, setShortUrlData] = useState({});
  const [error, setError] = useState(null);

  const postLink = async () => {
    axios
      .post("http://localhost:5000/api/url", { longUrl })
      .catch((err) => setError(err.response.data))
      .then((response) => {
        setShortUrlData(response.data)
        console.log(response)
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
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={postLink}>submit</button>
      </form>
      {shortUrlData.shortUrl && (
        <div className="container">
          <span>
            Short URL:
            <a href={shortUrlData.shortUrl}>
              {shortUrlData.shortUrl}
            </a>
          </span>
          <img src={shortUrlData.qrCode} alt="QR Code" />
        </div>
      )}
      {error && <span>{error}</span>}
    </>
  );
}

export default App;
