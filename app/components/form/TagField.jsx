import { useState } from "react";
import { Stack, Box } from "@mui/material";
import { color } from "../../utils/color";
import TagDeletable from "../tag/TagDeletable";

export default function TagField() {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Box>
      <label htmlFor="tag-input" style={{ fontSize: "16px" }}>
        趣味
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="趣味を入力"
        style={{
          width: "100%",
          padding: "12px",
          margin: "4px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
        {tags.map((tag) => (
          <TagDeletable
            key={tag}
            tag={tag}
            onDelete={() => handleDelete(tag)}
            color={color.lightRed}
          />
        ))}
      </Stack>
    </Box>
  );
}
