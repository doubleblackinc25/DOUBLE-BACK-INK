import Header from "../components/header";
import Footer from "../components/footer";
import { CopyForm } from "./copy-form";

export const metadata = {
  title: "AI Copy Tool | Double Black Supply",
  description: "Generate high-performance marketing copy.",
};

export default function CopyToolPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4 md:px-6">
        <CopyForm />
      </main>
      <Footer />
    </div>
  );
}
