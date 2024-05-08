import { StyledCard } from "./StyledCard";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";

function LoadingArticle() {
  return (
    <StyledCard>
      <CardActionArea>
        <CardContent>
          <Skeleton varian="text" sx={{ fontSize: "5rem" }} />
          <Skeleton varian="text" sx={{ fontSize: "1.5rem" }} />
        </CardContent>
      </CardActionArea>
      <Box p={2}>
        <Skeleton varian="text" width={200} sx={{ fontSize: "1.5rem" }} />
        <Skeleton varian="text" width={200} sx={{ fontSize: "1.5rem" }} />
      </Box>
    </StyledCard>
  );
}

export default LoadingArticle;
