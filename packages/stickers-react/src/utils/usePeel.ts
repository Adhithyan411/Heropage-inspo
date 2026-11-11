"use client";

import React, { useState } from "react";

export function usePeel(peel?: boolean, userStyle?: React.CSSProperties) {
  const [hovered, setHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    display: "inline-block",
    transformOrigin: "center center",
    ...userStyle,
  };

  if (!peel) {
    return {
      style: baseStyle,
      onMouseEnter: undefined,
      onMouseLeave: undefined,
    };
  }

  const baseTransform = userStyle?.transform ? `${userStyle.transform} ` : "";
  const transform = hovered
    ? `${baseTransform}perspective(600px) rotateX(10deg) rotateY(-10deg) translateY(-8px) scale(1.08)`
    : `${baseTransform}perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;

  const baseFilter = userStyle?.filter ? `${userStyle.filter} ` : "";
  const filter = hovered
    ? `${baseFilter}drop-shadow(0 20px 25px rgba(0, 0, 0, 0.35))`
    : (userStyle?.filter || "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05))");

  const peelStyle: React.CSSProperties = {
    ...baseStyle,
    cursor: "pointer",
    transition: "transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 350ms cubic-bezier(0.34, 1.56, 0.64, 1)",
    transform,
    filter,
  };

  return {
    style: peelStyle,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
}

