/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Order } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type OrderUpdateFormInputValues = {
    owner?: string;
    payment?: string;
    total_order?: number;
    revenue?: number;
};
export declare type OrderUpdateFormValidationValues = {
    owner?: ValidationFunction<string>;
    payment?: ValidationFunction<string>;
    total_order?: ValidationFunction<number>;
    revenue?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OrderUpdateFormOverridesProps = {
    OrderUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    payment?: PrimitiveOverrideProps<TextFieldProps>;
    total_order?: PrimitiveOverrideProps<TextFieldProps>;
    revenue?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OrderUpdateFormProps = React.PropsWithChildren<{
    overrides?: OrderUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    order?: Order;
    onSubmit?: (fields: OrderUpdateFormInputValues) => OrderUpdateFormInputValues;
    onSuccess?: (fields: OrderUpdateFormInputValues) => void;
    onError?: (fields: OrderUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OrderUpdateFormInputValues) => OrderUpdateFormInputValues;
    onValidate?: OrderUpdateFormValidationValues;
} & React.CSSProperties>;
export default function OrderUpdateForm(props: OrderUpdateFormProps): React.ReactElement;
