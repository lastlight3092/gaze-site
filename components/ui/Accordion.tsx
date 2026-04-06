"use client";

import { useState } from "react";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ borderTop: "1px solid var(--border)" }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              padding: "16px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              color: "var(--text-primary)",
              fontFamily: "var(--sans)",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textAlign: "left",
            }}
            aria-expanded={openIndex === i}
          >
            <span>{item.title}</span>
            <span
              style={{
                color: "var(--brass)",
                fontSize: 18,
                transition: "transform 0.25s",
                transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                lineHeight: 1,
              }}
            >
              +
            </span>
          </button>
          <div
            style={{
              display: openIndex === i ? "block" : "none",
              paddingBottom: 20,
            }}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
