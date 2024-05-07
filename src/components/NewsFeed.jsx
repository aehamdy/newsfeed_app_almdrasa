import NewsArticle from "./NewsArticle";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function NewsFeed(props) {
  const { articles, loading } = props;

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        align-items="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!articles.length) {
    return (
      <Typography
        align="center"
        varian="h6"
        color="textSecondary"
        marginTop={4}
      >
        No articles found.
      </Typography>
    );
  }

  return (
    <div>
      {articles.map((article) => (
        <NewsArticle key={JSON.stringify(article)} {...article} />
      ))}
    </div>
  );
}

export default NewsFeed;
