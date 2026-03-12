"use client";

import { useState, useRef, ChangeEvent } from "react";

const AI_MODELS = [
  "GPT-4o",
  "DALL·E 3",
  "Midjourney",
  "Stable Diffusion",
  "Claude 3.5",
  "Gemini 1.5",
  "Flux",
  "Firefly",
];

type PostStatus = "active" | "draft" | "deleted";

interface PostFormData {
  title: string;
  ai_model: string;
  prompt_text: string;
  prompt_description: string;
  raw_image: string;
  prompt_image: string;
  tags: string[];
  status: PostStatus;
  is_featured: boolean;
}

const INITIAL_FORM: PostFormData = {
  title: "",
  ai_model: "",
  prompt_text: "",
  prompt_description: "",
  raw_image: "",
  prompt_image: "",
  tags: [],
  status: "draft",
  is_featured: false,
};

export default function CreatePostForm() {
  const [form, setForm] = useState<PostFormData>(INITIAL_FORM);
  const [tagInput, setTagInput] = useState("");
  const [rawImagePreview, setRawImagePreview] = useState<string | null>(null);
  const [promptImagePreview, setPromptImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const rawImageRef = useRef<HTMLInputElement | null>(null);
  const promptImageRef = useRef<HTMLInputElement |null>(null);

  const sections = ["Core", "Prompt", "Media", "Meta"];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase().replace(/^#/, "");
      if (!form.tags.includes(newTag) && form.tags.length < 10) {
        setForm((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    field: "raw_image" | "prompt_image"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (field === "raw_image") {
        setRawImagePreview(result);
        setForm((prev) => ({ ...prev, raw_image: result }));
      } else {
        setPromptImagePreview(result);
        setForm((prev) => ({ ...prev, prompt_image: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setTagInput("");
    setRawImagePreview(null);
    setPromptImagePreview(null);
    setSubmitted(false);
    setActiveSection(0);
  };

  const promptRemaining = 1500 - form.prompt_text.length;
  const descRemaining = 200 - form.prompt_description.length;

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
              <svg className="w-9 h-9 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-light text-white mb-3 tracking-tight" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Post Created
          </h2>
          <p className="text-zinc-500 mb-10 font-light">Your prompt has been published to the gallery.</p>
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-sm font-light rounded-full transition-all duration-300"
          >
            Create another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-16">
        <div className="mb-12">
          <span className="text-xs font-medium tracking-[0.2em] text-violet-400/70 uppercase mb-4 block">
            Prompt Gallery
          </span>
          <h1 className="text-4xl font-light tracking-tight text-white mb-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            New Post
          </h1>
          <p className="text-zinc-500 font-light text-sm">Share your AI prompt with the community</p>
        </div>

        <div className="flex gap-1 mb-10 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          {sections.map((s, i) => (
            <button
              key={s}
              onClick={() => setActiveSection(i)}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                activeSection === i
                  ? "bg-white/10 text-white"
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {activeSection === 0 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <Field label="Title" required>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Cinematic forest at golden hour…"
                  className={inputCls}
                />
              </Field>

              <Field label="AI Model">
                <div className="grid grid-cols-4 gap-2">
                  {AI_MODELS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, ai_model: p.ai_model === m ? "" : m }))}
                      className={`py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 border ${
                        form.ai_model === m
                          ? "bg-violet-500/20 border-violet-500/50 text-violet-300"
                          : "bg-white/[0.03] border-white/[0.08] text-zinc-500 hover:text-zinc-300 hover:border-white/20"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Status">
                <div className="flex gap-2">
                  {(["draft", "active"] as PostStatus[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, status: s }))}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-medium capitalize transition-all duration-200 border ${
                        form.status === s
                          ? s === "active"
                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                            : "bg-amber-500/20 border-amber-500/40 text-amber-300"
                          : "bg-white/[0.03] border-white/[0.08] text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {s === "active" ? "🟢 Publish" : "🟡 Draft"}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {activeSection === 1 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <Field label="Prompt Text" required hint={`${promptRemaining} characters remaining`} hintDanger={promptRemaining < 100}>
                <textarea
                  name="prompt_text"
                  value={form.prompt_text}
                  onChange={handleChange}
                  required
                  maxLength={1500}
                  rows={8}
                  placeholder="Describe your prompt in full detail. Be specific about style, lighting, mood, camera angle…"
                  className={`${inputCls} resize-none leading-relaxed`}
                />
              </Field>

              <Field label="Short Description" hint={`${descRemaining} characters remaining`} hintDanger={descRemaining < 20}>
                <textarea
                  name="prompt_description"
                  value={form.prompt_description}
                  onChange={handleChange}
                  maxLength={200}
                  rows={3}
                  placeholder="One-line summary shown in the card preview…"
                  className={`${inputCls} resize-none`}
                />
              </Field>
            </div>
          )}

          {activeSection === 2 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <ImageUpload
                label="Raw Output Image"
                hint="Upload the unedited AI output"
                preview={rawImagePreview}
                inputRef={rawImageRef}
                onChange={(e) => handleImageUpload(e, "raw_image")}
                onClear={() => { setRawImagePreview(null); setForm(p => ({ ...p, raw_image: "" })); }}
              />
              <ImageUpload
                label="Prompt Reference Image"
                hint="Optional reference / style image used in the prompt"
                preview={promptImagePreview}
                inputRef={promptImageRef}
                onChange={(e) => handleImageUpload(e, "prompt_image")}
                onClear={() => { setPromptImagePreview(null); setForm(p => ({ ...p, prompt_image: "" })); }}
              />
            </div>
          )}

          {activeSection === 3 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <Field label="Tags" hint="Press Enter or comma to add · max 10">
                <div className={`${inputCls} min-h-[80px] flex flex-wrap gap-2 items-start cursor-text`}
                  onClick={() => document.getElementById("tag-input")?.focus()}>
                  {form.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-xs text-violet-300">
                      #{tag}
                      <button type="button" onClick={() => removeTag(tag)} className="text-violet-400/60 hover:text-violet-200 transition-colors">
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    id="tag-input"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder={form.tags.length === 0 ? "landscape, cinematic, neon…" : ""}
                    className="bg-transparent outline-none text-sm text-white placeholder-zinc-600 min-w-[120px] flex-1"
                  />
                </div>
              </Field>

              <div className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl">
                <div>
                  <p className="text-sm text-zinc-300">Feature this post</p>
                  <p className="text-xs text-zinc-600 mt-0.5">Pinned to the top of the gallery</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, is_featured: !p.is_featured }))}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${form.is_featured ? "bg-violet-500" : "bg-white/10"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${form.is_featured ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setActiveSection((s) => Math.max(0, s - 1))}
              disabled={activeSection === 0}
              className="px-5 py-2.5 text-sm text-zinc-500 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Back
            </button>

            <div className="flex gap-2 items-center">
              {sections.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeSection ? "bg-violet-400 w-4" : "bg-white/15"}`} />
              ))}
            </div>

            {activeSection < sections.length - 1 ? (
              <button
                type="button"
                onClick={() => setActiveSection((s) => Math.min(sections.length - 1, s + 1))}
                className="px-5 py-2.5 text-sm text-zinc-300 hover:text-white transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting || !form.title || !form.prompt_text}
                className="px-7 py-2.5 bg-violet-500 hover:bg-violet-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Publishing…
                  </>
                ) : (
                  "Publish post"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}


const inputCls =
  "w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] focus:border-violet-500/50 focus:bg-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200";

function Field({
  label,
  required,
  hint,
  hintDanger,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  hintDanger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
          {label}
          {required && <span className="text-violet-400 ml-1">*</span>}
        </label>
        {hint && (
          <span className={`text-xs transition-colors ${hintDanger ? "text-amber-400" : "text-zinc-600"}`}>
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function ImageUpload({
  label,
  hint,
  preview,
  inputRef,
  onChange,
  onClear,
}: {
  label: string;
  hint: string;
  preview: string | null;
  inputRef: React.RefObject<HTMLInputElement |null>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) {
  return (
    <Field label={label} hint={hint}>
      {preview ? (
        <div className="relative group rounded-xl overflow-hidden border border-white/10 aspect-video">
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={onClear}
              className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white text-xs rounded-full transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full aspect-video bg-white/[0.02] border border-dashed border-white/[0.12] hover:border-violet-500/40 hover:bg-white/[0.04] rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-200 group"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-violet-500/10 flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-zinc-600 group-hover:text-violet-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 5.25 5.25 0 011.886 7.67" />
            </svg>
          </div>
          <span className="text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">Click to upload</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={onChange} className="hidden" />
    </Field>
  );
}
