import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { posts, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://www.greenbergsafety.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.greenbergsafety.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i}>{line.slice(4)}</h3>);
    } else if (line.startsWith("**") && line.endsWith("**") && !line.slice(2,-2).includes("**")) {
      // Bold-only line (used as sub-heading in some posts)
      elements.push(<p key={i}><strong>{line.slice(2,-2)}</strong></p>);
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`}>
          {items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />)}
        </ul>
      );
      continue;
    } else if (line.trim() === "") {
      // skip blank lines
    } else {
      elements.push(<p key={i} dangerouslySetInnerHTML={{ __html: inlineMarkdown(line) }} />);
    }
    i++;
  }
  return elements;
}

function inlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main>
        <style>{`
          .post-header {
            padding: 80px 0 56px;
            border-bottom: 1px solid var(--hairline);
            max-width: 760px;
          }
          .post-header .eyebrow { margin-bottom: 20px; }
          .post-header h1 {
            font-family: var(--font-display);
            font-size: clamp(28px, 4vw, 46px);
            font-weight: 700;
            color: var(--ink);
            letter-spacing: -1.2px;
            line-height: 1.15;
            margin: 0 0 20px;
          }
          .post-meta {
            font-family: var(--font-mono);
            font-size: 12px;
            color: var(--muted);
            letter-spacing: 0.05em;
          }
          .post-body {
            max-width: 720px;
            padding: 56px 0 120px;
          }
          .post-body p {
            font-size: 17px;
            line-height: 1.75;
            color: var(--text);
            margin: 0 0 20px;
          }
          .post-body h2 {
            font-family: var(--font-display);
            font-size: 24px;
            font-weight: 700;
            color: var(--ink);
            letter-spacing: -0.4px;
            margin: 48px 0 16px;
          }
          .post-body h3 {
            font-family: var(--font-display);
            font-size: 19px;
            font-weight: 700;
            color: var(--ink);
            margin: 32px 0 10px;
          }
          .post-body ul {
            margin: 0 0 24px 0;
            padding-left: 24px;
          }
          .post-body ul li {
            font-size: 17px;
            line-height: 1.7;
            color: var(--text);
            margin-bottom: 8px;
          }
          .post-body strong { color: var(--ink); font-weight: 600; }
          .post-body a { color: var(--brand-blue); text-decoration: underline; }
          .post-back {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            font-weight: 600;
            color: var(--muted);
            padding: 24px 0 0;
            transition: color .15s ease;
          }
          .post-back:hover { color: var(--ink); }
        `}</style>

        {post.image && (
          <div style={{ width: "100%", aspectRatio: "21/9", maxHeight: 480, overflow: "hidden", position: "relative" }}>
            <Image
              src={post.image}
              alt={post.imageAlt ?? post.title}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
              sizes="100vw"
            />
          </div>
        )}
        <div className="container">
          <div className="post-header">
            <div className="eyebrow">Safety Resources</div>
            <h1>{post.title}</h1>
            <div className="post-meta">{post.date} · Greenberg Safety</div>
          </div>
          <div className="post-body">
            {renderContent(post.content)}
          </div>
          <div style={{
            margin: "0 0 48px",
            padding: "32px",
            background: "var(--brand-blue-tint)",
            borderLeft: "4px solid var(--brand-blue)",
          }}>
            <p style={{ margin: "0 0 16px", fontWeight: 600, color: "var(--ink)", fontSize: 17 }}>
              Have questions or need a safety consultant for your project?
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/#schedule" className="btn btn-primary" style={{ fontSize: 14 }}>
                Schedule a consultation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </Link>
              <a href="tel:+15125857070" className="btn btn-secondary" style={{ fontSize: 14 }}>
                (512) 585-7070
              </a>
            </div>
          </div>
          <Link href="/blog" className="post-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to all articles
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
