import { Grid, GridProps, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

const GridLayout = (props: FCWithChild<Omit<GridProps, 'templateColumns'>>) => {
  const columnRepeated = useBreakpointValue([1, 2, 3, 4]);

  return <Grid gap={4} templateColumns={`repeat(${columnRepeated}, 1fr)`} {...props} />;
};

export default GridLayout;
