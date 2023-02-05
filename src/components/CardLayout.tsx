import { Grid, GridProps, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

const CardLayout: React.FC<Props> = (props) => {
  const columnRepeated = useBreakpointValue([1, 1, 2, 3, 4]);

  return (
    <Grid
      gap={4}
      templateColumns={`repeat(${columnRepeated}, 1fr)`}
      {...props}
    />
  );
};

type Props = Omit<GridProps, 'templateColumns'>;

export default CardLayout;
