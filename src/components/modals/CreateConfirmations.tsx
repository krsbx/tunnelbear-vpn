import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import store from 'store';
import z from 'zod';
import { CREDENTIALS } from '../../utils/constant/global';
import Form from '../Form';

const CreateConfirmations = ({ isOpen, onClose }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields: touched, isSubmitting },
  } = useForm({
    resolver: zodResolver(
      z.object({
        password: z.string().min(3),
      })
    ),
  });

  const onSubmit = (values: { password: string }) => {
    store.set(CREDENTIALS.CONFIRMATION, values.password);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={false} closeOnOverlayClick={false}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <Text>Confirmation For Editing In The Future</Text>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl isInvalid={!!errors?.password?.message && !!touched?.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Input
                      {...register('password')}
                      type={isPasswordVisible ? 'text' : 'password'}
                      name={'password'}
                      variant="filled"
                      placeholder="Confirmation Password..."
                    />
                    <InputRightElement
                      onClick={() => setIsPasswordVisible((curr) => !curr)}
                      cursor={'pointer'}
                    >
                      {isPasswordVisible ? <FiEye /> : <FiEyeOff />}
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{String(errors?.password?.message)}</FormErrorMessage>
                </FormControl>
                <Button variant={'solid'} isLoading={isSubmitting} type={'submit'}>
                  Save My Confirmation
                </Button>
              </Stack>
            </Form>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default CreateConfirmations;
