import { Flex, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import CardLayout from './components/CardLayout';
import Credentials from './components/modals/Credentials';
import TopBar from './components/TopBar';
import VpnCard from './components/VpnCard';
import useAppContext from './hooks/useAppContext';
import useAppStateListener from './hooks/useAppStateListener';
import useStoragePopulator from './hooks/useStoragePopulator';

const App: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    state: { isProcessing, vpns },
  } = useAppContext();

  useStoragePopulator();
  useAppStateListener();

  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      rowGap={2}
      p={2}
      flexDirection={'column'}
    >
      <TopBar onOpen={onOpen} />
      <CardLayout
        overflow={isProcessing ? 'hidden' : 'auto'}
        backgroundColor={'gray.800'}
        position={'relative'}
      >
        {_(vpns)
          .sortBy(['name'])
          .map((value, key) => <VpnCard config={value} key={key} />)
          .value()}
        {isProcessing ? (
          <Flex
            position={'absolute'}
            width={'100%'}
            height={'100%'}
            backgroundColor={'blackAlpha.600'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            rowGap={4}
            top={0}
          >
            <Text fontWeight={'bold'} fontSize={'1.25rem'}>
              Connecting...
            </Text>
            <Spinner size={'xl'} />
          </Flex>
        ) : null}
      </CardLayout>
      <Credentials isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default App;
