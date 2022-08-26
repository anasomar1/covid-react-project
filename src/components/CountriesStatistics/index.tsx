import React, { ReactElement, useState, useEffect, useCallback } from "react";
import type { Country } from "../../App";
import styles from "./styles.module.css";
import { TbArrowsSort } from "react-icons/tb";

type SortKey = keyof Country;
type TableHeaders = {
  key: SortKey;
  header: Country["Country"];
}[];

const CountriesStatistics = ({
  countries,
}: {
  countries: Country[];
}): ReactElement => {
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DSC">("ASC");
  const [sortKey, setSortKey] = useState<SortKey>("Country");
  const tableHeaders: TableHeaders = [
    {
      key: "Country",
      header: "Country",
    },
    {
      key: "TotalConfirmed",
      header: "Total Confirmed",
    },
    {
      key: "TotalDeaths",
      header: "Total Deaths",
    },
    {
      key: "TotalRecovered",
      header: "Total Recovered",
    },
  ];

  const searchCountries = (countryName: string): void => {
    setFilteredCountries(
      countries.filter((country) =>
        country.Country.toLowerCase().match(countryName)
      )
    );
  };

  const sortCountries = (
    data: Country[],
    sortKey: SortKey,
    isReversed: boolean
  ) => {
    const sortedData = data.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
    return isReversed ? [...sortedData].reverse() : sortedData;
  };

  const updateSort = (key: SortKey) => {
    setSortOrder(sortOrder === "ASC" ? "DSC" : "ASC");
    setSortKey(key);
  };

  const sortedCountries = useCallback(
    () => sortCountries(filteredCountries, sortKey, sortOrder === "DSC"),
    [filteredCountries, sortKey, sortOrder]
  );

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  return (
    <div>
      <div className={styles.search}>
        <label htmlFor="countries">Search:</label>
        <input
          className={styles.searchInput}
          type="text"
          name="countries"
          id="countries"
          placeholder="Country"
          onChange={(event) =>
            searchCountries(event.target.value.toLowerCase().trim())
          }
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th
                className={styles.tableHeader}
                onClick={() => updateSort(header.key)}
              >
                {header.key}
                <TbArrowsSort className={styles.sortIcon} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedCountries().map((country: Country) => (
            <tr key={country.ID} className={styles.tableRow}>
              <td className={styles.tableBox}>{country.Country}</td>
              <td className={styles.tableBox}>{country.TotalConfirmed}</td>
              <td className={styles.tableBox}>{country.TotalDeaths}</td>
              <td className={styles.tableBox}>{country.TotalRecovered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountriesStatistics;
