"use client";

import { useFormStatus } from "react-dom";
import { addCommentAction } from "@/actions/interactions";

function CommentSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary py-2.5 px-6 text-sm self-end disabled:opacity-60"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 border-2 border-base/40 border-t-base rounded-full animate-spin" />
          Posting…
        </span>
      ) : "Post Comment"}
    </button>
  );
}

interface CommentFormProps {
  postId: string;
  slug: string;
}

export function CommentForm({ postId, slug }: CommentFormProps) {
  return (
    <form action={addCommentAction} className="flex flex-col gap-3">
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="slug"   value={slug} />
      <textarea
        name="content"
        rows={3}
        required
        maxLength={1000}
        placeholder="Share your thoughts…"
        className="w-full bg-base/60 border border-border rounded-sm px-4 py-3 text-text-primary text-sm
          placeholder:text-text-muted/40 focus:outline-none focus:border-green-bright/60
          focus:shadow-glow-green resize-none transition-all duration-300"
      />
      <CommentSubmit />
    </form>
  );
}
