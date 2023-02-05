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
import { CREDENTIALS } from '../../utils/constant';
import { passwordSchema } from '../../utils/schema';
import Form from '../Form';

const Confirmations = ({ isOpen, onClose, onOpen }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, touchedFields: touched, isSubmitting },
  } = useForm<Tunnelbear.Schema['Password']>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (values: Tunnelbear.Schema['Password']) => {
    const password = store.get(CREDENTIALS.CONFIRMATION);

    if (!password) {
      reset();
      onOpen();
      onClose();
      return;
    }

    if (password !== values.password) return;

    reset();
    onOpen();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay>
        <ModalContent p={3}>
          <ModalHeader>
            <Text textAlign={'center'}>Your confirmation required</Text>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl
                  isInvalid={!!errors?.password?.message && !!touched?.password}
                >
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
                  <FormErrorMessage>
                    {String(errors?.password?.message)}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  variant={'solid'}
                  isLoading={isSubmitting}
                  type={'submit'}
                >
                  Proceed To Editing
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
  onOpen: () => void;
};

export default Confirmations;
