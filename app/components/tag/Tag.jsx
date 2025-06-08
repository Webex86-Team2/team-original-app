import { Chip } from "@mui/material";

export default function Tag({ tag, color }) {
  return <Chip label={tag} sx={{ backgroundColor: color }} color={color} />;
}
