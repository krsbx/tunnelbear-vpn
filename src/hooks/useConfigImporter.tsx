import useDialogIpcEvent from './useDialogIpcEvent';
import useStorage from './useStorage';

const useConfigImporter = () => {
  const { setStorage } = useStorage();
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

      setStorage(fileNameNoExt ?? fileName, {
        name: fileName,
        path: filePath,
      });
    });
  };

  return importConfig;
};

export default useConfigImporter;
