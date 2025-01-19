import { ErrorMessage, Field, Formik, Form } from 'formik';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import Spinner from '../components/Spinner';
import { dialog, showErrorDialog, showSuccessDialog } from '../dialogs/dialogs';
import { authentication } from '../services/Authentication-Service';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import { getRoleToUser, getUserById, getUserIdFromJwt } from '../services/Users-Service';

function Login() {
  const validateSchema1 = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password cannot exceed 20 characters')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,20}$/,
        'Password must contain an uppercase letter, a number, and a special character'
      )
      .required('Password is required'),
  });

  const initialValues1 = {
    email: '',
    password: '',
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Updated to handle errors
  const navigate = useNavigate();
  const authenticationContext1 = useContext(AuthenticationContext);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-black-400">
      <div className="card shadow-lg dark:bg-gray-700 dark:text-black-400 bg-gray-100 w-full max-w-4xl rounded-lg">
        <Formik
          initialValues={initialValues1}
          validationSchema={validateSchema1}
          onSubmit={(o) => {
            setIsLoading(true);
            setError(null); // Clear previous errors before submitting

            authentication
              .login(o.email, o.password)
              .then(async (response1) => {
                const userId = await getUserIdFromJwt();
                const user = await getUserById(userId);

                // Fetch the roles separately
                const roles = await getRoleToUser(userId);

                // Defensive check for roles
                const role = roles?.[0] || 'No Role Assigned'; // Use the first role or default value

                authenticationContext1.login(response1.data.token, role);

                showSuccessDialog('Login Successful').then(() => {
                  navigate('/');
                });
              })
              .catch((err) => {
                if (err.message === 'Network Error') {
                  // Specific error handling for no internet connection
                  setError('No internet connection. Please check your connection and try again.');
                  showErrorDialog('Network Error: No Connection');
                } else {
                  // Generic error handling
                  setError(err.response?.data?.message || 'Login Failed');
                  showErrorDialog('Login Failed');
                }
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
        >
          <Form className="container mx-auto py-8 dark:bg-gray-700 bg-gray-400 text-white-500 dark:text-gray-400">
            {isLoading && <Spinner />}

            {error && <p className="text-danger">{error}</p>}

            <div className="form-group w-100">
              <label htmlFor="email" className="form-label">Email Address</label>
              <Field
                name="email"
                type="email"
                id="email"
                className="form-control"
              />
              <ErrorMessage name="email" component="div" className="text-danger small" />
            </div>

            <div className="form-group w-100">
              <label htmlFor="password" className="form-label">Password</label>
              <Field
                name="password"
                type="password"
                id="password"
                className="form-control"
              />
              <ErrorMessage name="password" component="div" className="text-danger small" />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary w-100 py-2 mt-3"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
