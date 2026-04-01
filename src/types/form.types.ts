/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ZodType } from "zod";



export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "file"
  | "switch"
  | "checkbox"
  | "radio"
  | "textEditor"
  | "media"
  | "tag"
  | "category";



export interface IFields {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: FieldType;
  className?: string;
  row?: string[];
  options?: any;
  defaultCategory?: string;
  icon?: React.ReactNode;
}

export interface IForm {
  fields: IFields[];
  formSchema: ZodType<any, any>;
  defaultValues?: Record<string, any>;
  onSubmit: (data: any) => void;
  headerTitle: string;
  headerDescription: string;
  containerClassName: string;
  footer?: React.ReactNode;
  buttonTitle: string;
}