import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Segment = { text: string; italic?: boolean };

interface TextSplitRevealProps {
  text?: string;
  segments?: Segment[];
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

export const TextSplitReveal: React.FC<TextSplitRevealProps> = ({
  text,
  segments,
  className = "",
  as: Component = "h2",
  style,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  const resolvedSegments: Segment[] = segments
    ? segments
    : [{ text: text ?? "", italic: false }];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = containerRef.current?.querySelectorAll(".char");
      if (!chars || chars.length === 0) return;

      gsap.fromTo(
        chars,
        { opacity: 0, y: 40, rotateX: -45 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.018,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text, segments]);

  const content = resolvedSegments.map((seg, segIndex) =>
    seg.text.split(" ").map((word, wordIndex) => (
      <span
        key={`${segIndex}-${wordIndex}`}
        className="inline-block whitespace-nowrap mr-[0.22em]"
        style={seg.italic ? { fontStyle: "italic" } : undefined}
      >
        {word.split("").map((char, charIndex) => (
          <span key={charIndex} className="char inline-block opacity-0">
            {char}
          </span>
        ))}
      </span>
    ))
  );

  return React.createElement(
    Component as React.ElementType,
    { ref: containerRef, className, style: { perspective: "1000px", ...style } },
    content
  );
};
