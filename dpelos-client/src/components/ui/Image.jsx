import { useState } from 'react';
import { cn } from '../../lib/utils';
import placeholder from '../../assets/placeholder.svg';

export function Image({
  src,
  alt = "",
  className,
  fill = false,
  width,
  height,
  priority = false,
  onLoad,
  fallbackSrc = placeholder,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div
      className={cn(
        fill ? "relative w-full h-full" : "",
        isLoading ? "bg-gray-200 animate-pulse" : "",
        className
      )}
      style={!fill && width && height ? { width, height } : {}}
    >
      <img
        src={error ? fallbackSrc : (src || fallbackSrc)}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          fill ? "absolute inset-0 w-full h-full" : "",
          isLoading ? "opacity-0" : "opacity-100",
          "object-cover",
          className
        )}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}
