import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  fullName: yup
    .string()
    .matches(
      /^[A-Z][a-z]*(\s[A-Z][a-z]*)+$|^[А-Я][а-я]*(\s[А-я][а-я]*)+$/gms,
      'Please enter your full name as in example: John Johnson (Іван Іващенко)',
    )
    .required('Full name is required'),
  password: yup
    .string()
    .min(12, 'Password should be of minimum 12 characters length')
    .required('Password is required'),
});

export default validationSchema;
