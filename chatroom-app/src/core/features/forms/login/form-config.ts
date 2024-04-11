import { FormikConfig, FormikHelpers } from "formik";
import { LoginFormFields } from "./types";
import { validationSchema } from "./validations";
import { initialValues } from "./initial-values";

export type FormConfigProps = {
  onSubmit: (values: LoginFormFields, formikHelpers: FormikHelpers<LoginFormFields>) => void | Promise<any>;
};

const formConfig = ({ onSubmit }: FormConfigProps): FormikConfig<LoginFormFields> => ({
  initialValues,
  validationSchema,
  onSubmit,
});

export default formConfig;
