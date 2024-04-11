import { Hero } from "@/views/hero/Hero";

import { session } from "@/core/services/sessionService";

export default async function Home() {
  const sess = await session();

  return <Hero user={sess?.user} />;
}
