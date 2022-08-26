import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import GlobalStatistics from "./components/GlobalStatistics";

interface CovidData {
  Global: Record<string, number>;
  Countries: Record<string, unknown>[];
}

function App() {
  const [covidData, setCovidData] = useState<CovidData>({
    Global: {},
    Countries: [],
  });

  useEffect(() => {
    axios
      .get("https://api.covid19api.com/summary")
      .then((response: AxiosResponse) => setCovidData(response.data));
  }, []);

  return (
    <div className="covid-app">
      <h1>COVID-19 Coronavirus Stats</h1>
      <GlobalStatistics stats={covidData.Global} />
    </div>
  );
}

export default App;
