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
export declare type ItemCreateFormInputValues = {
    name?: string;
    cost_price?: number;
    sale_price?: number;
    start_stock?: number;
    stock?: number;
    bar_code?: string;
    change_price?: string;
    owner?: string;
};
export declare type ItemCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    cost_price?: ValidationFunction<number>;
    sale_price?: ValidationFunction<number>;
    start_stock?: ValidationFunction<number>;
    stock?: ValidationFunction<number>;
    bar_code?: ValidationFunction<string>;
    change_price?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ItemCreateFormOverridesProps = {
    ItemCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    cost_price?: PrimitiveOverrideProps<TextFieldProps>;
    sale_price?: PrimitiveOverrideProps<TextFieldProps>;
    start_stock?: PrimitiveOverrideProps<TextFieldProps>;
    stock?: PrimitiveOverrideProps<TextFieldProps>;
    bar_code?: PrimitiveOverrideProps<TextFieldProps>;
    change_price?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ItemCreateFormProps = React.PropsWithChildren<{
    overrides?: ItemCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ItemCreateFormInputValues) => ItemCreateFormInputValues;
    onSuccess?: (fields: ItemCreateFormInputValues) => void;
    onError?: (fields: ItemCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ItemCreateFormInputValues) => ItemCreateFormInputValues;
    onValidate?: ItemCreateFormValidationValues;
} & React.CSSProperties>;
export default function ItemCreateForm(props: ItemCreateFormProps): React.ReactElement;
