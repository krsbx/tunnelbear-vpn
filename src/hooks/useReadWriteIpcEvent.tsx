import { EncodingOption } from 'fs-extra';
import { useCallback } from 'react';
import { JsonObject } from 'type-fest';
import { READ_WRITE } from '../utils/enums/ipc.read-write';

const useReadWriteIpcEvent = () => {
  const readJsonFile = useCallback((filePath: string) => {
    return window.ipcRenderer.invoke(
      READ_WRITE.READ_JSON_FILE,
      filePath
    ) as Promise<JsonObject>;
  }, []);

  const readFile = useCallback(
    (filePath: string, encoding: EncodingOption = 'utf-8') => {
      return window.ipcRenderer.invoke(
        READ_WRITE.READ_FILE,
        filePath,
        encoding
      ) as Promise<string>;
    },
    []
  );

  const writeFile = useCallback((filePath: string, content: string) => {
    return window.ipcRenderer.invoke(
      READ_WRITE.WRITE_FILE,
      filePath,
      content
    ) as Promise<void>;
  }, []);

  const exists = useCallback((filePath: string) => {
    return window.ipcRenderer.invoke(
      READ_WRITE.EXISTS,
      filePath
    ) as Promise<boolean>;
  }, []);

  const copy = useCallback((filePath: string, destPath: string) => {
    return window.ipcRenderer.invoke(READ_WRITE.COPY, filePath, destPath);
  }, []);

  const move = useCallback((filePath: string, destPath: string) => {
    return window.ipcRenderer.invoke(READ_WRITE.MOVE, filePath, destPath);
  }, []);

  return {
    readJsonFile,
    readFile,
    writeFile,
    exists,
    copy,
    move,
  };
};

export default useReadWriteIpcEvent;
