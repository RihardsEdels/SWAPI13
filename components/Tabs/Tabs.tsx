"use client";
import { useState } from "react";
import Button from "../Button/Button";

import classes from "./tabs.module.css";

interface TabsProps {
  tabs: { label: string; value: string; content: JSX.Element[] | null }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [dropdown, setDropdown] = useState({
    open: false,
    type: tabs[0]?.value || "",
  });

  const handleTabs = (e) => {
    setDropdown((prevState) => ({
      ...prevState,
      open: e.target.id === prevState.type ? !prevState.open : true,
      type: e.target.id,
    }));
  };
  const content = tabs.find((tab) => tab.value === dropdown?.type)?.content;

  return (
    <div>
      <div className={classes.tabButtons}>
        {tabs.map((tab) => {
          const activeTab = dropdown.type === tab.value;
          return tab.content ? (
            <Button
              key={tab.value}
              id={tab.value}
              onClick={(e) => handleTabs(e)}
              classes={{ root: activeTab ? classes.activeTab : classes.tab }}
            >
              {tab.label}
            </Button>
          ) : null;
        })}
      </div>
      <div className={classes.tabContent}>{content}</div>
    </div>
  );
};

export default Tabs;
