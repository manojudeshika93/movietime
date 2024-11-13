import * as yup from 'yup';

export const loginErrorMessages = {
  'mobileNumber:required': 'Please enter a Password',
  'password:required': 'Please enter a Password',
};

export const loginValidationSchema = yup
  .object({
    mobileNumber: yup.string().required(loginErrorMessages['mobileNumber:required']),
    password: yup.string().required(loginErrorMessages['password:required']),
  })
  .required();
