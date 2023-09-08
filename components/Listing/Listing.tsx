"use client";

import React, { useState, useEffect } from "react";
import Input from "../Input/Input";
import { mdiClose } from "@mdi/js";

import classes from "./listing.module.css";
import ListingCard from "../ListingCard/ListingCard";

interface ListingProps {
  listingData: { name: string }[];
}

const Listing: React.FunctionComponent<ListingProps> = ({ listingData }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [filteredData, setFilteredData] = useState(listingData || []);

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

  return (
    <div className={classes.root}>
      <Input
        onChange={handleClientSearch}
        value={searchQuery}
        placeholder={"Search"}
        icon={mdiClose}
        action={() => setSearchQuery("")}
        classes={{ root: classes.inputRoot, inputRoot: classes.input }}
      />
      {searchQuery.length && !filteredData.length ? (
        <h1 className={classes.noResults}>
          Sorry, no matches for your search!
        </h1>
      ) : (
        ""
      )}
      <div className={classes.characterGrid}>
        {filteredData.map((person, index) => (
          <ListingCard key={index} characterData={person} />
        ))}
      </div>
    </div>
  );
};

export default Listing;
