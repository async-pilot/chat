import * as Yup from "yup";

import { RegisterFormFields } from "./types";

export const validationSchema = Yup.object<RegisterFormFields>().shape({
  email: Yup.string().email().required(),
  name: Yup.string().required(),
  username: Yup.string().required(),
  password: Yup.string().min(8).required(),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")])
    .required(),
});
