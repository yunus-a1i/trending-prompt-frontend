"use client";

import { useState } from "react";
import PostCard, { Post } from "./postCard";

const DEMO_POSTS: Post[] = [
  {
    _id: "1",
    title: "Cyberpunk City at Twilight",
    ai_model: "Midjourney",
    prompt_text: "A neon-drenched cyberpunk metropolis at twilight, rain-slicked streets reflecting holographic advertisements, flying cars weaving between skyscrapers, ultra-detailed, cinematic lighting, 8k resolution",
    prompt_description: "Perfect for sci-fi world-building and concept art references.",
    prompt_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    tags: ["cyberpunk", "cityscape", "neon", "scifi", "night"],
    views: 4820,
    likes: 312,
    author: "Neon Dreamer",
    created_by: "user_001",
    is_featured: true,
    is_verified: true,
    status: "active",
    createdAt: new Date(Date.now() - 2 * 3600_000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "Ethereal Forest Spirit",
    ai_model: "Stable Diffusion",
    prompt_text: "Ancient forest spirit emerging from mist, bioluminescent flora, god rays piercing canopy, Studio Ghibli inspired, watercolor style",
    prompt_description: "Great for fantasy illustrations and book covers.",
    tags: ["fantasy", "nature", "ghibli", "spirit"],
    views: 1230,
    likes: 87,
    author: "Pixel Sage",
    created_by: "user_002",
    is_featured: false,
    is_verified: false,
    status: "active",
    createdAt: new Date(Date.now() - 24 * 3600_000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    title: "Abstract Geometric Mind",
    ai_model: "DALL·E",
    prompt_text: "Human brain rendered as intricate geometric crystal lattice, deep blue and gold palette, macro photography style, scientific visualization",
    tags: ["abstract", "brain", "geometry", "science"],
    views: 760,
    likes: 54,
    author: "Voltaire X",
    created_by: "user_003",
    is_featured: false,
    is_verified: true,
    status: "draft",
    createdAt: new Date(Date.now() - 5 * 24 * 3600_000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const posts = [
  {
    id: 1,
    author: "Mara Osei",
    handle: "@mara.osei",
    avatar: "MO",
    avatarColor: "#1a3a2a",
    avatarText: "#4ade80",
    time: "2h ago",
    tag: "Design",
    tagColor: "#1a2a3a",
    tagText: "#60a5fa",
    content:
      "Been obsessing over Dieter Rams' 10 principles lately. 'Good design is as little design as possible.' Tried applying it to a dashboard I'm building — removed 60% of the UI and somehow made it more useful.",
    image: null,
    likes: 284,
    comments: 41,
    reposts: 17,
    liked: false,
  },
  {
    id: 2,
    author: "Theo Nakamura",
    handle: "@theo.n",
    avatar: "TN",
    avatarColor: "#2a1a3a",
    avatarText: "#c084fc",
    time: "4h ago",
    tag: "Engineering",
    tagColor: "#2a1a1a",
    tagText: "#f87171",
    content:
     ` "Hot take: the best code review comment is just a question. Not "this is wrong," not "you should do X" — just "what happens if the connection drops here?" Forces the author to think it through."`,
    image: null,
    likes: 519,
    comments: 93,
    reposts: 88,
    liked: true,
  },
  {
    id: 3,
    author: "Selin Çelik",
    handle: "@selin.dev",
    avatar: "SÇ",
    avatarColor: "#2a2a1a",
    avatarText: "#facc15",
    time: "7h ago",
    tag: "Career",
    tagColor: "#1a2a2a",
    tagText: "#2dd4bf",
    content:
      `"Three years ago I couldn't write a for-loop without googling it. Yesterday I shipped a distributed cache layer. The gap between "I can't do this" and "I've done this" is just time and embarrassing commits."`,
    image: null,
    likes: 1204,
    comments: 156,
    reposts: 302,
    liked: false,
  },
  {
    id: 4,
    author: "Ruben Alvarado",
    handle: "@ruben.a",
    avatar: "RA",
    avatarColor: "#1a1a2a",
    avatarText: "#818cf8",
    time: "12h ago",
    tag: "AI",
    tagColor: "#1a2a1a",
    tagText: "#86efac",
    content:
      "Spent a week prompting models to write my docs. Spent the next week rewriting them to sound human. Think I've found the flaw in my workflow.",
    image: null,
    likes: 742,
    comments: 68,
    reposts: 134,
    liked: false,
  },
];

 

 
export function PostFeedDemo() {
  const [filter, setFilter] = useState("All");
  const tags = ["All", "Design", "Engineering", "Career", "AI"];
 
  const filtered = filter === "All" ? DEMO_POSTS : DEMO_POSTS.filter((p) => p.tag === filter);
 
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <div className="min-h-screen bg-[#080a0f] px-4 py-10">
        <div className="max-w-2xl mx-auto mb-10">
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(28px, 5vw, 42px)",
              color: "#e8eaf0",
              fontWeight: 400,
              margin: "0 0 6px 0",
              letterSpacing: "-0.01em",
            }}
          >
            Feed
          </h1>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
              color: "#2a3550",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: "0 0 28px 0",
            }}
          >
            {posts?.length} posts · updated just now
          </p>
 
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {tags?.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  borderRadius: "7px",
                  border: `1px solid ${filter === t ? "#1e2d50" : "#13182a"}`,
                  background: filter === t ? "#0d1525" : "transparent",
                  color: filter === t ? "#60a5fa" : "#2a3550",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
 
        <div
          className="max-w-2xl mx-auto"
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {filtered?.map((post) => (
            <PostCard key={post.id} post={post} onLike={()=>{}} onView={()=>{}} />
          ))}
 
          {filtered?.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                fontFamily: "'DM Mono', monospace",
                fontSize: "12px",
                color: "#2a3550",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              No posts in this category
            </div>
          )}
        </div>
      </div>
    </>
  );
}
 












