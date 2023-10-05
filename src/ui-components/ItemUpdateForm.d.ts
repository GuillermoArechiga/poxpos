/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Item } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ItemUpdateFormInputValues = {
    name?: string;
    cost_price?: number;
    sale_price?: number;
    start_stock?: number;
    stock?: number;
    bar_code?: string;
    change_price?: string;
    owner?: string;
};
export declare type ItemUpdateFormValidationValues = {
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
export declare type ItemUpdateFormOverridesProps = {
    ItemUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    cost_price?: PrimitiveOverrideProps<TextFieldProps>;
    sale_price?: PrimitiveOverrideProps<TextFieldProps>;
    start_stock?: PrimitiveOverrideProps<TextFieldProps>;
    stock?: PrimitiveOverrideProps<TextFieldProps>;
    bar_code?: PrimitiveOverrideProps<TextFieldProps>;
    change_price?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ItemUpdateFormProps = React.PropsWithChildren<{
    overrides?: ItemUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    item?: Item;
    onSubmit?: (fields: ItemUpdateFormInputValues) => ItemUpdateFormInputValues;
    onSuccess?: (fields: ItemUpdateFormInputValues) => void;
    onError?: (fields: ItemUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ItemUpdateFormInputValues) => ItemUpdateFormInputValues;
    onValidate?: ItemUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ItemUpdateForm(props: ItemUpdateFormProps): React.ReactElement;
