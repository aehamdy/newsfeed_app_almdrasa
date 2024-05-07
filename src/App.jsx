import { Container } from "@mui/material";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");

  async function loadData(inputQuery) {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?q=${inputQuery}&country=eg&apiKey=${
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
    loadData(query).then(setArticles);
  }, [query]);

  return (
    <Container>
      <NewsHeader onSearchChange={setQuery} />
      <NewsFeed articles={articles} />
    </Container>
  );
}

export default App;
