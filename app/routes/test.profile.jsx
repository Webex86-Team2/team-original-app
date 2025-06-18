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

export default function TestProfile() {
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
          src="https://via.placeholder.com/150"
          sx={{ width: "100px", height: "100px" }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography variant="h5">渡邊怜奈</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            email@example.com
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
              東京都
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
              ESFJ（領事官）
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
              早稲田大学
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
              5 / 3
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
            <Chip
              label="Web"
              variant="outlined"
              color="primary"
              sx={{
                color: "#E95B5A",
                borderColor: "#E95B5A",
                paddingLeft: 1,
                paddingRight: 1,
                fontSize: "16px",
              }}
            />
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
            <Chip
              label="旅行"
              variant="outlined"
              color="primary"
              sx={{
                color: "text.primary",
                borderColor: "text.primary",
                paddingLeft: 1,
                paddingRight: 1,
                fontSize: "16px",
              }}
            />
            <Chip
              label="ネトフリ"
              variant="outlined"
              color="primary"
              sx={{
                color: "text.primary",
                borderColor: "text.primary",
                paddingLeft: 1,
                paddingRight: 1,
                fontSize: "16px",
              }}
            />
            <Chip
              label="自然界隈"
              variant="outlined"
              color="primary"
              sx={{
                color: "text.primary",
                borderColor: "text.primary",
                paddingLeft: 1,
                paddingRight: 1,
                fontSize: "16px",
              }}
            />
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
            よろしくお願いします！
          </Typography>
        </Box>
      </Container>
    </Container>
  );
}
