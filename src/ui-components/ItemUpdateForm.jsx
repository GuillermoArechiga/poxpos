/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Item } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ItemUpdateForm(props) {
  const {
    id: idProp,
    item: itemModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    cost_price: "",
    sale_price: "",
    start_stock: "",
    stock: "",
    bar_code: "",
    change_price: "",
    owner: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [cost_price, setCost_price] = React.useState(initialValues.cost_price);
  const [sale_price, setSale_price] = React.useState(initialValues.sale_price);
  const [start_stock, setStart_stock] = React.useState(
    initialValues.start_stock
  );
  const [stock, setStock] = React.useState(initialValues.stock);
  const [bar_code, setBar_code] = React.useState(initialValues.bar_code);
  const [change_price, setChange_price] = React.useState(
    initialValues.change_price
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = itemRecord
      ? { ...initialValues, ...itemRecord }
      : initialValues;
    setName(cleanValues.name);
    setCost_price(cleanValues.cost_price);
    setSale_price(cleanValues.sale_price);
    setStart_stock(cleanValues.start_stock);
    setStock(cleanValues.stock);
    setBar_code(cleanValues.bar_code);
    setChange_price(cleanValues.change_price);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [itemRecord, setItemRecord] = React.useState(itemModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Item, idProp)
        : itemModelProp;
      setItemRecord(record);
    };
    queryData();
  }, [idProp, itemModelProp]);
  React.useEffect(resetStateValues, [itemRecord]);
  const validations = {
    name: [],
    cost_price: [],
    sale_price: [],
    start_stock: [],
    stock: [],
    bar_code: [],
    change_price: [],
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
          name,
          cost_price,
          sale_price,
          start_stock,
          stock,
          bar_code,
          change_price,
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
          await DataStore.save(
            Item.copyOf(itemRecord, (updated) => {
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
      {...getOverrideProps(overrides, "ItemUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              cost_price,
              sale_price,
              start_stock,
              stock,
              bar_code,
              change_price,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
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
              name,
              cost_price: value,
              sale_price,
              start_stock,
              stock,
              bar_code,
              change_price,
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
              name,
              cost_price,
              sale_price: value,
              start_stock,
              stock,
              bar_code,
              change_price,
              owner,
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
        label="Start stock"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={start_stock}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              cost_price,
              sale_price,
              start_stock: value,
              stock,
              bar_code,
              change_price,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.start_stock ?? value;
          }
          if (errors.start_stock?.hasError) {
            runValidationTasks("start_stock", value);
          }
          setStart_stock(value);
        }}
        onBlur={() => runValidationTasks("start_stock", start_stock)}
        errorMessage={errors.start_stock?.errorMessage}
        hasError={errors.start_stock?.hasError}
        {...getOverrideProps(overrides, "start_stock")}
      ></TextField>
      <TextField
        label="Stock"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={stock}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              cost_price,
              sale_price,
              start_stock,
              stock: value,
              bar_code,
              change_price,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.stock ?? value;
          }
          if (errors.stock?.hasError) {
            runValidationTasks("stock", value);
          }
          setStock(value);
        }}
        onBlur={() => runValidationTasks("stock", stock)}
        errorMessage={errors.stock?.errorMessage}
        hasError={errors.stock?.hasError}
        {...getOverrideProps(overrides, "stock")}
      ></TextField>
      <TextField
        label="Bar code"
        isRequired={false}
        isReadOnly={false}
        value={bar_code}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              cost_price,
              sale_price,
              start_stock,
              stock,
              bar_code: value,
              change_price,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.bar_code ?? value;
          }
          if (errors.bar_code?.hasError) {
            runValidationTasks("bar_code", value);
          }
          setBar_code(value);
        }}
        onBlur={() => runValidationTasks("bar_code", bar_code)}
        errorMessage={errors.bar_code?.errorMessage}
        hasError={errors.bar_code?.hasError}
        {...getOverrideProps(overrides, "bar_code")}
      ></TextField>
      <TextField
        label="Change price"
        isRequired={false}
        isReadOnly={false}
        value={change_price}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              cost_price,
              sale_price,
              start_stock,
              stock,
              bar_code,
              change_price: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.change_price ?? value;
          }
          if (errors.change_price?.hasError) {
            runValidationTasks("change_price", value);
          }
          setChange_price(value);
        }}
        onBlur={() => runValidationTasks("change_price", change_price)}
        errorMessage={errors.change_price?.errorMessage}
        hasError={errors.change_price?.hasError}
        {...getOverrideProps(overrides, "change_price")}
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
              name,
              cost_price,
              sale_price,
              start_stock,
              stock,
              bar_code,
              change_price,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || itemModelProp)}
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
              !(idProp || itemModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
