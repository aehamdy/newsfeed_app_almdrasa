import { Container } from "@mui/material";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);

  async function loadData() {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=eg&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`
    );

    const data = await response.json();
    return data.articles.map((article) => {
      const { title, description, author, publishedAt, urlToImage } = article;
      return {
        title,
        description,
        author,
        publishedAt,
        image: urlToImage,
      };
    });
  }

  useEffect(() => {
    loadData().then(setArticles);
  }, []);

  return (
    <Container>
      <NewsHeader />
      <NewsFeed articles={articles} />
    </Container>
  );
}

export default App;
