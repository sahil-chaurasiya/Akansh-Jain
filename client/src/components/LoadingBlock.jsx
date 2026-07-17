export default function LoadingBlock({ label = 'Loading...' }) {
  return (
    <div className="container py-5 text-center">
      <p>{label}</p>
    </div>
  );
}
