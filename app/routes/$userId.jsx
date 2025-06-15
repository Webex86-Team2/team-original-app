import { useParams } from "@remix-run/react";
import { Box, Typography, Stack, Avatar, Card } from "@mui/material";
import Tag from "../components/tag/Tag";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await getDoc(doc(db, "mockUsers", userId));
      setUser(userData.data());
    };
    getUser();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", p: 4, mt: 12 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
        <Avatar src={user.avatarUrl} sx={{ width: 100, height: 100 }} />
        <Box>
          <Typography variant="h4">{user.name} さん</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <LocationOnOutlinedIcon fontSize="small" />
            {user.hometown}
          </Typography>
        </Box>
      </Box>
      <div style={{ display: "flex", marginBottom: 12 }}>
        <div style={{ width: "50%" }}>
          <Typography variant="caption" sx={{ color: "secondary" }}>
            MBTI
          </Typography>
          <Typography variant="body1">{user.mbti}</Typography>
        </div>
        <div>
          <Typography variant="caption" sx={{ color: "secondary" }}>
            大学
          </Typography>
          <Typography variant="body1">{user.university}</Typography>
        </div>
      </div>
      <Typography variant="caption" sx={{ color: "secondary" }}>
        趣味
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {user.hobbies?.map((hobby, i) => (
          <Tag key={i} tag={hobby} />
        ))}
      </Stack>
      <Typography variant="caption" sx={{ color: "secondary" }}>
        コース
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {user.courses?.map((course, i) => (
          <Tag key={i} tag={course} />
        ))}
      </Stack>
      <Typography variant="caption" sx={{ color: "secondary" }}>
        コメント
      </Typography>
      <Typography variant="body1">{user.comment}</Typography>
    </Card>
  );
}
