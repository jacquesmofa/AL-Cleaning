import { Link } from "react-router-dom";
import copy from '../content/pages/notfound.json';
// Text, images and links: src/content/pages/notfound.json (editable in the website editors).

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <p className="text-7xl font-heading font-bold text-primary-600">{copy.main.text}</p>
      <h1 className="text-2xl md:text-3xl font-semibold mt-6 text-foreground-900">{copy.main.title}</h1>
      <p className="mt-3 text-base text-foreground-600 max-w-md">{copy.main.text2}</p>
      <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors">{copy.main.text3}</Link>
    </div>
  );
}
