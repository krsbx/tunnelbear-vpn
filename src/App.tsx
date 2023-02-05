import { Button, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useState } from 'react';
import GithubCorner from 'react-github-corner';
import CardLayout from './components/CardLayout';
import Credentials from './components/modals/Credentials';
import VpnCard from './components/VpnCard';
import useDialogIpcEvent from './hooks/useDialogIpcEvent';
import Storage from './utils/Storage';

const App: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [, setRefresher] = useState(false);
  const { showOpenDialog } = useDialogIpcEvent();

  const onClickOnImport = async () => {
    const result = await showOpenDialog({
      properties: ['multiSelections'],
    });

    if (result.canceled) return;

    result.filePaths.forEach((filePath) => {
      const fileName = filePath.split('/').pop();

      if (!fileName) return;

      const fileNameNoExt = fileName.split('.').shift();

      Storage.instance.set(fileNameNoExt ?? fileName, {
        name: fileName,
        path: filePath,
      });
    });

    setRefresher((prev) => !prev);
  };

  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      overflow={'auto'}
      rowGap={4}
      p={2}
      flexDirection={'column'}
    >
      <Stack direction={'row'} spacing={3}>
        <Button variant={'solid'} p={3} onClick={onClickOnImport}>
          Import Configs
        </Button>
        <Button variant={'solid'} p={3} onClick={onOpen}>
          Configure Auth
        </Button>
      </Stack>
      <CardLayout>
        {_.map(Storage.instance.storage, (value, key) => (
          <VpnCard config={value} key={key} />
        ))}
      </CardLayout>
      <Credentials isOpen={isOpen} onClose={onClose} />
      <GithubCorner
        href="https://github.com/krsbx/tunnelbear-vpn"
        target="_blank"
        bannerColor="#08979c"
        size={60}
        svgStyle={{
          bottom: 0,
          top: 'unset',
          transform: 'rotate(90deg)',
          zIndex: 9999,
        }}
      />
    </Flex>
  );
};

export default App;
