import { Button, ButtonProps, Flex, GridItem, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import useOpenVpn from '../hooks/useOpenVpn';
import useReadWriteIpcEvent from '../hooks/useReadWriteIpcEvent';

const VpnCard: React.FC<Props> = ({ config, ...props }) => {
  const { readFile } = useReadWriteIpcEvent();
  const { connectOpenVpn, disconnectOpenVpn } = useOpenVpn();

  const { configName, configImagePath, dirPath } = useMemo(() => {
    const names = config.name.replace(/.ovpn/g, '').replace(/.txt/g, '');

    const configName = names.replace(/TunnelBear /g, '');
    const configImagePath = `/images/flags/${configName.replace(/ /g, '')}.svg`;

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
      <Flex
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        position={'relative'}
      >
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
        />
        <Text
          position={'absolute'}
          translateX={'-50%'}
          translateY={'-50%'}
          color={'white'}
          pointerEvents={'none'}
          fontWeight={'bold'}
          textTransform={'uppercase'}
        >
          {configName}
        </Text>
      </Flex>
    </GridItem>
  );
};

type Props = Omit<ButtonProps, 'width' | 'height'> & {
  config: Tunnelbear.VpnConfig;
};

export default VpnCard;
