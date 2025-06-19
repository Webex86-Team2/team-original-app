import { Box, Container, TextField, Typography } from "@mui/material";
import AvatarUpload from "../components/ui/AvatarUpload";

export default function TestEdit() {
  return (
    <Container sx={{ pt: 2, pb: 2 }}>
      <Typography variant="h6">プロフィール編集</Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 8 }}>
        <AvatarUpload defaultImage={null} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", mt: 2, gap: 4 }}>
        <TextField label="名前" fullWidth size="small" />
        <TextField label="名前" fullWidth size="small" />
      </Box>
    </Container>
  );
}
