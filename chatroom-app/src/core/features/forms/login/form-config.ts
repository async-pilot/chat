import { FormikConfig, FormikHelpers } from "formik";

import { initialValues } from "./initial-values";
import { LoginFormFields } from "./types";
import { validationSchema } from "./validations";

export type FormConfigProps = {
  onSubmit: (values: LoginFormFields, formikHelpers: FormikHelpers<LoginFormFields>) => void | Promise<any>;
};

const formConfig = ({ onSubmit }: FormConfigProps): FormikConfig<LoginFormFields> => ({
  initialValues,
  validationSchema,
  onSubmit,
});

export default formConfig;
