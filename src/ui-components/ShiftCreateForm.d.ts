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
export declare type ShiftCreateFormInputValues = {
    owner?: string;
    start_time?: string;
    end_time?: string;
    start_cash?: number;
    cash_sale?: number;
    card_sale?: number;
    total_sale?: number;
    is_open?: string;
};
export declare type ShiftCreateFormValidationValues = {
    owner?: ValidationFunction<string>;
    start_time?: ValidationFunction<string>;
    end_time?: ValidationFunction<string>;
    start_cash?: ValidationFunction<number>;
    cash_sale?: ValidationFunction<number>;
    card_sale?: ValidationFunction<number>;
    total_sale?: ValidationFunction<number>;
    is_open?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ShiftCreateFormOverridesProps = {
    ShiftCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    start_time?: PrimitiveOverrideProps<TextFieldProps>;
    end_time?: PrimitiveOverrideProps<TextFieldProps>;
    start_cash?: PrimitiveOverrideProps<TextFieldProps>;
    cash_sale?: PrimitiveOverrideProps<TextFieldProps>;
    card_sale?: PrimitiveOverrideProps<TextFieldProps>;
    total_sale?: PrimitiveOverrideProps<TextFieldProps>;
    is_open?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ShiftCreateFormProps = React.PropsWithChildren<{
    overrides?: ShiftCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ShiftCreateFormInputValues) => ShiftCreateFormInputValues;
    onSuccess?: (fields: ShiftCreateFormInputValues) => void;
    onError?: (fields: ShiftCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ShiftCreateFormInputValues) => ShiftCreateFormInputValues;
    onValidate?: ShiftCreateFormValidationValues;
} & React.CSSProperties>;
export default function ShiftCreateForm(props: ShiftCreateFormProps): React.ReactElement;
