import { useMemo } from 'react';

const useConfigData = (config: Tunnelbear.VpnConfig) => {
  const configResult = useMemo(() => {
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

  return configResult;
};

export default useConfigData;
