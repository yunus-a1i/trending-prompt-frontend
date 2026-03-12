"use client";
import { useState } from "react";
import { Post } from "../user/posts/postCard";


const HeartIcon = ({ filled }:{filled:boolean}) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
 
const CommentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const RepostIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

export default function FeedPostCard({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);

  const [hovered, setHovered] = useState(false);
 
  const handleLike = () => {
    setLiked((l) => !l);
    setLikes((c) => (liked ? c - 1 : c + 1));
  };
 
  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#0d1117" : "#0a0c11",
        border: `1px solid ${hovered ? "#1e2535" : "#13182a"}`,
        borderRadius: "16px",
        padding: "24px",
        transition: "background 0.2s ease, border-color 0.2s ease",
        cursor: "default",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: post.avatarColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "600",
            color: post.avatarText,
            flexShrink: 0,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.02em",
          }}
        >
          {post.avatar}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "15px", color: "#e8eaf0", fontWeight: 400 }}>
              {post.author}
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#3d4a6a", letterSpacing: "0.02em" }}>
              {post.handle}
            </span>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: post.tagColor,
                color: post.tagText,
                padding: "3px 8px",
                borderRadius: "5px",
                fontWeight: "500",
              }}
            >
              {post.tag}
            </span>
          </div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#2a3550", letterSpacing: "0.02em" }}>
            {post.time}
          </span>
        </div>
      </div>
 
      {/* Content */}
      <p
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: "16px",
          lineHeight: "1.7",
          color: "#9aa3b8",
          margin: "0 0 20px 0",
          letterSpacing: "0.01em",
        }}
      >
        {post.content}
      </p>
 
      {/* Actions */}
      <div style={{ display: "flex", gap: "6px" }}>
        <button
          onClick={handleLike}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: liked ? "#1f1020" : "transparent",
            border: `1px solid ${liked ? "#4a1a4a" : "#13182a"}`,
            borderRadius: "8px",
            padding: "6px 12px",
            color: liked ? "#f472b6" : "#3d4a6a",
            fontSize: "12px",
            fontFamily: "'DM Mono', monospace",
            cursor: "pointer",
            transition: "all 0.15s ease",
            letterSpacing: "0.02em",
          }}
        >
          <HeartIcon filled={liked} />
          {likes}
          {/* {likes.toLocaleString()} */}
        </button>
 
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "transparent",
            border: "1px solid #13182a",
            borderRadius: "8px",
            padding: "6px 12px",
            color: "#3d4a6a",
            fontSize: "12px",
            fontFamily: "'DM Mono', monospace",
            cursor: "pointer",
            transition: "all 0.15s ease",
            letterSpacing: "0.02em",
          }}
        >
          <CommentIcon />
          {post.comments}
        </button>
 
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "transparent",
            border: "1px solid #13182a",
            borderRadius: "8px",
            padding: "6px 12px",
            color: "#3d4a6a",
            fontSize: "12px",
            fontFamily: "'DM Mono', monospace",
            cursor: "pointer",
            transition: "all 0.15s ease",
            letterSpacing: "0.02em",
          }}
        >
          <RepostIcon />
          {post.reposts}
        </button>
      </div>
    </article>
  );
}