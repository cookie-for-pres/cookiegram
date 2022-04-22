import { darken } from '@chakra-ui/theme-tools';

const ButtonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: () => ({
      bg: 'primary',
      color: 'white',
      _hover: {
        bg: darken('primary', 5),
      },
      _active: {
        bg: darken('primary', 5),
      }
    }),
    secondary: () => ({
      bg: 'transparent',
      color: 'white',
      _hover: {
        color: 'primary'
      },
      _active: {
        color: 'primary'
      }
    }),
  },
  defaultProps: {}
};

export default ButtonStyles;