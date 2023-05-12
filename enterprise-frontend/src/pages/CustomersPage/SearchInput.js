import { React, useEffect, useState } from "react";
import { Radio, Input } from "antd";

const { Search } = Input;

const SearchInputFlight = ({ filterByTerminal, filterByFlights, fetchAllFlights }) => {
  const [searchBy, setSearchBy] = useState("flight");

  useEffect(() => {

  }, []);

  const onSearch = (value) => {
    console.log(value);
    console.log('radio : ', searchBy);

    if (searchBy === 'flight' && value) {
      filterByFlights(value);
    } else if (searchBy === 'terminal' && value) {
      filterByTerminal(value)
    } else if (!value){
      fetchAllFlights();
    }
  }

  const onChange = (e) => {
    setSearchBy(e.target.value);
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
          placeholder="Search Flight..."
          onSearch={onSearch}
          enterButton
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        Search by:
        <Radio.Group
          style={{ marginLeft: "20px" }}
          value={searchBy}
          defaultValue={searchBy}
          onChange={onChange}

        >
          <Radio.Button value="flight">Flight</Radio.Button>
          <Radio.Button value="terminal">Terminal</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

export default SearchInputFlight;
