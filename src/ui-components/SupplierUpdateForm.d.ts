/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Supplier } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SupplierUpdateFormInputValues = {
    name?: string;
    owner?: string;
    phone?: string;
    location?: string;
};
export declare type SupplierUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SupplierUpdateFormOverridesProps = {
    SupplierUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SupplierUpdateFormProps = React.PropsWithChildren<{
    overrides?: SupplierUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    supplier?: Supplier;
    onSubmit?: (fields: SupplierUpdateFormInputValues) => SupplierUpdateFormInputValues;
    onSuccess?: (fields: SupplierUpdateFormInputValues) => void;
    onError?: (fields: SupplierUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SupplierUpdateFormInputValues) => SupplierUpdateFormInputValues;
    onValidate?: SupplierUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SupplierUpdateForm(props: SupplierUpdateFormProps): React.ReactElement;
