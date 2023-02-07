import { useState } from 'react';
import Storage from '../utils/Storage';
import useDialogIpcEvent from './useDialogIpcEvent';

const useConfigImporter = () => {
  const [, setRefresher] = useState(false);
  const { showOpenDialog } = useDialogIpcEvent();

  const importConfig = async () => {
    const result = await showOpenDialog({
      properties: ['multiSelections'],
    });

    if (result.canceled) return;

    result.filePaths.forEach((filePath) => {
      const fileName = filePath.split('/').pop();

      if (!fileName) return;

      const fileNameNoExt = fileName.replace(/.ovpn/g, '').replace(/.txt/g, '');

      Storage.instance.set(fileNameNoExt ?? fileName, {
        name: fileName,
        path: filePath,
      });
    });

    setRefresher((prev) => !prev);
  };

  return importConfig;
};

export default useConfigImporter;
