import { ReactElement } from "react";
import styles from "./styles.module.css";

const GlobalStatistics = ({
  stats,
}: {
  stats: Record<string, number>;
}): ReactElement => {
  return (
    <div className={styles.globalStats}>
      <div className={styles.stat}>
        <h2>Coronavirus Cases:</h2>
        <h3 className={styles.confirmed}>{stats.TotalConfirmed}</h3>
      </div>
      <div className={styles.stat}>
        <h2>Coronavirus Deaths:</h2>
        <h3 className={styles.deaths}>{stats.TotalDeaths}</h3>
      </div>
      <div className={styles.stat}>
        <h2>Coronavirus Recovries:</h2>
        <h3 className={styles.recovered}>{stats.TotalRecovered}</h3>
      </div>
    </div>
  );
};

export default GlobalStatistics;
