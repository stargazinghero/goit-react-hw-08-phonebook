import { useState } from 'react';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from '@mui/material';
import validationSchema from './validation';
import PasswordField from '../PasswordField/PasswordField';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/auth/authOperations';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const userInfo = { email: values.email, password: values.password };
      dispatch(loginUser(userInfo));
      resetForm();
    },
  });

  function handleClickShowPassword() {
    setShowPassword(prevState => {
      return !prevState;
    });
  }

  return (
    <>
      <Typography variant="h3" mt={5} textAlign="center">
        Login
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
          margin="normal"
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
        />
        <Button
          style={{ marginTop: '10px' }}
          disabled={formik.isSubmitting}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
