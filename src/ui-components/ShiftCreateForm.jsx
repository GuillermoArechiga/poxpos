/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Shift } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ShiftCreateForm(props) {
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
    owner: "",
    start_time: "",
    end_time: "",
    start_cash: "",
    cash_sale: "",
    card_sale: "",
    total_sale: "",
    is_open: false,
  };
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [start_time, setStart_time] = React.useState(initialValues.start_time);
  const [end_time, setEnd_time] = React.useState(initialValues.end_time);
  const [start_cash, setStart_cash] = React.useState(initialValues.start_cash);
  const [cash_sale, setCash_sale] = React.useState(initialValues.cash_sale);
  const [card_sale, setCard_sale] = React.useState(initialValues.card_sale);
  const [total_sale, setTotal_sale] = React.useState(initialValues.total_sale);
  const [is_open, setIs_open] = React.useState(initialValues.is_open);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setOwner(initialValues.owner);
    setStart_time(initialValues.start_time);
    setEnd_time(initialValues.end_time);
    setStart_cash(initialValues.start_cash);
    setCash_sale(initialValues.cash_sale);
    setCard_sale(initialValues.card_sale);
    setTotal_sale(initialValues.total_sale);
    setIs_open(initialValues.is_open);
    setErrors({});
  };
  const validations = {
    owner: [],
    start_time: [],
    end_time: [],
    start_cash: [],
    cash_sale: [],
    card_sale: [],
    total_sale: [],
    is_open: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          start_time,
          end_time,
          start_cash,
          cash_sale,
          card_sale,
          total_sale,
          is_open,
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
          await DataStore.save(new Shift(modelFields));
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
      {...getOverrideProps(overrides, "ShiftCreateForm")}
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
              start_time,
              end_time,
              start_cash,
              cash_sale,
              card_sale,
              total_sale,
              is_open,
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
        label="Start time"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={start_time && convertToLocal(new Date(start_time))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              owner,
              start_time: value,
              end_time,
              start_cash,
              cash_sale,
              card_sale,
              total_sale,
              is_open,
            };
            const result = onChange(modelFields);
            value = result?.start_time ?? value;
          }
          if (errors.start_time?.hasError) {
            runValidationTasks("start_time", value);
          }
          setStart_time(value);
        }}
        onBlur={() => runValidationTasks("start_time", start_time)}
        errorMessage={errors.start_time?.errorMessage}
        hasError={errors.start_time?.hasError}
        {...getOverrideProps(overrides, "start_time")}
      ></TextField>
      <TextField
        label="End time"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={end_time && convertToLocal(new Date(end_time))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              owner,
              start_time,
              end_time: value,
              start_cash,
              cash_sale,
              card_sale,
              total_sale,
              is_open,
            };
            const result = onChange(modelFields);
            value = result?.end_time ?? value;
          }
          if (errors.end_time?.hasError) {
            runValidationTasks("end_time", value);
          }
          setEnd_time(value);
        }}
        onBlur={() => runValidationTasks("end_time", end_time)}
        errorMessage={errors.end_time?.errorMessage}
        hasError={errors.end_time?.hasError}
        {...getOverrideProps(overrides, "end_time")}
      ></TextField>
      <TextField
        label="Start cash"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={start_cash}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              owner,
              start_time,
              end_time,
              start_cash: value,
              cash_sale,
              card_sale,
              total_sale,
              is_open,
            };
            const result = onChange(modelFields);
            value = result?.start_cash ?? value;
          }
          if (errors.start_cash?.hasError) {
            runValidationTasks("start_cash", value);
          }
          setStart_cash(value);
        }}
        onBlur={() => runValidationTasks("start_cash", start_cash)}
        errorMessage={errors.start_cash?.errorMessage}
        hasError={errors.start_cash?.hasError}
        {...getOverrideProps(overrides, "start_cash")}
      ></TextField>
      <TextField
        label="Cash sale"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={cash_sale}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              owner,
              start_time,
              end_time,
              start_cash,
              cash_sale: value,
              card_sale,
              total_sale,
              is_open,
            };
            const result = onChange(modelFields);
            value = result?.cash_sale ?? value;
          }
          if (errors.cash_sale?.hasError) {
            runValidationTasks("cash_sale", value);
          }
          setCash_sale(value);
        }}
        onBlur={() => runValidationTasks("cash_sale", cash_sale)}
        errorMessage={errors.cash_sale?.errorMessage}
        hasError={errors.cash_sale?.hasError}
        {...getOverrideProps(overrides, "cash_sale")}
      ></TextField>
      <TextField
        label="Card sale"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={card_sale}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              owner,
              start_time,
              end_time,
              start_cash,
              cash_sale,
              card_sale: value,
              total_sale,
              is_open,
            };
            const result = onChange(modelFields);
            value = result?.card_sale ?? value;
          }
          if (errors.card_sale?.hasError) {
            runValidationTasks("card_sale", value);
          }
          setCard_sale(value);
        }}
        onBlur={() => runValidationTasks("card_sale", card_sale)}
        errorMessage={errors.card_sale?.errorMessage}
        hasError={errors.card_sale?.hasError}
        {...getOverrideProps(overrides, "card_sale")}
      ></TextField>
      <TextField
        label="Total sale"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={total_sale}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              owner,
              start_time,
              end_time,
              start_cash,
              cash_sale,
              card_sale,
              total_sale: value,
              is_open,
            };
            const result = onChange(modelFields);
            value = result?.total_sale ?? value;
          }
          if (errors.total_sale?.hasError) {
            runValidationTasks("total_sale", value);
          }
          setTotal_sale(value);
        }}
        onBlur={() => runValidationTasks("total_sale", total_sale)}
        errorMessage={errors.total_sale?.errorMessage}
        hasError={errors.total_sale?.hasError}
        {...getOverrideProps(overrides, "total_sale")}
      ></TextField>
      <SwitchField
        label="Is open"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_open}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              owner,
              start_time,
              end_time,
              start_cash,
              cash_sale,
              card_sale,
              total_sale,
              is_open: value,
            };
            const result = onChange(modelFields);
            value = result?.is_open ?? value;
          }
          if (errors.is_open?.hasError) {
            runValidationTasks("is_open", value);
          }
          setIs_open(value);
        }}
        onBlur={() => runValidationTasks("is_open", is_open)}
        errorMessage={errors.is_open?.errorMessage}
        hasError={errors.is_open?.hasError}
        {...getOverrideProps(overrides, "is_open")}
      ></SwitchField>
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
