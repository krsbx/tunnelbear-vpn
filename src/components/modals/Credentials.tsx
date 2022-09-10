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
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import store from 'store';
import z from 'zod';
import { CREDENTIALS } from '../../utils/constant/global';
import Form from '../Form';
import Confirmations from './Confirmations';
import CreateConfirmations from './CreateConfirmations';

const Credentials = ({ isOpen, onClose: onCloseFromProps }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    isOpen: credentialIsOpen,
    onClose: onCredentialClose,
    onOpen: onCredentialOpen,
  } = useDisclosure();

  const {
    isOpen: confirmationIsOpen,
    onClose: onConfirmationClose,
    onOpen: onConfirmationOpen,
  } = useDisclosure();

  const {
    isOpen: createConfirmationIsOpen,
    onClose: onCreateConfirmationClose,
    onOpen: onCreateConfirmationOpen,
  } = useDisclosure();

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields: touched, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(
      z.object({
        username: z.string().min(1),
        password: z.string().min(0),
      })
    ),
  });

  const onClose = () => {
    onConfirmationClose();
    onCloseFromProps();
    onCreateConfirmationClose();
    onCredentialClose();
  };

  const onSubmit = (values: { username: string; password: string }) => {
    store.set(CREDENTIALS.CREDENTIALS, JSON.stringify(values));

    if (!store.get(CREDENTIALS.CONFIRMATION)) {
      onCreateConfirmationOpen();

      return;
    }

    onCredentialClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    if (store.get(CREDENTIALS.CREDENTIALS) && store.get(CREDENTIALS.CONFIRMATION)) {
      onConfirmationOpen();
      return;
    }

    const credentials = store.get(CREDENTIALS.CREDENTIALS);

    if (credentials) {
      const username = JSON.parse(credentials)?.username;

      if (username) setValue('username', username);
    }

    onCredentialOpen();
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={credentialIsOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <Text textAlign={'center'}>Enter your Tunneal Bear Credentials</Text>
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <FormControl isInvalid={!!errors?.username?.message && !!touched?.username}>
                    <FormLabel htmlFor="username">Email</FormLabel>
                    <InputGroup>
                      <Input
                        {...register('username')}
                        name={'username'}
                        variant="filled"
                        placeholder="Tunnealbear email..."
                      />
                    </InputGroup>
                    <FormErrorMessage>{String(errors?.username?.message)}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors?.password?.message && !!touched?.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup>
                      <Input
                        {...register('password')}
                        type={isPasswordVisible ? 'text' : 'password'}
                        name={'password'}
                        variant="filled"
                        placeholder="Tunnealbear Password..."
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
                    Save My Credentials
                  </Button>
                </Stack>
              </Form>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <Confirmations
        isOpen={confirmationIsOpen}
        onClose={onConfirmationClose}
        onOpen={onCredentialOpen}
      />
      <CreateConfirmations isOpen={createConfirmationIsOpen} onClose={onClose} />
    </>
  );
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default Credentials;
