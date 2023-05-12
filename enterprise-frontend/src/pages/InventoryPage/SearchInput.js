import { React, useEffect, useState } from "react";
import { Radio, Input } from "antd";

const { Search } = Input;

const SearchInputFlight = ({ stores, filterByStore, filterByName }) => {
  const [searchBy, setSearchBy] = useState("All");
  const [selectedStore, setStore] = useState("All");

  const onSearch = (value) => {
    // if (value == '') return;
    const inventory = filterByName(value);
    if (inventory.length > 0) {
      setStore(inventory[0].store);
    }
  }

  const onChange = (e) => {
    setStore(e.target.value);
    filterByStore(e.target.value)
  };

  return (
    <div
      style={{
        marginBottom: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div>
        <Search
          style={{ width: "410px" }}
          placeholder="Search Medicine..."
          onSearch={onSearch}
          enterButton
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        Search by:
        <Radio.Group
          style={{ marginLeft: "20px" }}
          value={selectedStore}
          defaultValue={selectedStore}
          onChange={onChange}
        >
          {stores.map(store => (
            <Radio.Button key={store} value={store}>{store}</Radio.Button>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
};

export default SearchInputFlight;
