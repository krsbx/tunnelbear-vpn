import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { IoIosResize, IoMdClose } from 'react-icons/io';
import { MdMinimize } from 'react-icons/md';
import useConfigImporter from '../hooks/useConfigImporter';
import useWindowActionIpcEvent from '../hooks/useWindowActionIpcEvent';

const TopBar: React.FC<Props> = ({ onOpen }) => {
  const { closeWindow, minimizeWindow, resizeWindow } =
    useWindowActionIpcEvent();
  const importConfig = useConfigImporter();

  return (
    <Flex
      rowGap={1}
      justifyContent={'space-between'}
      width={'100%'}
      id={'custom-topbar'}
      position={'relative'}
      backgroundColor={'gray.900'}
      py={2}
      px={2}
    >
      <Stack direction={'row'} spacing={3}>
        <Button
          variant={'solid'}
          p={2}
          onClick={importConfig}
          height={'30px'}
          autoFocus={false}
        >
          Import Configs
        </Button>
        <Button
          variant={'solid'}
          p={2}
          onClick={onOpen}
          height={'30px'}
          autoFocus={false}
        >
          Configure Auth
        </Button>
      </Stack>
      <Text position={'absolute'} left={'46.7%'} top={'25%'} fontWeight={'700'}>
        Tunnelbear VPN
      </Text>
      <Stack direction={'row'} spacing={3}>
        <Button
          p={0}
          height={'30px'}
          width={'30px'}
          minWidth={0}
          onClick={minimizeWindow}
          autoFocus={false}
        >
          <MdMinimize />
        </Button>
        <Button
          p={0}
          height={'30px'}
          width={'30px'}
          minWidth={0}
          onClick={resizeWindow}
          autoFocus={false}
        >
          <IoIosResize />
        </Button>
        <Button
          p={0}
          height={'30px'}
          width={'30px'}
          minWidth={0}
          onClick={closeWindow}
          autoFocus={false}
        >
          <IoMdClose />
        </Button>
      </Stack>
    </Flex>
  );
};

type Props = {
  onOpen: () => void;
};

export default TopBar;
