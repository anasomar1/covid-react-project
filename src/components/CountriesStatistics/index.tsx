import React, { ReactElement, useState, useEffect } from "react";
import type { Country } from "../../App";
import styles from "./styles.module.css";
import { TbArrowsSort } from "react-icons/tb";

const CountriesStatistics = ({
  countries,
}: {
  countries: Country[];
}): ReactElement => {
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DSC">("ASC");
  const [sortKey, setSortKey] = useState<keyof Country>("Country");

  const searchCountries = (countryName: string): void => {
    setFilteredCountries(
      countries.filter((country) =>
        country.Country.toLowerCase().match(countryName)
      )
    );
    sortCountries(sortKey);
  };

  const sortCountries = (column: keyof Country): void => {
    const isAscending = sortOrder === "ASC";
    setFilteredCountries((prev) =>
      [...prev].sort((a, b) =>
        a[column] < b[column] ? (isAscending ? 1 : -1) : isAscending ? -1 : 1
      )
    );
    setSortOrder(isAscending ? "DSC" : "ASC");
  };

  const updateSortKey = (key: keyof Country) => {
    setSortKey(key);
    sortCountries(key);
  };

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
            <th className={styles.tableBox}>
              Country
              <TbArrowsSort
                className={styles.sortIcon}
                onClick={() => updateSortKey("Country")}
              />
            </th>
            <th className={styles.tableBox}>
              Total Cases
              <TbArrowsSort
                className={styles.sortIcon}
                onClick={() => updateSortKey("TotalConfirmed")}
              />
            </th>
            <th className={styles.tableBox}>
              Total Deaths
              <TbArrowsSort
                className={styles.sortIcon}
                onClick={() => updateSortKey("TotalDeaths")}
              />
            </th>
            <th className={styles.tableBox}>
              Total Recovered
              <TbArrowsSort
                className={styles.sortIcon}
                onClick={() => updateSortKey("TotalRecovered")}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country: Country) => (
            <tr key={country.ID}>
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
