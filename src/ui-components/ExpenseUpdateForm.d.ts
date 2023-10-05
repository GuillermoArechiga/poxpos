/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Expense } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ExpenseUpdateFormInputValues = {
    quantity?: number;
    cost_price?: number;
    total_expense?: number;
    payment?: string;
    owner?: string;
};
export declare type ExpenseUpdateFormValidationValues = {
    quantity?: ValidationFunction<number>;
    cost_price?: ValidationFunction<number>;
    total_expense?: ValidationFunction<number>;
    payment?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ExpenseUpdateFormOverridesProps = {
    ExpenseUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    cost_price?: PrimitiveOverrideProps<TextFieldProps>;
    total_expense?: PrimitiveOverrideProps<TextFieldProps>;
    payment?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ExpenseUpdateFormProps = React.PropsWithChildren<{
    overrides?: ExpenseUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    expense?: Expense;
    onSubmit?: (fields: ExpenseUpdateFormInputValues) => ExpenseUpdateFormInputValues;
    onSuccess?: (fields: ExpenseUpdateFormInputValues) => void;
    onError?: (fields: ExpenseUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ExpenseUpdateFormInputValues) => ExpenseUpdateFormInputValues;
    onValidate?: ExpenseUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ExpenseUpdateForm(props: ExpenseUpdateFormProps): React.ReactElement;
