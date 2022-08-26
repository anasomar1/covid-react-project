import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import CountriesStatistics from "./components/CountriesStatistics";
import GlobalStatistics from "./components/GlobalStatistics";

export interface Country {
  Country: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
  ID: string;
}

interface CovidData {
  Global: Record<string, number>;
  Countries: Country[];
}

function App() {
  const [covidData, setCovidData] = useState<CovidData>({
    Global: {},
    Countries: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("https://api.covid19api.com/summary")
      .then((response: AxiosResponse) => {
        setCovidData(response.data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h1 className="loading">Loading...</h1>;
  }

  return (
    <div className="covid-app">
      <h1>COVID-19 Coronavirus Stats</h1>
      <GlobalStatistics stats={covidData.Global} />
      <CountriesStatistics countries={covidData.Countries} />
    </div>
  );
}

export default App;
