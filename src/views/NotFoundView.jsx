import { Link } from 'react-router-dom';

export default function NotFoundView() {
  return (
    <>
      <h1>Page not found. Go to Home page</h1>
      <Link to="/">Home</Link>
    </>
  );
}
