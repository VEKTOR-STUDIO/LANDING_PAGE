import React, { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = "", 
  strength = 50,
  ...props 
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - w;

      gsap.to(button, {
        x: (x / h) * strength,
        y: (y / w) * strength,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(content, {
        x: (x / h) * (strength * 0.5),
        y: (y / w) * (strength * 0.5),
        duration: 1,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([button, content], {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <button
      ref={buttonRef}
      className={`relative inline-flex items-center justify-center ${className}`}
      {...props}
    >
      <span ref={contentRef} className="relative z-10 pointer-events-none">
        {children}
      </span>
    </button>
  );
};
