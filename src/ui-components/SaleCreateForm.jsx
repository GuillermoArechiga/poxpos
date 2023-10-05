/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Sale } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function SaleCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    item: "",
    quantity: "",
    sale_price: "",
    cost_price: "",
  };
  const [item, setItem] = React.useState(initialValues.item);
  const [quantity, setQuantity] = React.useState(initialValues.quantity);
  const [sale_price, setSale_price] = React.useState(initialValues.sale_price);
  const [cost_price, setCost_price] = React.useState(initialValues.cost_price);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setItem(initialValues.item);
    setQuantity(initialValues.quantity);
    setSale_price(initialValues.sale_price);
    setCost_price(initialValues.cost_price);
    setErrors({});
  };
  const validations = {
    item: [],
    quantity: [],
    sale_price: [],
    cost_price: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          item,
          quantity,
          sale_price,
          cost_price,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(new Sale(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "SaleCreateForm")}
      {...rest}
    >
      <TextField
        label="Item"
        isRequired={false}
        isReadOnly={false}
        value={item}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              item: value,
              quantity,
              sale_price,
              cost_price,
            };
            const result = onChange(modelFields);
            value = result?.item ?? value;
          }
          if (errors.item?.hasError) {
            runValidationTasks("item", value);
          }
          setItem(value);
        }}
        onBlur={() => runValidationTasks("item", item)}
        errorMessage={errors.item?.errorMessage}
        hasError={errors.item?.hasError}
        {...getOverrideProps(overrides, "item")}
      ></TextField>
      <TextField
        label="Quantity"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={quantity}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              item,
              quantity: value,
              sale_price,
              cost_price,
            };
            const result = onChange(modelFields);
            value = result?.quantity ?? value;
          }
          if (errors.quantity?.hasError) {
            runValidationTasks("quantity", value);
          }
          setQuantity(value);
        }}
        onBlur={() => runValidationTasks("quantity", quantity)}
        errorMessage={errors.quantity?.errorMessage}
        hasError={errors.quantity?.hasError}
        {...getOverrideProps(overrides, "quantity")}
      ></TextField>
      <TextField
        label="Sale price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={sale_price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              item,
              quantity,
              sale_price: value,
              cost_price,
            };
            const result = onChange(modelFields);
            value = result?.sale_price ?? value;
          }
          if (errors.sale_price?.hasError) {
            runValidationTasks("sale_price", value);
          }
          setSale_price(value);
        }}
        onBlur={() => runValidationTasks("sale_price", sale_price)}
        errorMessage={errors.sale_price?.errorMessage}
        hasError={errors.sale_price?.hasError}
        {...getOverrideProps(overrides, "sale_price")}
      ></TextField>
      <TextField
        label="Cost price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={cost_price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              item,
              quantity,
              sale_price,
              cost_price: value,
            };
            const result = onChange(modelFields);
            value = result?.cost_price ?? value;
          }
          if (errors.cost_price?.hasError) {
            runValidationTasks("cost_price", value);
          }
          setCost_price(value);
        }}
        onBlur={() => runValidationTasks("cost_price", cost_price)}
        errorMessage={errors.cost_price?.errorMessage}
        hasError={errors.cost_price?.hasError}
        {...getOverrideProps(overrides, "cost_price")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
