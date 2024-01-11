import React, { useEffect } from "react";
import styles from "./result-form.scss";
import { TextInput, Select, SelectItem } from "@carbon/react";
import { useTranslation } from "react-i18next";

import { ConceptReference } from "./result-form.resource";

interface ResultFormFieldProps {
  concept: ConceptReference;
  setFormFieldValue?: (fieldId: string, value: any) => void;
}
const ResultFormField: React.FC<ResultFormFieldProps> = ({
  concept,
  setFormFieldValue,
}) => {
  const { t } = useTranslation();

  const [value, setValue] = React.useState();

  useEffect(() => {
    setFormFieldValue(concept.uuid, value);
  }, [concept.uuid, value]);

  // create input fields
  if (concept === undefined) {
    return null;
  }

  let inputField;
  if (
    concept.datatype?.display === "Text" ||
    concept.datatype?.display === "Numeric"
  ) {
    inputField = (
      <TextInput
        key={concept.uuid}
        className={styles.textInput}
        name={`member-${concept.uuid}-test-id`}
        id={`member-${concept.uuid}-test-id`}
        type={concept.datatype.display === "Numeric" ? "number" : "text"}
        labelText={concept?.display}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    );
  } else if (concept?.datatype?.display === "Coded") {
    inputField = (
      <Select
        key={concept.uuid}
        className={styles.textInput}
        name={`member-${concept.uuid}-test-id`}
        id={`member-${concept.uuid}-test-id`}
        type="text"
        labelText={concept?.display}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <SelectItem text={t("option", "Choose an Option")} value="" />

        {concept?.answers?.map((answer) => (
          <SelectItem
            key={answer.uuid}
            text={answer.display}
            value={answer.uuid}
          >
            {answer.display}
          </SelectItem>
        ))}
      </Select>
    );
  }
  return <>{inputField}</>;
};

export default ResultFormField;
