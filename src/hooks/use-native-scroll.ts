import { useEffect, useState } from "react";

const NATIVE_SCROLL_QUERY = "(hover: none) and (pointer: coarse), (max-width: 767px)";

export function useNativeScroll() {
  const [useNativeScroll, setUseNativeScroll] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(NATIVE_SCROLL_QUERY);
    const update = () => setUseNativeScroll(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return useNativeScroll;
}
