import { Box, BoxProps, Button, Flex, GridItem, Text } from '@chakra-ui/react';
import React, { createRef, useMemo, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import useConfigData from '../hooks/useConfigData';
import useOnHover from '../hooks/useOnHover';
import useOpenVpn from '../hooks/useOpenVpn';
import useReadWriteIpcEvent from '../hooks/useReadWriteIpcEvent';
import useStorage from '../hooks/useStorage';

const VpnCard: React.FC<Props> = ({ config, ...props }) => {
  const { configImagePath, configName, dirPath } = useConfigData(config);
  const { readFile } = useReadWriteIpcEvent();
  const { connectOpenVpn } = useOpenVpn();
  const [isOnHover, setIsOnHover] = useState(false);
  const { deleteStorage } = useStorage();
  const cardRef = createRef<HTMLDivElement>();

  useOnHover(
    cardRef,
    () => setIsOnHover(true),
    () => setIsOnHover(false)
  );

  const onClickOnCard = async () => {
    const contents = (await readFile(config.path)).split('\n');

    return connectOpenVpn(dirPath, contents);
  };

  const onClickOnCross = () =>
    deleteStorage(config.name.replace(/.ovpn/g, '').replace(/.txt/g, ''));

  return (
    <GridItem>
      <Flex
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        position={'relative'}
      >
        <Box
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
        </Box>
        <Text
          position={'absolute'}
          translateX={'-50%'}
          translateY={'-50%'}
          color={'white'}
          pointerEvents={'none'}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          userSelect={'none'}
        >
          {configName}
        </Text>
      </Flex>
    </GridItem>
  );
};

type Props = Omit<BoxProps, 'width' | 'height'> & {
  config: Tunnelbear.VpnConfig;
};

export default VpnCard;
