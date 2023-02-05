import { Button, ButtonProps, Flex, GridItem, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';

const VpnCard: React.FC<Props> = ({ config, ...props }) => {
  const { configName, configImagePath } = useMemo(() => {
    const names = config.name.split('.');

    names.pop();

    const configName = names.join('.');

    const configImagePath = `/images/flags/${configName.replace(
      /TunnelBear /g,
      ''
    )}.svg`;

    return {
      configName,
      configImagePath,
    };
  }, [config.name, config.path]);

  return (
    <GridItem>
      <Flex width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Button
          {...props}
          width={'20rem'}
          height={'10rem'}
          borderRadius={'xl'}
          backgroundImage={configImagePath}
          backgroundSize={'cover'}
          backgroundPosition={'center'}
          fontWeight={'semibold'}
          _hover={{
            backgroundImage: configImagePath,
            opacity: 0.7,
            fontWeight: 'bold',
          }}
        >
          <Text>{configName}</Text>
        </Button>
      </Flex>
    </GridItem>
  );
};

type Props = Omit<ButtonProps, 'width' | 'height'> & {
  config: Tunnelbear.VpnConfig;
};

export default VpnCard;
