import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Tag from "./tag/Tag";
import { Link } from "@remix-run/react";

export default function UserCard({ user }) {
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
        <Avatar src={user.avatarUrl} sx={{ width: 80, height: 80 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 0.5,
          }}
        >
          <Link
            to={`/${user.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Typography variant="h6">{user.name}</Typography>
          </Link>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <LocationOnOutlinedIcon />
            {user.hometown}
          </Typography>
        </Box>
      </Box>
      <Stack direction="row" spacing={1} mb={2}>
        {user.hobbies.slice(0, 3).map((hobby, index) => (
          <Tag tag={hobby} key={index} />
        ))}

        {user.hobbies.length > 3 && (
          <Tag tag={`+${user.hobbies.length - 3}件`} key="more" />
        )}
      </Stack>
      <Typography variant="caption">{user.comment}</Typography>
    </Container>
  );
}
