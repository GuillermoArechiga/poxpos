/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Sale } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SaleUpdateFormInputValues = {
    item?: string;
    quantity?: number;
    sale_price?: number;
    cost_price?: number;
};
export declare type SaleUpdateFormValidationValues = {
    item?: ValidationFunction<string>;
    quantity?: ValidationFunction<number>;
    sale_price?: ValidationFunction<number>;
    cost_price?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SaleUpdateFormOverridesProps = {
    SaleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    item?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    sale_price?: PrimitiveOverrideProps<TextFieldProps>;
    cost_price?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SaleUpdateFormProps = React.PropsWithChildren<{
    overrides?: SaleUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sale?: Sale;
    onSubmit?: (fields: SaleUpdateFormInputValues) => SaleUpdateFormInputValues;
    onSuccess?: (fields: SaleUpdateFormInputValues) => void;
    onError?: (fields: SaleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SaleUpdateFormInputValues) => SaleUpdateFormInputValues;
    onValidate?: SaleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SaleUpdateForm(props: SaleUpdateFormProps): React.ReactElement;
