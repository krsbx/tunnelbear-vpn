import { Button, ButtonProps, Flex, GridItem, Text } from '@chakra-ui/react';
import React from 'react';

const VPNConfigCard = ({ config, ...props }: FCWithChild<Props>) => {
  const createName = () => {
    const name = config.name.split('.');
    // Remove extensions
    name.pop();

    return name.join();
  };

  return (
    <GridItem>
      <Flex width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Button {...props} width={'20rem'} height={'10rem'} borderRadius={'xl'}>
          <Text>{createName()}</Text>
        </Button>
      </Flex>
    </GridItem>
  );
};

type Props = Omit<ButtonProps, 'width' | 'height' | 'borderRadius'> & {
  config: VPNConfig;
};

export default VPNConfigCard;
