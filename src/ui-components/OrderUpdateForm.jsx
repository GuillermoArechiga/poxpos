/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Order } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function OrderUpdateForm(props) {
  const {
    id: idProp,
    order: orderModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    owner: "",
    payment: "",
    total_order: "",
    revenue: "",
  };
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [payment, setPayment] = React.useState(initialValues.payment);
  const [total_order, setTotal_order] = React.useState(
    initialValues.total_order
  );
  const [revenue, setRevenue] = React.useState(initialValues.revenue);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = orderRecord
      ? { ...initialValues, ...orderRecord }
      : initialValues;
    setOwner(cleanValues.owner);
    setPayment(cleanValues.payment);
    setTotal_order(cleanValues.total_order);
    setRevenue(cleanValues.revenue);
    setErrors({});
  };
  const [orderRecord, setOrderRecord] = React.useState(orderModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Order, idProp)
        : orderModelProp;
      setOrderRecord(record);
    };
    queryData();
  }, [idProp, orderModelProp]);
  React.useEffect(resetStateValues, [orderRecord]);
  const validations = {
    owner: [],
    payment: [],
    total_order: [],
    revenue: [],
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
          owner,
          payment,
          total_order,
          revenue,
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
          await DataStore.save(
            Order.copyOf(orderRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "OrderUpdateForm")}
      {...rest}
    >
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner: value,
              payment,
              total_order,
              revenue,
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
      <TextField
        label="Payment"
        isRequired={false}
        isReadOnly={false}
        value={payment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              payment: value,
              total_order,
              revenue,
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
        label="Total order"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={total_order}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              owner,
              payment,
              total_order: value,
              revenue,
            };
            const result = onChange(modelFields);
            value = result?.total_order ?? value;
          }
          if (errors.total_order?.hasError) {
            runValidationTasks("total_order", value);
          }
          setTotal_order(value);
        }}
        onBlur={() => runValidationTasks("total_order", total_order)}
        errorMessage={errors.total_order?.errorMessage}
        hasError={errors.total_order?.hasError}
        {...getOverrideProps(overrides, "total_order")}
      ></TextField>
      <TextField
        label="Revenue"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={revenue}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              owner,
              payment,
              total_order,
              revenue: value,
            };
            const result = onChange(modelFields);
            value = result?.revenue ?? value;
          }
          if (errors.revenue?.hasError) {
            runValidationTasks("revenue", value);
          }
          setRevenue(value);
        }}
        onBlur={() => runValidationTasks("revenue", revenue)}
        errorMessage={errors.revenue?.errorMessage}
        hasError={errors.revenue?.hasError}
        {...getOverrideProps(overrides, "revenue")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || orderModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || orderModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
