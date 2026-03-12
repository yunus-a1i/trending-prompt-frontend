import { formatCount, getInitials, timeAgo } from "@/utils/postHelper";
import { useState } from "react";

export interface Post {
  _id: string;
  title: string;
  ai_model?: string;
  prompt_text: string;
  prompt_description?: string;
  raw_image?: string;
  prompt_image?: string;
  tags?: string[];
  views?: number;
  likes?: number;
  author?: string;
  created_by: string;
  is_featured?: boolean;
  status?: "active" | "deleted" | "draft";
  is_verified?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PostCardProps {
  post: any ;
//   post: Post ;
  onLike?: (postId: string) => void;
  onView?: (postId: string) => void;
}

function VerifiedBadge() {
  return (
    <svg className="w-3.5 h-3.5 text-sky-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-.897 3.442 3.745 3.745 0 01-3.442.897A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.442-.897 3.745 3.745 0 01-.897-3.442A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 01.897-3.442 3.745 3.745 0 013.442-.897A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.442.897 3.745 3.745 0 01.897 3.442A3.745 3.745 0 0121 12z" />
    </svg>
  );
}

function FeaturedRibbon() {
  return (
    <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/90 text-amber-900 text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-amber-500/20 backdrop-blur-sm">
      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      Featured
    </div>
  );
}
function modelColor(model?: string): string {
  if (!model) return MODEL_COLORS.default;
  const key = Object.keys(MODEL_COLORS).find((k) =>
    model.toLowerCase().includes(k)
  );
  return key ? MODEL_COLORS[key] : MODEL_COLORS.default;
}
const MODEL_COLORS: Record<string, string> = {
  "gpt-4":       "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "gpt-4o":      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "claude":      "bg-orange-500/10  text-orange-400  border-orange-500/20",
  "dalle":       "bg-purple-500/10  text-purple-400  border-purple-500/20",
  "midjourney":  "bg-pink-500/10    text-pink-400    border-pink-500/20",
  "gemini":      "bg-blue-500/10    text-blue-400    border-blue-500/20",
  "stable":      "bg-yellow-500/10  text-yellow-400  border-yellow-500/20",
  default:       "bg-slate-500/10   text-slate-400   border-slate-500/20",
};

export default function PostCard({ post, onLike, onView }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes ?? 0);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const PROMPT_LIMIT = 120;
  const isLong = post.prompt_text.length > PROMPT_LIMIT;
  const displayPrompt = expanded || !isLong
    ? post.prompt_text
    : post.prompt_text.slice(0, PROMPT_LIMIT) + "…";

  function handleLike() {
    setLiked((p) => !p);
    setLikeCount((c:any) => (liked ? c - 1 : c + 1));
    onLike?.(post._id);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(post.prompt_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <article
      className="group relative flex flex-col bg-[#0f1117] border border-white/[0.06] rounded-2xl overflow-hidden shadow-xl shadow-black/40 hover:border-white/[0.12] hover:shadow-2xl hover:shadow-black/60 transition-all duration-300"
      onClick={() => onView?.(post._id)}
    >
      {post.is_featured && <FeaturedRibbon />}

      {(post.prompt_image || post.raw_image) ? (
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0a0c10]">
          <img
            src={post.prompt_image ?? post.raw_image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-transparent to-transparent opacity-80" />
          {post.ai_model && (
            <span className={`absolute bottom-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-full border backdrop-blur-md ${modelColor(post.ai_model)}`}>
              {post.ai_model}
            </span>
          )}
        </div>
      ) : (
        <div className="relative w-full aspect-[16/9] bg-[#0a0c10] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #1e3a5f 0%, transparent 55%), radial-gradient(circle at 75% 70%, #1a1040 0%, transparent 55%)" }} />
          <svg className="w-12 h-12 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          {post.ai_model && (
            <span className={`absolute bottom-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-full border backdrop-blur-md ${modelColor(post.ai_model)}`}>
              {post.ai_model}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3 p-4 flex-1">

        <div className="flex items-start justify-between gap-2">
          <h2 className="text-sm font-semibold text-white/90 leading-snug line-clamp-2 tracking-tight">
            {post.title}
          </h2>
          {post.status === "draft" && (
            <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 uppercase tracking-wider">
              Draft
            </span>
          )}
        </div>

        {post.prompt_description && (
          <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
            {post.prompt_description}
          </p>
        )}

        <div className="relative rounded-xl bg-white/[0.03] border border-white/[0.05] p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <svg className="w-3 h-3 text-white/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 9h8M8 13h6" strokeLinecap="round" />
              <rect x="3" y="3" width="18" height="18" rx="3" />
            </svg>
            <span className="text-[10px] text-white/25 font-medium tracking-widest uppercase">Prompt</span>
          </div>
          <p className="text-xs text-white/60 leading-relaxed font-mono">
            {displayPrompt}
          </p>
          {isLong && (
            <button
              onClick={(e) => { e.stopPropagation(); setExpanded((p) => !p); }}
              className="mt-1 text-[10px] text-sky-400 hover:text-sky-300 transition-colors"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); handleCopy(); }}
            className="absolute top-2.5 right-2.5 p-1 rounded-md text-white/20 hover:text-white/60 hover:bg-white/[0.06] transition-all"
            title="Copy prompt"
          >
            {copied ? (
              <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            )}
          </button>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 5).map((tag:string) => (
              <span
                key={tag}
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-white/40 border border-white/[0.06] hover:text-white/60 hover:bg-white/[0.07] cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 5 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-white/30 border border-white/[0.06]">
                +{post.tags.length - 5}
              </span>
            )}
          </div>
        )}

        <div className="h-px bg-white/[0.05] -mx-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 ring-1 ring-white/10">
              {getInitials(post.author)}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-white/50 font-medium truncate max-w-[90px]">
                {post.author ?? "Anonymous"}
              </span>
              {post.is_verified && <VerifiedBadge />}
            </div>
            <span className="text-[10px] text-white/20">·</span>
            <span className="text-[10px] text-white/25">{timeAgo(post.createdAt)}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-white/30">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="text-[11px] tabular-nums">{formatCount(post.views ?? 0)}</span>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); handleLike(); }}
              className={`flex items-center gap-1 transition-colors duration-200 ${liked ? "text-rose-400" : "text-white/30 hover:text-rose-400"}`}
            >
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${liked ? "scale-125" : "scale-100"}`}
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinejoin="round" />
              </svg>
              <span className="text-[11px] tabular-nums">{formatCount(likeCount)}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}