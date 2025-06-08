import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import asai from "../image/asai.png";
import Tag from "./tag/Tag";
import { color } from "../utils/color";
import { Link } from "@remix-run/react";

export default function UserCard() {
  return (
    <Container
      sx={{
        p: 2,
        width: 400,
        height: 220,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        paddingY: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Avatar src={asai} sx={{ width: 80, height: 80 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 0.5,
          }}
        >
          <Link
            to="/sign-in"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Typography variant="h6">あさい</Typography>
          </Link>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <LocationOnOutlinedIcon />
            東京都
          </Typography>
        </Box>
      </Box>
      <Stack direction="row" spacing={1} mb={2}>
        <Tag tag="バスケ" color={color.red} />
        <Tag tag="アニメ" color={color.blue} />
        <Tag tag="漫画" color={color.green} />
      </Stack>
      <Typography variant="caption">
        コメント。よろしくお願いします！
      </Typography>
    </Container>
  );
}
