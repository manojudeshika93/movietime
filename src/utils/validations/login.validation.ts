import * as yup from 'yup';

export const loginErrorMessages = {
  'username:required': 'Please enter a Username',
  'password:required': 'Please enter a Password',
};

export const loginValidationSchema = yup
  .object({
    username: yup.string().required(loginErrorMessages['username:required']),
    password: yup.string().required(loginErrorMessages['password:required']),
  })
  .required();
