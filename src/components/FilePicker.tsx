import { Box, Button, ButtonProps, Input } from '@chakra-ui/react';
import React, { createRef } from 'react';

const FilePicker = ({ onChange: onChangeFromProps, accept, multiple, ...props }: Props) => {
  const filePickerRef = createRef<HTMLInputElement>();

  const onClick = () => filePickerRef?.current.click?.();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChangeFromProps(e.currentTarget.files);

  return (
    <Box position={'relative'}>
      <Button {...props} onClick={onClick} />
      <Input
        onChange={onChange}
        type={'file'}
        accept={accept}
        visibility={'hidden'}
        position={'absolute'}
        zIndex={-999}
        multiple={multiple}
        ref={filePickerRef}
      />
    </Box>
  );
};

type Props = Omit<ButtonProps, 'onClick' | 'onChange'> & {
  onChange: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
};

export default FilePicker;
