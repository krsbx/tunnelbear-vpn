import { chakra } from '@chakra-ui/react';
import React from 'react';

const _Form = chakra('form');

const Form = React.forwardRef<HTMLFormElement, Parameters<typeof _Form>['0']>(
  ({ children, ...props }, ref) => (
    <_Form {...props} ref={ref}>
      {children}
    </_Form>
  )
);

Form.displayName = 'Chakra-Form';

export default Form;
