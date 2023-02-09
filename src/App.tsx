import { Flex, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import Credentials from './components/modals/Credentials';
import ProcessingOverlay from './components/ProcessingOverlay';
import StatusBar from './components/StatusBar';
import TopBar from './components/TopBar';
import VpnSelection from './components/VpnSelection';
import useAppStateListener from './hooks/useAppStateListener';
import useStoragePopulator from './hooks/useStoragePopulator';

const App: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  useStoragePopulator();
  useAppStateListener();

  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      rowGap={2}
      flexDirection={'column'}
      position={'relative'}
      overflow={'hidden'}
    >
      <TopBar onOpen={onOpen} />
      <StatusBar />
      <VpnSelection />
      <ProcessingOverlay />
      <Credentials isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default App;
