import React, { useState } from "react";
import {
  type AssignedExtension,
  Extension,
  useConnectedExtensions,
} from "@openmrs/esm-framework";
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import { useTranslation } from "react-i18next";
import styles from "./laboratory-tabs.scss";
import TestsOrderedTable from "./tests-ordered/tests-ordered-table.component";
import { ComponentContext } from "@openmrs/esm-framework/src/internal";

const labPanelSlot = "lab-panels-slot";

const LaboratoryOrdersTabs: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const tabExtensions = useConnectedExtensions(
    labPanelSlot
  ) as AssignedExtension[];

  return (
    <main className={`omrs-main-content`}>
      <section className={styles.orderTabsContainer}>
        <Tabs
          selectedIndex={selectedTab}
          onChange={({ selectedIndex }) => setSelectedTab(selectedIndex)}
          className={styles.tabs}
        >
          <TabList
            style={{ paddingLeft: "1rem" }}
            aria-label="Laboratory tabs"
            contained
          >
            <Tab style={{ width: "150px" }}>
              {t("testedOrders", "Tests ordered")}
            </Tab>
            {tabExtensions
              .filter((extension) => Object.keys(extension.meta).length > 0)
              .map((extension, index) => {
                const { name, title } = extension.meta;

                if (name && title) {
                  return (
                    <Tab
                      key={index}
                      className={styles.tab}
                      id={`${title || index}-tab`}
                      style={{ width: "150px" }}
                    >
                      {t(title, {
                        ns: extension.moduleName,
                        defaultValue: title,
                      })}
                    </Tab>
                  );
                } else {
                  return null;
                }
              })}
          </TabList>
          <TabPanels>
            {/* Should we move to loading this tab as an Extension? */}
            <TabPanel style={{ padding: 0 }}>
              <TestsOrderedTable />
            </TabPanel>
            {tabExtensions
              .filter((extension) => Object.keys(extension.meta).length > 0)
              .map((extension, index) => {
                return (
                  <TabPanel key={`${extension.meta.title}-tab-${index}`}>
                    <ComponentContext.Provider
                      key={extension.id}
                      value={{
                        moduleName: extension.moduleName,
                        extension: {
                          extensionId: extension.id,
                          extensionSlotName: labPanelSlot,
                          extensionSlotModuleName: extension.moduleName,
                        },
                      }}
                    >
                      <Extension />
                    </ComponentContext.Provider>
                  </TabPanel>
                );
              })}
          </TabPanels>
        </Tabs>
      </section>
    </main>
  );
};

export default LaboratoryOrdersTabs;
