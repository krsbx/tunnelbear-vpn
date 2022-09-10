import { Button, Flex, Stack } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useState } from 'react';
import GithubCorner from 'react-github-corner';
import store from 'store';
import VPNConfigCard from './components/card/VPNConfigCard';
import FilePicker from './components/FilePicker';
import GridLayout from './components/layout/GridLayout';
import Credentials from './components/modals/Credentials';
import useRenderRefresher from './hooks/useRenderRefresher';
import { CREDENTIALS } from './utils/constant/global';
import Storage from './utils/storage';
import VPN from './utils/vpn';

const App = () => {
  const refreshRender = useRenderRefresher();

  const [isCredentialOpen, setIsCredentialOpen] = useState(false);

  const onChange = (files: FileList | null) => {
    if (!files || _.isEmpty(files)) return;

    _.forEach(files, (file) => {
      Storage.instance.set(file.name, {
        name: file.name,
        path: file.path,
      });
    });

    refreshRender();
  };

  const onCredentialClose = () => setIsCredentialOpen(false);
  const onCredentialOpen = () => setIsCredentialOpen(true);

  const onClickOnCards = (config: VPNConfig) => () => {
    const credentials = store.get(CREDENTIALS.CREDENTIALS);

    if (!credentials) return;

    VPN.instance.connect(config.path, JSON.parse(credentials));
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
        <FilePicker variant={'solid'} p={3} onChange={onChange} accept={'.ovpn'} multiple>
          Import Configs
        </FilePicker>
        <Button variant={'solid'} p={3} onClick={onCredentialOpen}>
          Configure Auth
        </Button>
      </Stack>
      <GridLayout>
        {_.map(Storage.instance.storage, (value, key) => (
          <VPNConfigCard config={value} key={key} onClick={onClickOnCards(value)} />
        ))}
      </GridLayout>
      <Credentials isOpen={isCredentialOpen} onClose={onCredentialClose} />
      <GithubCorner
        href="https://github.com/krsbx/tunnelbear-vpn"
        target="_blank"
        bannerColor="#08979c"
        size={60}
        svgStyle={{ bottom: 0, top: 'unset', transform: 'rotate(90deg)', zIndex: 9999 }}
      />
    </Flex>
  );
};

export default App;
