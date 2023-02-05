import { Button, ButtonProps, Flex, GridItem, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import useOpenVpn from '../hooks/useOpenVpn';
import useReadWriteIpcEvent from '../hooks/useReadWriteIpcEvent';

const VpnCard: React.FC<Props> = ({ config, ...props }) => {
  const { readFile } = useReadWriteIpcEvent();
  const { connectOpenVpn, disconnectOpenVpn } = useOpenVpn();

  const { configName, configImagePath, dirPath } = useMemo(() => {
    const names = config.name.split('.');

    names.pop();

    const configName = names.join('.');

    const configImagePath = `/images/flags/${configName.replace(
      /TunnelBear /g,
      ''
    )}.svg`;

    const paths = config.path.split('/');

    paths.pop();

    const dirPath = paths.join('/');

    return {
      configName,
      configImagePath,
      dirPath,
    };
  }, [config.name, config.path]);

  const onClickOnCard = async () => {
    const contents = (await readFile(config.path)).split('\n');

    return connectOpenVpn(dirPath, contents);
  };

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
          onClick={onClickOnCard}
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
