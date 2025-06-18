import { Chip } from "@mui/material";

export const courses = [
  { id: 0, name: "Web", color: "#E95B5A" },
  { id: 1, name: "Game", color: "#6491CB" },
  { id: 2, name: "iPhone", color: "#F08D1B" },
  { id: 3, name: "Python", color: "#8BC227" },
  { id: 4, name: "Portfolio", color: "#1CD2AB" },
  { id: 5, name: "WebExpert", color: "#B23B61" },
  { id: 6, name: "AI", color: "#BCA81F" },
  { id: 7, name: "UIUX", color: "#1CD2AB" },
];

export default function CourseChip({ course }) {
  const courseData = courses.find((c) => c.name === course);

  return (
    <Chip
      label={course}
      variant="outlined"
      color="primary"
      sx={{
        color: courseData.color,
        borderColor: courseData.color,
      }}
    />
  );
}
