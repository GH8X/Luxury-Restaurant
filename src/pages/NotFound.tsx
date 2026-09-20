import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center">
      <div className="container text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-6 font-serif text-display-lg font-light text-cream">
          This table isn't set
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-cream-muted">
          The page you were looking for has been cleared away. Let us show you back to the dining room.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/">Return Home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/reservations">Reserve a Table</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
