import { Flex, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import MapView from './components/MapView';
import Credentials from './components/modals/Credentials';
import ProcessingOverlay from './components/ProcessingOverlay';
import StatusBar from './components/StatusBar';
import TopBar from './components/TopBar';
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
      flexDirection={'column'}
      position={'relative'}
      overflow={'hidden'}
    >
      <TopBar onOpen={onOpen} />
      <StatusBar />
      <MapView />
      <ProcessingOverlay />
      <Credentials isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default App;
