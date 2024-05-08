import { Container, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageNumber = useRef(1);
  const queryValue = useRef("");

  async function loadData() {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?q=${queryValue.current}&page=${
        pageNumber.current
      }&pageSize=5&country=eg&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
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

  const fetchAndUpdateArticles = () => {
    setLoading(true);
    loadData().then((newData) => {
      setArticles(newData);
      setLoading(false);
    });
  };

  const debouncedLoadData = debounce(fetchAndUpdateArticles, 500);

  useEffect(() => {
    fetchAndUpdateArticles();
  }, []);

  const handleSearchChange = (newQuery) => {
    pageNumber.current = 1;
    queryValue.current = newQuery;
    debouncedLoadData();
  };

  const handleNextClick = () => {
    pageNumber.current += 1;
    fetchAndUpdateArticles();
  };

  const handlePreviousClick = () => {
    pageNumber.current -= 1;
    fetchAndUpdateArticles();
  };

  return (
    <Container>
      <NewsHeader onSearchChange={handleSearchChange} />
      <NewsFeed articles={articles} loading={loading} />
      <Footer>
        <Button varian="outlined" onClick={handlePreviousClick}>
          Previous
        </Button>
        <Button varian="outlined" onClick={handleNextClick}>
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;
