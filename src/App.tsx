import { Button, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { IoIosResize, IoMdClose } from 'react-icons/io';
import { MdMinimize } from 'react-icons/md';
import CardLayout from './components/CardLayout';
import Credentials from './components/modals/Credentials';
import VpnCard from './components/VpnCard';
import useConfigImporter from './hooks/useConfigImporter';
import Storage from './utils/Storage';

const App: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const importConfig = useConfigImporter();

  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      rowGap={2}
      p={2}
      flexDirection={'column'}
    >
      <Flex
        rowGap={1}
        justifyContent={'space-between'}
        width={'100%'}
        id={'custom-topbar'}
      >
        <Stack direction={'row'} spacing={3}>
          <Button
            variant={'solid'}
            p={2}
            onClick={importConfig}
            fontSize={'10px'}
            height={'30px'}
          >
            Import Configs
          </Button>
          <Button
            variant={'solid'}
            p={2}
            onClick={onOpen}
            fontSize={'10px'}
            height={'30px'}
          >
            Configure Auth
          </Button>
        </Stack>

        <Stack direction={'row'} spacing={3}>
          <Button p={0} height={'30px'} width={'30px'} minWidth={0}>
            <MdMinimize />
          </Button>
          <Button p={0} height={'30px'} width={'30px'} minWidth={0}>
            <IoIosResize />
          </Button>
          <Button p={0} height={'30px'} width={'30px'} minWidth={0}>
            <IoMdClose />
          </Button>
        </Stack>
      </Flex>
      <CardLayout overflow={'auto'}>
        {_.map(Storage.instance.storage, (value, key) => (
          <VpnCard config={value} key={key} />
        ))}
      </CardLayout>
      <Credentials isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default App;
