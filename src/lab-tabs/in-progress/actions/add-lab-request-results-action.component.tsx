import { Order } from "@openmrs/esm-patient-common-lib";
import React from "react";
import { OverflowMenuItem } from "@carbon/react";
import { launchOverlay } from "../../../components/overlay/store";
import ResultForm from "../../../results/result-form.component";
import { useTranslation } from "react-i18next";

interface AddLabRequestResultsActionProps {
  order: Order;
  patientUuid: string;
}
const AddLabRequestResultsAction: React.FC<AddLabRequestResultsActionProps> = ({
  order,
  patientUuid,
}) => {
  const { t } = useTranslation();

  return (
    <OverflowMenuItem
      itemText={t("labResultsForm", "Lab Results Form")}
      onClick={() => {
        launchOverlay(
          t("labResultsForm", "Lab Results Form"),
          <ResultForm patientUuid={patientUuid} order={order} />
        );
      }}
      style={{
        maxWidth: "100vw",
      }}
    />
  );
};

export default AddLabRequestResultsAction;
