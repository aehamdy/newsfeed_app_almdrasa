import { Container } from "@mui/material";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const debouncedLoadData = debounce((newQuery) => {
    setLoading(true);
    loadData(newQuery).then((newData) => {
      setArticles(newData);
      setLoading(false);
    });
  }, 500);

  useEffect(() => {
    setLoading(true);
    loadData("").then((newData) => {
      setArticles(newData);
      setLoading(false);
    });
  }, []);

  const handleSearchChange = (newQuery) => {
    debouncedLoadData(newQuery);
  };

  return (
    <Container>
      <NewsHeader onSearchChange={handleSearchChange} />
      <NewsFeed articles={articles} loading={loading} />
    </Container>
  );
}

export default App;
