import { useParams } from "@remix-run/react";
import { Box, Typography, Stack, Avatar } from "@mui/material";
import { color } from "../utils/color";
import Tag from "../components/tag/Tag";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import asai from "../image/asai.png";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await getDoc(doc(db, "users", userId));
      setUser(userData.data());
    };
    getUser();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", p: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
        <Avatar src={asai} sx={{ width: 100, height: 100 }} />
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
      <Typography variant="body1">MBTI：{user.mbti}</Typography>
      <Typography variant="body1">大学：{user.university}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        趣味：
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {user.hobbies?.map((hobby, i) => (
          <Tag key={i} tag={hobby} color={color.blue} />
        ))}
      </Stack>
      <Typography variant="body1">コース：</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {user.courses?.map((course, i) => (
          <Tag key={i} tag={course} color={color.green} />
        ))}
      </Stack>
      <Typography variant="body1">役割：</Typography>
      <Stack direction="row" spacing={1}>
        {user.roles?.map((role, i) => (
          <Tag key={i} tag={role} color={color.red} />
        ))}
      </Stack>
    </Box>
  );
}
