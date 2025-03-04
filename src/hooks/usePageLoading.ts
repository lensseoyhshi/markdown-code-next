import { useState, useEffect } from 'react';

export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    document.documentElement.classList.remove('loading');
  }, []);

  return isLoading;
}