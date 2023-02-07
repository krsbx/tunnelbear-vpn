import { useEffect } from 'react';

const useOnHover = (
  ref: React.RefObject<HTMLElement> | React.MutableRefObject<HTMLElement>,
  onHover: () => void,
  onHoverLeave: () => void
) => {
  useEffect(() => {
    if (!ref.current) return;

    ref.current?.addEventListener('mouseover', onHover);
    ref.current?.addEventListener('mouseout', onHoverLeave);

    return () => {
      if (!ref.current) return;

      /* eslint-disable react-hooks/exhaustive-deps */
      ref.current.removeEventListener('mouseover', onHover);
      ref.current.removeEventListener('mouseout', onHoverLeave);
      /* eslint-enable react-hooks/exhaustive-deps */
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useOnHover;
