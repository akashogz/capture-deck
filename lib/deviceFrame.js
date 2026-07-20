export default function MacbookFrame({ imageBase64 }) {
  return (
    <svg
      viewBox="0 0 2011 1171"
      width="800"
      height="466"
    >
      <image
        href={`data:image/png;base64,${imageBase64}`}
        x="0"
        y="0"
        width="2011"
        height="1171"
      />
    </svg>
  );
}