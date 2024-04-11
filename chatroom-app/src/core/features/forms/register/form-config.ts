import { FormikConfig, FormikHelpers } from "formik";

import { initialValues } from "./initial-values";
import { RegisterFormFields } from "./types";
import { validationSchema } from "./validations";

export type FormConfigProps = {
  onSubmit: (values: RegisterFormFields, formikHelpers: FormikHelpers<RegisterFormFields>) => void | Promise<any>;
};

const formConfig = ({ onSubmit }: FormConfigProps): FormikConfig<RegisterFormFields> => ({
  initialValues,
  validationSchema,
  onSubmit,
});

export default formConfig;
