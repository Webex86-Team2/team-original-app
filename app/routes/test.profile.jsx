// mui
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import CourseChip from "../components/ui/CourseChip";
import SkeltonProfile from "../components/ui/SkeltonProfile";

export default function TestProfile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(db, "mockUsers", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }

      // 3秒後にローディングを終了
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    fetchUser();
  }, [user]);

  if (isLoading) {
    return <SkeltonProfile />;
  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          marginBottom: "32px",
        }}
      >
        <Typography variant="h6">プロフィール</Typography>
        <Button variant="contained" color="primary">
          編集
        </Button>
      </Box>

      <Container
        sx={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <Avatar
          src={userData.avatarUrl}
          sx={{ width: "100px", height: "100px" }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography variant="h6">{userData.name}</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {userData.email}
          </Typography>
        </Box>
      </Container>

      <Divider />

      <Container
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            justifyContent: "space-evenly",
            marginBottom: "32px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "40%",
            }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              HOMETOWN
            </Typography>
            <Typography variant="h6" sx={{ color: "text.primary" }}>
              {userData.hometown}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "40%",
            }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              MBTI
            </Typography>
            <Typography variant="h6" sx={{ color: "text.primary" }}>
              {userData.mbti}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            justifyContent: "space-evenly",
            marginBottom: "32px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "40%",
            }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              UNIVERSITY
            </Typography>
            <Typography variant="h6" sx={{ color: "text.primary" }}>
              {userData.university}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "40%",
            }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              BIRTHDAY
            </Typography>
            <Typography variant="h6" sx={{ color: "text.primary" }}>
              {userData.birthMonth} / {userData.birthDay}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "100%",
            paddingLeft: 8,
            marginBottom: "32px",
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            COURSES
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {userData.courses.map((course, index) => (
              <CourseChip key={index} course={course} />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "100%",
            paddingLeft: 8,
            marginBottom: "32px",
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            HOBBIES
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {userData.hobbies.map((hobby, index) => (
              <Chip
                key={index}
                label={hobby}
                variant="outlined"
                color="primary"
                sx={{
                  color: "text.primary",
                  borderColor: "text.primary",
                }}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "100%",
            paddingLeft: 8,
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            COMMENT
          </Typography>
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            {userData.comment}
          </Typography>
        </Box>
      </Container>
    </Container>
  );
}
