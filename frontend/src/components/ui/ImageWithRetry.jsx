import { useEffect, useMemo, useState } from 'react';

const RETRY_DELAYS_MS = [400, 900, 1400, 2200];

function appendRetryParam(url, token) {
  if (!url) return '';
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}retry=${token}`;
}

export default function ImageWithRetry({ src, alt, className, ...rest }) {
  const [attempt, setAttempt] = useState(0);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    setAttempt(0);
    setRetryToken(0);
  }, [src]);

  const resolvedSrc = useMemo(() => {
    if (!src) return '';
    return retryToken ? appendRetryParam(src, retryToken) : src;
  }, [src, retryToken]);

  const handleError = () => {
    if (attempt >= RETRY_DELAYS_MS.length) return;
    const nextAttempt = attempt + 1;
    setAttempt(nextAttempt);
    window.setTimeout(() => {
      setRetryToken(Date.now());
    }, RETRY_DELAYS_MS[attempt]);
  };

  return <img src={resolvedSrc} alt={alt} className={className} onError={handleError} {...rest} />;
}

