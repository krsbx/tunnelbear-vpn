import { Button, ButtonProps, Flex, GridItem, Text } from '@chakra-ui/react';
import React, { createRef, useMemo, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import useOnHover from '../hooks/useOnHover';
import useOpenVpn from '../hooks/useOpenVpn';
import useReadWriteIpcEvent from '../hooks/useReadWriteIpcEvent';
import Storage from '../utils/Storage';

const VpnCard: React.FC<Props> = ({ config, ...props }) => {
  const { readFile } = useReadWriteIpcEvent();
  const { connectOpenVpn, disconnectOpenVpn } = useOpenVpn();
  const [isOnHover, setIsOnHover] = useState(false);
  const [, setRefresher] = useState(false);
  const cardRef = createRef<HTMLButtonElement>();

  useOnHover(
    cardRef,
    () => setIsOnHover(true),
    () => setIsOnHover(false)
  );

  const { configName, configImagePath, dirPath } = useMemo(() => {
    const names = config.name.replace(/.ovpn/g, '').replace(/.txt/g, '');

    const configName = names.replace(/TunnelBear /g, '');
    const configImagePath = `./images/flags/${configName.replace(
      / /g,
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

  const onClickOnCross = () => {
    Storage.instance.delete(configName);

    setRefresher((prev) => !prev);
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
          position={'relative'}
          p={0}
          ref={cardRef}
        >
          <Button
            variant={'unstyled'}
            onClick={onClickOnCard}
            width={'100%'}
            height={'100%'}
          />
          <Button
            variant={'solid'}
            p={2}
            height={'30px'}
            autoFocus={false}
            position={'absolute'}
            right={0}
            top={0}
            backgroundColor={'gray.700'}
            {...(isOnHover
              ? {
                  onClick: onClickOnCross,
                }
              : {
                  visibility: 'hidden',
                })}
          >
            <IoMdClose />
          </Button>
        </Button>
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
