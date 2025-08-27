"use client";

export default function ResultBadge({ value }: { value: number }) {
  return (
    <div className="inline-flex items-center justify-center rounded-full border px-5 py-2 text-lg font-semibold">
      {Number.isFinite(value) ? `${value} persons` : "—"}
    </div>
  );
}
