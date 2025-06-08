import { Chip } from "@mui/material";

export default function TagDeletable({ tag, color, onDelete }) {
  return (
    <Chip
      label={tag}
      sx={{ backgroundColor: color }}
      onDelete={onDelete}
      color={color}
    />
  );
}
