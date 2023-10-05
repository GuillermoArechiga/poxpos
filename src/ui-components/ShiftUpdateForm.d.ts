/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Shift } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ShiftUpdateFormInputValues = {
    owner?: string;
    start_time?: string;
    end_time?: string;
    start_cash?: number;
    cash_sale?: number;
    card_sale?: number;
    total_sale?: number;
    is_open?: boolean;
};
export declare type ShiftUpdateFormValidationValues = {
    owner?: ValidationFunction<string>;
    start_time?: ValidationFunction<string>;
    end_time?: ValidationFunction<string>;
    start_cash?: ValidationFunction<number>;
    cash_sale?: ValidationFunction<number>;
    card_sale?: ValidationFunction<number>;
    total_sale?: ValidationFunction<number>;
    is_open?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ShiftUpdateFormOverridesProps = {
    ShiftUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    start_time?: PrimitiveOverrideProps<TextFieldProps>;
    end_time?: PrimitiveOverrideProps<TextFieldProps>;
    start_cash?: PrimitiveOverrideProps<TextFieldProps>;
    cash_sale?: PrimitiveOverrideProps<TextFieldProps>;
    card_sale?: PrimitiveOverrideProps<TextFieldProps>;
    total_sale?: PrimitiveOverrideProps<TextFieldProps>;
    is_open?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ShiftUpdateFormProps = React.PropsWithChildren<{
    overrides?: ShiftUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    shift?: Shift;
    onSubmit?: (fields: ShiftUpdateFormInputValues) => ShiftUpdateFormInputValues;
    onSuccess?: (fields: ShiftUpdateFormInputValues) => void;
    onError?: (fields: ShiftUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ShiftUpdateFormInputValues) => ShiftUpdateFormInputValues;
    onValidate?: ShiftUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ShiftUpdateForm(props: ShiftUpdateFormProps): React.ReactElement;
