"use client";

import { useEffect, useState } from "react";

export default function AnimatedBorder() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* OUTER ANIMATED FRAME */}
      <div
        className="
          absolute inset-0

          bg-[linear-gradient(90deg,#ff3cac,#784ba0,#2b86c5,#ff3cac)]
          bg-[length:300%_300%]
          animate-[borderMove_6s_linear_infinite]

          [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
          [mask-composite:exclude]
          [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
          [-webkit-mask-composite:xor]
        "
      />
    </div>
  );
}
