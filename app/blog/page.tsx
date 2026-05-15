import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Safety Blog | OSHA & Construction Safety Resources",
  description:
    "Practical safety insights for construction and industrial teams — OSHA compliance, fall prevention, heat illness, safety culture, and more from Greenberg Safety.",
  alternates: { canonical: "https://www.greenbergsafety.com/blog" },
  openGraph: {
    title: "Safety Blog | Greenberg Safety",
    description: "Practical safety insights for construction and industrial teams.",
    url: "https://www.greenbergsafety.com/blog",
  },
};

export default function BlogIndex() {
  return (
    <>
      <Nav />
      <main>
        <style>{`
          .blog-hero {
            padding: 96px 0 72px;
            border-bottom: 1px solid var(--hairline);
          }
          .blog-eyebrow { margin-bottom: 16px; }
          .blog-hero h1 {
            font-family: var(--font-display);
            font-size: clamp(36px, 5vw, 56px);
            font-weight: 700;
            color: var(--ink);
            letter-spacing: -1.5px;
            line-height: 1.1;
            margin: 0 0 16px;
          }
          .blog-hero .lede {
            font-size: 18px;
            color: var(--muted);
            max-width: 48ch;
            line-height: 1.6;
          }
          .blog-grid {
            padding: 72px 0 120px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          .post-card {
            border: 1px solid var(--hairline);
            background: #fff;
            padding: 32px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
          }
          .post-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 32px rgba(10,16,36,0.07);
            border-color: transparent;
          }
          .post-date {
            font-family: var(--font-mono);
            font-size: 11px;
            color: var(--muted);
            letter-spacing: 0.06em;
          }
          .post-title {
            font-family: var(--font-display);
            font-size: 20px;
            font-weight: 700;
            color: var(--ink);
            line-height: 1.3;
            letter-spacing: -0.3px;
          }
          .post-excerpt {
            font-size: 14px;
            line-height: 1.6;
            color: var(--text);
            flex: 1;
          }
          .post-read {
            font-size: 13px;
            font-weight: 600;
            color: var(--brand-blue);
            display: flex;
            align-items: center;
            gap: 6px;
            margin-top: 4px;
          }
          .post-read svg { transition: transform .2s ease; }
          .post-card:hover .post-read svg { transform: translateX(4px); }
          @media (max-width: 900px) { .blog-grid { grid-template-columns: repeat(2,1fr); } }
          @media (max-width: 600px) { .blog-grid { grid-template-columns: 1fr; } }
        `}</style>

        <section className="blog-hero">
          <div className="container">
            <div className="eyebrow blog-eyebrow">Resources</div>
            <h1>Safety insights for<br />construction teams.</h1>
            <p className="lede">
              Practical guidance on OSHA compliance, fall prevention, heat illness, safety culture, and more — from the field.
            </p>
          </div>
        </section>

        <div className="container">
          <div className="blog-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <article className="post-card">
                  <div className="post-date">{post.date}</div>
                  <div className="post-title">{post.title}</div>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-read">
                    Read article
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
