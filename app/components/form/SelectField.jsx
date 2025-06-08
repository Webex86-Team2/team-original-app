export default function SelectField({ label, options }) {
  return (
    <div>
      <label htmlFor={label} style={{ fontSize: "16px" }}>
        {label}
      </label>
      <select
        id={label}
        style={{
          width: "100%",
          padding: "12px",
          margin: "4px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
        defaultValue=""
      >
        {/* デフォルトの未選択オプション */}
        <option value="" disabled>
          選択してください
        </option>

        {/* 選択肢 */}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
