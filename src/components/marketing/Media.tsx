import { useState } from "react";
import { media, type MediaKey } from "../../data/media";

export default function Media({
  asset,
  className = "",
  caption = false,
  priority = false,
  sizes = "(max-width: 700px) calc(100vw - 40px), 50vw",
}: {
  asset: MediaKey;
  className?: string;
  caption?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  const item = media[asset];
  const [failed, setFailed] = useState(false);
  return (
    <figure className={`brand-photo ${className}`}>
      <div className="photo-frame">
        <img
          src={failed ? "/images/marketing/image-placeholder.svg" : item.src}
          srcSet={
            failed
              ? undefined
              : `${item.small} ${item.smallWidth}w, ${item.src} ${item.width}w`
          }
          sizes={sizes}
          width={item.width}
          height={item.height}
          alt={
            failed
              ? "Image placeholder — photograph will be added soon."
              : item.alt
          }
          loading={priority ? "eager" : "lazy"}
          {...{ fetchpriority: priority ? "high" : "auto" }}
          decoding="async"
          onError={failed ? undefined : () => setFailed(true)}
        />
      </div>
      {caption && (
        <figcaption>{failed ? "Image coming soon" : item.caption}</figcaption>
      )}
    </figure>
  );
}
