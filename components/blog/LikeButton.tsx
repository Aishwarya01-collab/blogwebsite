"use client";

import { useFormStatus } from "react-dom";
import { toggleLikeAction } from "@/actions/interactions";

interface LikeButtonProps {
  postId: string;
  likeCount: number;
  isLiked: boolean;
}

function LikeInner({ likeCount, isLiked }: { likeCount: number; isLiked: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex items-center gap-2.5 px-5 py-2.5 rounded-sm border transition-all duration-300
        font-mono text-sm tracking-wider disabled:opacity-50
        ${isLiked
          ? "border-gold/60 bg-gold/10 text-gold hover:bg-gold/20"
          : "border-border text-text-muted hover:border-gold/40 hover:text-gold hover:bg-gold/5"
        }`}
    >
      <span className={`text-base transition-transform duration-300 ${pending ? "animate-spin" : isLiked ? "scale-125" : ""}`}>
        {isLiked ? "✦" : "✧"}
      </span>
      <span>{likeCount}</span>
    </button>
  );
}

export function LikeButton({ postId, likeCount, isLiked }: LikeButtonProps) {
  return (
    <form action={toggleLikeAction}>
      <input type="hidden" name="postId" value={postId} />
      <LikeInner likeCount={likeCount} isLiked={isLiked} />
    </form>
  );
}
