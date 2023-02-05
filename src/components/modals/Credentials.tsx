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
import { CREDENTIALS } from '../../utils/constant';
import { credentialSchema } from '../../utils/schema';
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
    setValue,
    formState: { errors, touchedFields: touched, isSubmitting },
  } = useForm<Tunnelbear.Schema['Credential']>({
    resolver: zodResolver(credentialSchema),
  });

  const onClose = () => {
    setValue('password', '');

    onConfirmationClose();
    onCloseFromProps();
    onCreateConfirmationClose();
    onCredentialClose();
  };

  const onSubmit = (values: Tunnelbear.Schema['Credential']) => {
    store.set(CREDENTIALS.CREDENTIALS, JSON.stringify(values));

    if (!store.get(CREDENTIALS.CONFIRMATION)) {
      onCreateConfirmationOpen();

      return;
    }

    onClose();
  };

  const onConfirmationSubmit = () => {
    const credentials = store.get(CREDENTIALS.CREDENTIALS);

    if (credentials) {
      const username = JSON.parse(credentials)?.username;

      if (username) setValue('username', username);
    }

    onCredentialOpen();
  };

  useEffect(() => {
    if (!isOpen) return;

    const credentials = store.get(CREDENTIALS.CREDENTIALS);

    if (credentials && store.get(CREDENTIALS.CONFIRMATION)) {
      onConfirmationOpen();
      return;
    }

    if (credentials) {
      const username = JSON.parse(credentials)?.username;

      if (username) setValue('username', username);
    }

    onCredentialOpen();
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={credentialIsOpen} onClose={onClose} isCentered>
        <ModalOverlay>
          <ModalContent p={3}>
            <ModalHeader>
              <Text textAlign={'center'}>
                Enter your Tunneal Bear Credentials
              </Text>
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <FormControl
                    isInvalid={
                      !!errors?.username?.message && !!touched?.username
                    }
                  >
                    <FormLabel htmlFor="username">Email</FormLabel>
                    <InputGroup>
                      <Input
                        {...register('username')}
                        name={'username'}
                        variant="filled"
                        placeholder="Tunnealbear email..."
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {String(errors?.username?.message)}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      !!errors?.password?.message && !!touched?.password
                    }
                  >
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
                    <FormErrorMessage>
                      {String(errors?.password?.message)}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    variant={'solid'}
                    isLoading={isSubmitting}
                    type={'submit'}
                  >
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
        onOpen={onConfirmationSubmit}
      />
      <CreateConfirmations
        isOpen={createConfirmationIsOpen}
        onClose={onClose}
      />
    </>
  );
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default Credentials;
