import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import validationSchema from './validation';
import PasswordField from '../PasswordField/PasswordField';
import toast from 'react-hot-toast';
import { registerUser } from 'redux/auth/authOperations';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      passwordRepeat: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values.password !== values.passwordRepeat) {
        toast('Password do not match');
        return;
      }
      const userInfo = {
        name: values.fullName,
        email: values.email,
        password: values.password,
      };
      dispatch(registerUser(userInfo));
      resetForm();
    },
  });

  function handleClickShowPassword() {
    setShowPassword(prevState => {
      return !prevState;
    });
  }
  function handleClickShowPasswordRepeat() {
    setShowPasswordRepeat(prevState => {
      return !prevState;
    });
  }

  return (
    <>
      <Typography variant="h3" mt={5} textAlign="center">
        Register
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{ width: '500px', margin: '0 auto' }}
      >
        <TextField
          disabled={formik.isSubmitting}
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          disabled={formik.isSubmitting}
          fullWidth
          id="fullName"
          name="fullName"
          label="Full name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
          style={{ marginTop: '10px' }}
        />
        <PasswordField
          label="Password"
          id="password"
          isSubmitting={formik.isSubmitting}
          showPassword={showPassword}
          value={formik.values.password}
          onChange={formik.handleChange}
          handleClickShowPassword={handleClickShowPassword}
          formikToched={formik.touched.password}
          formikErrors={formik.errors.password}
          style={{ marginTop: '10px' }}
        />
        <PasswordField
          label="Repeat password"
          id="passwordRepeat"
          isSubmitting={formik.isSubmitting}
          showPassword={showPasswordRepeat}
          value={formik.values.passwordRepeat}
          onChange={formik.handleChange}
          handleClickShowPassword={handleClickShowPasswordRepeat}
          formikToched={formik.touched.password}
          formikErrors={formik.errors.password}
        />
        <Button
          style={{ marginTop: '10px' }}
          disabled={formik.isSubmitting}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          register
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
