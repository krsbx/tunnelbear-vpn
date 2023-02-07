import React, { useEffect, useState } from 'react';

const useRectObserver = (
  ref: React.RefObject<HTMLElement> | React.MutableRefObject<HTMLElement>,
  type: 'height' | 'width',
  cb?: (value: number) => void
) => {
  const [value, setValue] = useState(0);

  // Effect to listen changing width/height on a component
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const value = entry.contentRect[type];

      setValue(value);
      cb?.(value);
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return value;
};

export default useRectObserver;
