import { ErrorMessage, Field, Formik, Form } from 'formik'; // Imports Formik components for form handling and validation
import React, { useState } from 'react'; // Imports React to use JSX and create components
import * as Yup from 'yup'; // Imports Yup for schema-based form validation
import Spinner from '../components/Spinner'; // Custom spinner component to show loading
import { dialog, showErrorDialog, showSuccessDialog } from '../dialogs/dialogs'; // Custom dialogs for showing success/error messages
import { authentication } from '../services/Authentication-Service'; // Authentication service for registering user
import { useNavigate } from 'react-router-dom'; // For navigation after form submission
import { UserTypeForCreatingNewUser } from "../@types";  // Assuming correct import for UserTypeForCreatingNewUser

// Function component for creating a new user
function CreateNewUserPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Defining a Yup validation schema for form fields, consistent with C# model constraints
  const validateSchema1 = Yup.object({
    username: Yup.string()
      .min(2, 'Username must be at least 2 characters')
      .max(50, 'Username cannot exceed 50 characters') // Match C# validation max length
      .required('Username is required'),

    email: Yup.string()
      .email('Invalid email format.')
      .max(100, 'Email cannot exceed 100 characters') // Match C# validation max length
      .required('Email is required'),

    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password cannot exceed 20 characters') 
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,20}$/,
        'Password must contain an uppercase letter, a number, and a special character'
      )
      .required('Password is required'),

    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  // Initial values for form fields
  const initialValues1 = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Formik form handling with validation
  return (
    <Formik
  initialValues={initialValues1}
  validationSchema={validateSchema1}
  onSubmit={(values) => {
    setIsLoading(true);
    authentication
      .register(values.email, values.username, values.password)
      .then((response) => {
        showSuccessDialog('Registration Successful').then(() => {
          navigate('/users');
        });
      })
      .catch((error) => {
        if (error.response.data === 'This email is already registered.') {
          // Set the email duplicate error message to show under the email field
          setError('The email address is already in use. Please try a different one.');
        } else {
          showErrorDialog('Registration Failed' + error.response.data );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }}
>
<div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
<div className="card shadow-lg dark:bg-gray-700 dark:text-gray-200 bg-gray-100 w-full max-w-4xl">
  <Form className="container mx-auto py-8 dark:bg-gray-700 bg-gray-400 text-black-400 dark:text-black-200">
    {isLoading && <Spinner />}
    
    {/* Conditional rendering of error message */}
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
      {/* Show duplicate email error message */}
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
  </div>
  </div>
</Formik>

  );
}

export default CreateNewUserPage;
