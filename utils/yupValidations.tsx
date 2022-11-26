import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter valid email")
    .typeError("Email required")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password is too short")
    .typeError("Enter password")
    .required("Password is required"),
});

export const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter valid email")
    .typeError("Email required")
    .required("Email is required"),
  password: yup
    .string()
    .typeError("Enter password")
    .min(4, "Password is too short")
    .required("Password is required"),
  name: yup
    .string()
    .typeError("Name required")
    .max(100, "Name is too long")
    .required("Name is required"),
});
