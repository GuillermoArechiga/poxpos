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
export declare type SaleCreateFormInputValues = {
    item?: string;
    quantity?: number;
    sale_price?: number;
    cost_price?: number;
};
export declare type SaleCreateFormValidationValues = {
    item?: ValidationFunction<string>;
    quantity?: ValidationFunction<number>;
    sale_price?: ValidationFunction<number>;
    cost_price?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SaleCreateFormOverridesProps = {
    SaleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    item?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    sale_price?: PrimitiveOverrideProps<TextFieldProps>;
    cost_price?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SaleCreateFormProps = React.PropsWithChildren<{
    overrides?: SaleCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SaleCreateFormInputValues) => SaleCreateFormInputValues;
    onSuccess?: (fields: SaleCreateFormInputValues) => void;
    onError?: (fields: SaleCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SaleCreateFormInputValues) => SaleCreateFormInputValues;
    onValidate?: SaleCreateFormValidationValues;
} & React.CSSProperties>;
export default function SaleCreateForm(props: SaleCreateFormProps): React.ReactElement;
