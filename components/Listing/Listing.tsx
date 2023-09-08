"use client";

import React, { useState, useEffect } from "react";
import Input from "../Input/Input";
import { mdiArrowUp, mdiArrowDown, mdiClose } from "@mdi/js";

import classes from "./listing.module.css";
import ListingCard from "../ListingCard/ListingCard";
import { Person } from "@/types/types";

import Icon from "@mdi/react";

interface ListingProps {
  listingData: Person[];
}

const Listing: React.FunctionComponent<ListingProps> = ({ listingData }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Person[]>(listingData || []);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  useEffect(() => {
    const filtered = listingData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.homeworld?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, listingData]);

  const handleClientSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const sortByName = () => {
    const sortedData = [...filteredData];
    sortedData.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className={classes.root}>
      <div className="grid lg:grid-flow-col gap-2 lg:justify-start">
        <Input
          onChange={handleClientSearch}
          value={searchQuery}
          placeholder={"Search"}
          icon={searchQuery && mdiClose}
          action={() => setSearchQuery("")}
          classes={{ root: classes.inputRoot, inputRoot: classes.input }}
        />
        <div className="grid grid-flow-col gap-1 justify-start items-center hover:underline">
          <span onClick={sortByName} role="button">
            Sort by name
          </span>
          {sortOrder && (
            <Icon
              size={"16px"}
              path={sortOrder === "asc" ? mdiArrowUp : mdiArrowDown}
            />
          )}
        </div>
      </div>

      {searchQuery.length && !filteredData.length ? (
        <h1 className={classes.noResults}>
          Sorry, no matches for your search!
        </h1>
      ) : null}
      <div className={classes.characterGrid}>
        {filteredData.map((person, index) => (
          <ListingCard key={index} characterData={person} />
        ))}
      </div>
    </div>
  );
};

export default Listing;
