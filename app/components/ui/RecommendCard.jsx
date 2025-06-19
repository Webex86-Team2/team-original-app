import { Avatar, Box, Chip, Paper, Typography } from "@mui/material";
import CourseChip from "./CourseChip";

// 星を描画する関数
function renderStars(rate) {
  if (typeof rate !== "number") return "☆☆☆☆☆";
  const stars = Math.round((rate / 100) * 5); // 0〜5の整数に変換
  return "★".repeat(stars) + "☆".repeat(5 - stars); // ★★★☆☆
}

export default function RecommendCard({ user }) {
  return (
    <Paper sx={{ display: "flex", gap: 2, p: 2 }} elevation={3}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "20%",
        }}
      >
        <Avatar
          src={user.avatarUrl || "/default.png"}
          alt={user.name}
          sx={{ width: 200, height: 200 }}
        />
        <Box sx={{ display: "flex", gap: 1, alignItems: "end" }}>
          <Typography variant="body1">マッチ度:</Typography>
          <Typography variant="h5">{user.matchRate}%</Typography>
        </Box>
        <Typography variant="h5" sx={{ color: "#fbc02d" }}>
          {renderStars(user.matchRate)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          gap: 1,
          width: "80%",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {user.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            width: "100%",
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
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Hometown
            </Typography>
            <Typography variant="h6">{user.hometown}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "40%",
            }}
          >
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              MBTI
            </Typography>
            <Typography variant="h6">{user.mbti}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              width: "40%",
            }}
          >
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              University
            </Typography>
            <Typography variant="h6">{user.university}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              width: "40%",
            }}
          >
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Birthday
            </Typography>
            <Typography variant="h6">
              {user.birthMonth}/{user.birthDay}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Courses
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {user.courses.map((course) => (
            <CourseChip key={course} course={course} />
          ))}
        </Box>

        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Hobbies
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {user.hobbies.map((hobby, index) => (
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
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Comment
        </Typography>
        <Typography variant="h6">{user.comment}</Typography>
      </Box>
    </Paper>
  );
}
