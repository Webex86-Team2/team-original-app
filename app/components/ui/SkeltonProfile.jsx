import {
  Box,
  Button,
  Container,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";

export default function SkeltonProfile() {
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
        <Skeleton variant="circular" width={100} height={100} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Skeleton variant="text" width={100} height={24} />
          <Skeleton variant="text" width={100} height={24} />
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
              <Skeleton variant="text" width={100} height={24} />
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
              <Skeleton variant="text" width={100} height={24} />
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
              <Skeleton variant="text" width={100} height={24} />
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
              <Skeleton variant="text" width={100} height={24} />
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
            <Skeleton variant="text" width={50} height={24} />
            <Skeleton variant="text" width={50} height={24} />
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
            <Skeleton variant="text" width={50} height={24} />
            <Skeleton variant="text" width={50} height={24} />
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
            <Skeleton variant="text" width={100} height={24} />
          </Typography>
        </Box>
      </Container>
    </Container>
  );
}
