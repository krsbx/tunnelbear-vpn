import { useEffect, useState } from 'react';

const useRenderRefresher = () => {
  const [isPrevRefreshed, setIsPrevRefreshed] = useState(false);
  const [isRefreshed, setIsRefreshed] = useState(false);

  const refreshRender = () => setIsRefreshed((curr) => !curr);

  useEffect(() => {
    if (isPrevRefreshed === isRefreshed) return;

    const timeoutRef = setTimeout(() => {
      setIsPrevRefreshed(isPrevRefreshed);
      setIsRefreshed(!isRefreshed);
    }, 500);

    // eslint-disable-next-line consistent-return
    return () => {
      if (!timeoutRef) return;

      clearTimeout(timeoutRef);
    };
  }, [isPrevRefreshed, isRefreshed]);

  return refreshRender;
};

export default useRenderRefresher;
