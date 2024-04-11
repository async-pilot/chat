import { LucideIcon } from "lucide-react";
import { InputHTMLAttributes } from "react";

export interface IFieldProps {
  placeholder: string;
  Icon?: LucideIcon;
}

export type TypeInputProps = InputHTMLAttributes<HTMLInputElement> & IFieldProps;
