/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SupplierCreateFormInputValues = {
    name?: string;
    owner?: string;
    phone?: string;
    location?: string;
};
export declare type SupplierCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SupplierCreateFormOverridesProps = {
    SupplierCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SupplierCreateFormProps = React.PropsWithChildren<{
    overrides?: SupplierCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SupplierCreateFormInputValues) => SupplierCreateFormInputValues;
    onSuccess?: (fields: SupplierCreateFormInputValues) => void;
    onError?: (fields: SupplierCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SupplierCreateFormInputValues) => SupplierCreateFormInputValues;
    onValidate?: SupplierCreateFormValidationValues;
} & React.CSSProperties>;
export default function SupplierCreateForm(props: SupplierCreateFormProps): React.ReactElement;
