import * as Yup from "yup";

import { LoginFormFields } from "./types";

export const validationSchema = Yup.object<LoginFormFields>().shape({
  identity: Yup.string().required('Поле "Username" обязательно для заполнения'),
  password: Yup.string().required('Поле "Password" обязательно для заполнения'),
});
