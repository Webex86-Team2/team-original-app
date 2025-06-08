import { Avatar, Box, Container, Paper, Typography } from "@mui/material";
import asai from "../image/asai.png";
import FormField from "../components/form/FormField";
import SelectField from "../components/form/SelectField";
import { mbtis } from "../utils/mbtis";
import TagField from "../components/form/TagField";

export default function Profile() {
  return (
    <Container
      sx={{ maxWidth: "1080px", margin: "20px auto", padding: "0 100px" }}
    >
      {/* header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">プロフィール</Typography>
      </Box>

      {/* profile */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "20px",
          margin: "20px 0",
        }}
      >
        <Avatar src={asai} sx={{ width: 100, height: 100 }} />
        <Typography variant="h6">朝井遼太</Typography>
      </Box>

      {/* edit profile */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "20px",
        }}
      >
        <Typography variant="h6">プロフィール編集</Typography>
        <FormField label="名前" type="text" placeholder="名前" />
        <FormField label="出身地" type="text" placeholder="出身地" />
        <SelectField label="MBTI" options={mbtis} />
        <FormField label="大学" type="text" placeholder="大学" />
        <FormField label="年齢" type="number" placeholder="年齢" />
        <FormField label="役職" type="text" placeholder="役職" />
        <TagField />
      </Paper>
    </Container>
  );
}
