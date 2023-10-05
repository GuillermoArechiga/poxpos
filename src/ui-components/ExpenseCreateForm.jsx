/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Expense } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ExpenseCreateForm(props) {
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
    quantity: "",
    cost_price: "",
    total_expense: "",
    payment: "",
    owner: "",
  };
  const [quantity, setQuantity] = React.useState(initialValues.quantity);
  const [cost_price, setCost_price] = React.useState(initialValues.cost_price);
  const [total_expense, setTotal_expense] = React.useState(
    initialValues.total_expense
  );
  const [payment, setPayment] = React.useState(initialValues.payment);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setQuantity(initialValues.quantity);
    setCost_price(initialValues.cost_price);
    setTotal_expense(initialValues.total_expense);
    setPayment(initialValues.payment);
    setOwner(initialValues.owner);
    setErrors({});
  };
  const validations = {
    quantity: [],
    cost_price: [],
    total_expense: [],
    payment: [],
    owner: [],
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
          quantity,
          cost_price,
          total_expense,
          payment,
          owner,
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
          await DataStore.save(new Expense(modelFields));
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
      {...getOverrideProps(overrides, "ExpenseCreateForm")}
      {...rest}
    >
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
              quantity: value,
              cost_price,
              total_expense,
              payment,
              owner,
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
              quantity,
              cost_price: value,
              total_expense,
              payment,
              owner,
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
      <TextField
        label="Total expense"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={total_expense}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              quantity,
              cost_price,
              total_expense: value,
              payment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.total_expense ?? value;
          }
          if (errors.total_expense?.hasError) {
            runValidationTasks("total_expense", value);
          }
          setTotal_expense(value);
        }}
        onBlur={() => runValidationTasks("total_expense", total_expense)}
        errorMessage={errors.total_expense?.errorMessage}
        hasError={errors.total_expense?.hasError}
        {...getOverrideProps(overrides, "total_expense")}
      ></TextField>
      <TextField
        label="Payment"
        isRequired={false}
        isReadOnly={false}
        value={payment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              quantity,
              cost_price,
              total_expense,
              payment: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.payment ?? value;
          }
          if (errors.payment?.hasError) {
            runValidationTasks("payment", value);
          }
          setPayment(value);
        }}
        onBlur={() => runValidationTasks("payment", payment)}
        errorMessage={errors.payment?.errorMessage}
        hasError={errors.payment?.hasError}
        {...getOverrideProps(overrides, "payment")}
      ></TextField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              quantity,
              cost_price,
              total_expense,
              payment,
              owner: value,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
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
