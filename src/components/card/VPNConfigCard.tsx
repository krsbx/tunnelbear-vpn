import { Button, ButtonProps, Flex, GridItem, Text } from '@chakra-ui/react';
import React from 'react';
import { APP_NAME } from '../../utils/constant/global';

const { isDev } = window[APP_NAME];

const VPNConfigCard = ({ config, ...props }: FCWithChild<Props>) => {
  const createName = () => {
    const name = config.name.split('.');
    // Remove extensions
    name.pop();

    return name.join();
  };

  const getImagePath = () => {
    const path = isDev ? '/images/flags' : 'static://images/flags';

    const name = createName().replace('TunnelBear ', '');

    return `${path}/${name}.svg`;
  };

  return (
    <GridItem>
      <Flex width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Button
          {...props}
          width={'20rem'}
          height={'10rem'}
          borderRadius={'xl'}
          backgroundImage={getImagePath()}
          backgroundSize={'cover'}
          backgroundPosition={'center'}
          fontWeight={'semibold'}
          _hover={{
            backgroundImage: getImagePath(),
            opacity: 0.7,
            fontWeight: 'bold',
          }}
        >
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
