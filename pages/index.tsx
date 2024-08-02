import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/reddit-data?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <Head>
        <title>Reddit Scraper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Reddit Scraper</h1>
        <div className="search-container">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword"
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        <div className="results">
          {results.map((post: any, index: number) => (
            <div key={index} className="post">
              <h2>{post.title}</h2>
              <p>Subreddit: {post.subreddit}</p>
              <p>Score: {post.score}</p>
              <p>Comments: {post.num_comments}</p>
              <p>Author: {post.author}</p>
            </div>
          ))}
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f0f0f0;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }
        .search-container {
          margin: 2rem 0;
        }
        input {
          padding: 0.5rem;
          font-size: 1rem;
          margin-right: 0.5rem;
        }
        button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          background-color: #0070f3;
          color: white;
          border: none;
          cursor: pointer;
        }
        .results {
          width: 100%;
          max-width: 800px;
        }
        .post {
          background-color: white;
          padding: 1rem;
          margin: 1rem 0;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}