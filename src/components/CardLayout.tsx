import { Grid, GridProps } from '@chakra-ui/react';
import React, { createRef, useEffect, useState } from 'react';
import useRectObserver from '../hooks/useRectObserver';

const CardLayout: React.FC<Props> = (props) => {
  const gridRef = createRef<HTMLDivElement>();
  const width = useRectObserver(gridRef, 'width');
  const [columnRepeated, setColumnRepeated] = useState(
    Math.floor((width ?? 1080) / 320)
  );

  useEffect(() => {
    if (!width) return;

    setColumnRepeated(Math.floor((width ?? 1080) / 320));
  }, [width]);

  return (
    <Grid
      gap={4}
      templateColumns={`repeat(${columnRepeated}, 1fr)`}
      {...props}
      ref={gridRef}
    />
  );
};

type Props = Omit<GridProps, 'templateColumns'>;

export default CardLayout;
