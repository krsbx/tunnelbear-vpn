import { Flex, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import CardLayout from './components/CardLayout';
import Credentials from './components/modals/Credentials';
import TopBar from './components/TopBar';
import VpnCard from './components/VpnCard';
import Storage from './utils/Storage';

const App: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      rowGap={2}
      p={2}
      flexDirection={'column'}
    >
      <TopBar onOpen={onOpen} />
      <CardLayout overflow={'auto'} backgroundColor={'gray.800'}>
        {_.map(Storage.instance.storage, (value, key) => (
          <VpnCard config={value} key={key} />
        ))}
      </CardLayout>
      <Credentials isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default App;
