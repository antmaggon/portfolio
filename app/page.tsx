import { es } from "@/content/es";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold">{es.hero.name}</h1>
        <p>{es.hero.tagline}</p>
      </div>
    </main>
  );
}
