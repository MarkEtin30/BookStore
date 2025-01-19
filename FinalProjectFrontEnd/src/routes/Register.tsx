import { ErrorMessage, Field, Formik, Form } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import Spinner from '../components/Spinner';
import { dialog, showErrorDialog, showSuccessDialog } from '../dialogs/dialogs';
import { authentication } from '../services/Authentication-Service';
import { useNavigate } from 'react-router-dom';

function Register() {
  const validateSchema1 = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password cannot exceed 20 characters')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,20}$/,
        'Password must contain an uppercase letter, a number, and a special character'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const initialValues1 = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const navigatie = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-black-400">
      <div className="card shadow-lg dark:bg-gray-700 dark:text-black-400 bg-gray-100 w-full max-w-4xl rounded-lg">
        <Formik
          initialValues={initialValues1}
          validationSchema={validateSchema1}
          onSubmit={(values) => {
            setIsLoading(true);

            authentication
              .register(values.email, values.username, values.password)
              .then((response) => {
                showSuccessDialog('Registration Successful').then(() => {
                  navigatie('/login');
                });
              })
              .catch((error) => {
                // Check for network error
                if (error.message === 'Network Error') {
                  setError('No internet connection. Please check your connection and try again.');
                  showErrorDialog('Network Error: No Connection');
                } else {
                  // Handle other errors like duplicate email or server-side issues
                  if (error.response?.data === 'This email is already registered.') {
                    setError('The email address is already in use. Please try a different one.');
                  } else {
                    setError(error.response?.data || 'Registration Failed');
                    showErrorDialog('Registration Failed');
                  }
                }
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
        >
          <Form className="container mx-auto py-8 dark:bg-gray-700 bg-gray-400 text-black-400 dark:text-black-200">
            {isLoading && <Spinner />}

            {/* Display the error message if there is one */}
            {error && <p className="text-danger">{error}</p>}

            {/* Username field */}
            <div className="mb-3 w-100">
              <label htmlFor="username" className="form-label">Username</label>
              <Field name="username" type="text" id="username" className="form-control" />
              <ErrorMessage name="username" component="div" className="text-danger small" />
            </div>

            {/* Email field */}
            <div className="mb-3 w-100">
              <label htmlFor="email" className="form-label">Email Address</label>
              <Field name="email" type="email" id="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger small" />
              {error && error.includes('email address') && (
                <div className="text-danger small">{error}</div>
              )}
            </div>

            {/* Password field */}
            <div className="mb-3 w-100">
              <label htmlFor="password" className="form-label">Password</label>
              <Field name="password" type="password" id="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger small" />
            </div>

            {/* Confirm Password field */}
            <div className="mb-3 w-100">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <Field name="confirmPassword" type="password" id="confirmPassword" className="form-control" />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger small" />
            </div>

            <button disabled={isLoading} type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Register;
