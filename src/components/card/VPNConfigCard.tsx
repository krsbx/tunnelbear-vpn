import { Button, ButtonProps, Flex, GridItem } from '@chakra-ui/react';
import React from 'react';

const VPNConfigCard = (props: FCWithChild<Props>) => {
  return (
    <GridItem>
      <Flex width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Button {...props} width={'20rem'} height={'10rem'} borderRadius={'xl'} />
      </Flex>
    </GridItem>
  );
};

type Props = Omit<ButtonProps, 'width' | 'height' | 'borderRadius'> & {
  config: VPNConfig;
};

export default VPNConfigCard;
