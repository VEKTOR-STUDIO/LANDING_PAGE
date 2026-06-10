import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COUNTRIES = [
  {
    id: "mexico",
    name: "México",
    d: "M 82 52 L 95 48 L 108 50 L 118 55 L 125 62 L 122 70 L 115 75 L 108 80 L 100 85 L 90 88 L 84 82 L 78 75 L 72 68 L 70 60 L 75 54 Z",
    fill: "rgba(0,212,255,0.12)",
    stroke: "rgba(0,212,255,0.45)",
  },
  {
    id: "guatemala",
    name: "Guatemala",
    d: "M 100 88 L 108 86 L 112 90 L 110 96 L 104 98 L 98 95 Z",
    fill: "rgba(139,92,246,0.1)",
    stroke: "rgba(139,92,246,0.35)",
  },
  {
    id: "belize",
    name: "Belice",
    d: "M 110 84 L 116 83 L 117 89 L 112 90 L 110 88 Z",
    fill: "rgba(255,255,255,0.05)",
    stroke: "rgba(255,255,255,0.2)",
  },
  {
    id: "honduras",
    name: "Honduras",
    d: "M 108 92 L 118 89 L 124 92 L 122 98 L 114 100 L 107 98 Z",
    fill: "rgba(255,255,255,0.05)",
    stroke: "rgba(255,255,255,0.18)",
  },
  {
    id: "el-salvador",
    name: "El Salvador",
    d: "M 104 100 L 110 99 L 112 103 L 106 104 Z",
    fill: "rgba(255,255,255,0.05)",
    stroke: "rgba(255,255,255,0.18)",
  },
  {
    id: "nicaragua",
    name: "Nicaragua",
    d: "M 112 100 L 122 98 L 126 103 L 124 108 L 116 109 L 110 105 Z",
    fill: "rgba(255,255,255,0.05)",
    stroke: "rgba(255,255,255,0.18)",
  },
  {
    id: "costa-rica",
    name: "Costa Rica",
    d: "M 114 110 L 121 108 L 124 113 L 120 117 L 114 115 Z",
    fill: "rgba(255,255,255,0.05)",
    stroke: "rgba(255,255,255,0.18)",
  },
  {
    id: "panama",
    name: "Panamá",
    d: "M 118 117 L 130 114 L 136 117 L 132 121 L 122 121 Z",
    fill: "rgba(255,255,255,0.05)",
    stroke: "rgba(255,255,255,0.2)",
  },
  {
    id: "colombia",
    name: "Colombia",
    d: "M 128 120 L 148 116 L 158 122 L 160 132 L 155 142 L 142 148 L 130 145 L 122 136 L 124 126 Z",
    fill: "rgba(139,92,246,0.12)",
    stroke: "rgba(139,92,246,0.45)",
  },
  {
    id: "venezuela",
    name: "Venezuela",
    d: "M 152 118 L 172 114 L 184 118 L 186 128 L 178 136 L 164 138 L 154 132 L 152 124 Z",
    fill: "rgba(255,255,255,0.06)",
    stroke: "rgba(255,255,255,0.22)",
  },
  {
    id: "guyana",
    name: "Guyana",
    d: "M 184 118 L 196 116 L 200 126 L 196 134 L 186 132 L 182 124 Z",
    fill: "rgba(255,255,255,0.05)",
    stroke: "rgba(255,255,255,0.18)",
  },
  {
    id: "suriname",
    name: "Suriname",
    d: "M 196 116 L 208 114 L 212 122 L 208 130 L 198 130 L 196 122 Z",
    fill: "rgba(255,255,255,0.05)",
    stroke: "rgba(255,255,255,0.18)",
  },
  {
    id: "french-guiana",
    name: "Guayana Fr.",
    d: "M 208 114 L 220 112 L 222 120 L 216 128 L 208 126 L 208 118 Z",
    fill: "rgba(255,255,255,0.04)",
    stroke: "rgba(255,255,255,0.15)",
  },
  {
    id: "ecuador",
    name: "Ecuador",
    d: "M 118 148 L 130 145 L 136 155 L 132 164 L 120 162 L 114 154 Z",
    fill: "rgba(0,212,255,0.08)",
    stroke: "rgba(0,212,255,0.3)",
  },
  {
    id: "peru",
    name: "Perú",
    d: "M 118 162 L 136 156 L 150 158 L 158 168 L 158 185 L 150 196 L 136 200 L 122 194 L 112 180 L 112 170 Z",
    fill: "rgba(0,212,255,0.08)",
    stroke: "rgba(0,212,255,0.28)",
  },
  {
    id: "bolivia",
    name: "Bolivia",
    d: "M 150 196 L 164 190 L 178 192 L 182 206 L 176 218 L 160 222 L 146 216 L 144 204 Z",
    fill: "rgba(255,255,255,0.06)",
    stroke: "rgba(255,255,255,0.2)",
  },
  {
    id: "brazil",
    name: "Brasil",
    d: "M 155 140 L 180 136 L 202 130 L 224 140 L 236 156 L 238 174 L 232 194 L 220 208 L 206 216 L 192 224 L 180 230 L 166 228 L 156 220 L 152 208 L 158 196 L 164 188 L 178 190 L 180 204 L 174 214 L 165 222 L 154 218 L 148 210 L 142 200 L 144 188 L 148 176 L 148 162 L 152 150 Z",
    fill: "rgba(0,212,255,0.07)",
    stroke: "rgba(0,212,255,0.35)",
  },
  {
    id: "paraguay",
    name: "Paraguay",
    d: "M 168 218 L 182 214 L 186 224 L 184 234 L 170 236 L 162 228 Z",
    fill: "rgba(255,255,255,0.05)",
    stroke: "rgba(255,255,255,0.2)",
  },
  {
    id: "chile",
    name: "Chile",
    d: "M 134 204 L 148 196 L 152 208 L 148 220 L 146 236 L 144 252 L 140 268 L 134 280 L 128 290 L 122 282 L 124 268 L 126 252 L 128 236 L 130 220 Z",
    fill: "rgba(139,92,246,0.1)",
    stroke: "rgba(139,92,246,0.4)",
  },
  {
    id: "argentina",
    name: "Argentina",
    d: "M 148 220 L 164 218 L 180 224 L 186 236 L 184 252 L 176 264 L 164 272 L 150 276 L 140 270 L 136 256 L 138 240 L 144 228 Z",
    fill: "rgba(139,92,246,0.1)",
    stroke: "rgba(139,92,246,0.4)",
  },
  {
    id: "uruguay",
    name: "Uruguay",
    d: "M 176 236 L 188 232 L 192 240 L 186 248 L 176 248 L 172 240 Z",
    fill: "rgba(255,255,255,0.05)",
    stroke: "rgba(255,255,255,0.2)",
  },
];

const HUB_CITIES = [
  { name: "Ciudad de México", cx: 96, cy: 66, hub: true },
  { name: "Bogotá", cx: 138, cy: 136, hub: true },
  { name: "São Paulo", cx: 200, cy: 204, hub: true },
  { name: "Buenos Aires", cx: 178, cy: 244, hub: true },
  { name: "Santiago", cx: 138, cy: 248, hub: true },
  { name: "Lima", cx: 128, cy: 180, hub: false },
  { name: "Caracas", cx: 166, cy: 122, hub: false },
];

const CONNECTIONS = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 1, to: 4 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 5, to: 1 },
  { from: 6, to: 1 },
];

export const LatamMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
        },
      });

      tl.fromTo(
        ".country-path",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.02, ease: "power2.out", transformOrigin: "center center" }
      )
        .fromTo(
          ".conn-line",
          { strokeDashoffset: 300, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power2.inOut" },
          "-=0.3"
        )
        .fromTo(
          ".city-group",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)", transformOrigin: "center center" },
          "-=0.8"
        );

      // Idle pulse for hub cities
      gsap.utils.toArray<SVGCircleElement>(".hub-pulse").forEach((el, i) => {
        gsap.to(el, {
          r: 10,
          opacity: 0,
          duration: 2,
          repeat: -1,
          delay: i * 0.4,
          ease: "power1.out",
        });
      });

      // Animated dot traveling along connection lines
      gsap.utils.toArray<SVGCircleElement>(".travel-dot").forEach((dot, i) => {
        const line = document.querySelectorAll<SVGLineElement>(".conn-line")[i];
        if (!line) return;
        gsap.to(dot, {
          motionPath: {
            path: line,
            align: line,
            autoRotate: false,
          },
          duration: 3 + i * 0.5,
          repeat: -1,
          delay: i * 0.8,
          ease: "none",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center p-4">
      <svg
        viewBox="60 44 180 260"
        className="w-full h-full"
        style={{ maxHeight: "480px" }}
      >
        <defs>
          <radialGradient id="glowCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glowViolet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Countries */}
        {COUNTRIES.map((c) => (
          <path
            key={c.id}
            className="country-path"
            d={c.d}
            fill={c.fill}
            stroke={c.stroke}
            strokeWidth="0.8"
            strokeLinejoin="round"
            style={{ opacity: 0 }}
          />
        ))}

        {/* Connection lines */}
        {CONNECTIONS.map((conn, i) => {
          const from = HUB_CITIES[conn.from];
          const to = HUB_CITIES[conn.to];
          return (
            <line
              key={`conn-${i}`}
              className="conn-line"
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke="rgba(0,212,255,0.25)"
              strokeWidth="0.8"
              strokeDasharray="300"
              strokeDashoffset="300"
              style={{ opacity: 0 }}
            />
          );
        })}

        {/* Traveling dots on lines */}
        {CONNECTIONS.map((conn, i) => {
          const from = HUB_CITIES[conn.from];
          const to = HUB_CITIES[conn.to];
          const mx = (from.cx + to.cx) / 2;
          const my = (from.cy + to.cy) / 2;
          return (
            <circle
              key={`dot-${i}`}
              cx={mx}
              cy={my}
              r="1.2"
              fill="#00D4FF"
              opacity="0.8"
              filter="url(#glow)"
            />
          );
        })}

        {/* Cities */}
        {HUB_CITIES.map((city, i) => (
          <g key={`city-${i}`} className="city-group" style={{ opacity: 0 }}>
            {city.hub && (
              <circle
                className="hub-pulse"
                cx={city.cx}
                cy={city.cy}
                r="5"
                fill="none"
                stroke={i < 2 ? "#00D4FF" : "#8B5CF6"}
                strokeWidth="0.8"
                opacity="0.6"
              />
            )}
            <circle
              cx={city.cx}
              cy={city.cy}
              r={city.hub ? 3.5 : 2.2}
              fill={city.hub ? (i < 2 ? "#00D4FF" : "#8B5CF6") : "rgba(255,255,255,0.5)"}
              filter="url(#glow)"
            />
            <circle
              cx={city.cx}
              cy={city.cy}
              r="1.2"
              fill="white"
            />
            {city.hub && (
              <text
                x={city.cx + 5}
                y={city.cy - 4}
                fill={i < 2 ? "#00D4FF" : "#a78bfa"}
                fontSize="4.5"
                fontFamily="Inter, sans-serif"
                fontWeight="600"
              >
                {city.name}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};
