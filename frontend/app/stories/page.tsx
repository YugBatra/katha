import StoryCard from "../../components/StoryCard";
import { stories } from "../../lib/mock-stories";

export const metadata = {
  title: "Library — Katha",
  description: "A constellation of stories from the Indian tradition",
};

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-katha-bg px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 flex flex-col items-start">
          <span className="font-heading text-lg tracking-wide text-katha-gold">
            कथा
          </span>
          <h1 className="font-heading mt-3 text-5xl font-light tracking-tight text-katha-cream">
            Library
          </h1>
          <p className="font-body mt-4 text-lg italic text-katha-muted">
            A constellation of stories from the Indian tradition
          </p>
          <div className="mt-6 w-16 border-t border-katha-gold" />
        </header>

        <section
          aria-label="Stories"
          className="flex flex-wrap justify-center gap-6"
        >
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </section>
      </div>
    </main>
  );
}
