import React from "react";

type Variant = "primary" | "outline" | "ghost" | "brass" | "dark";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  as?: "button";
}

const styles: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "var(--text-primary)",
    color: "var(--obsidian)",
    border: "none",
  },
  outline: {
    background: "transparent",
    color: "var(--text-primary)",
    border: "1px solid var(--border-light)",
  },
  ghost: {
    background: "transparent",
    color: "var(--bone)",
    border: "1px solid rgba(200,191,176,0.25)",
  },
  brass: {
    background: "var(--brass)",
    color: "var(--obsidian)",
    border: "none",
  },
  dark: {
    background: "var(--walnut)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-light)",
  },
};

const hoverStyles: Record<Variant, React.CSSProperties> = {
  primary: { background: "var(--cream)" },
  outline: { borderColor: "var(--bone)", background: "var(--walnut)" },
  ghost: { borderColor: "rgba(200,191,176,0.5)", background: "rgba(200,191,176,0.05)" },
  brass: { background: "var(--brass-light)" },
  dark: { background: "var(--espresso)" },
};

export default function Button({
  variant = "primary",
  fullWidth = false,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      {...props}
      onMouseEnter={(e) => {
        setHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        onMouseLeave?.(e);
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontFamily: "var(--sans)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontSize: 11,
        padding: "14px 32px",
        width: fullWidth ? "100%" : undefined,
        transition: "all 0.25s",
        borderRadius: 0,
        fontWeight: 400,
        ...styles[variant],
        ...(hovered ? hoverStyles[variant] : {}),
        ...style,
      }}
    >
      {children}
    </button>
  );
}
