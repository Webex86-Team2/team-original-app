export default function FormField({ label, type, placeholder }) {
  return (
    <div>
      <label htmlFor={label} style={{ fontSize: "16px" }}>
        {label}
      </label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "12px",
          margin: "4px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
    </div>
  );
}
