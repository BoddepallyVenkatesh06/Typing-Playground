import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useTheme } from "../Context/ThemeContext";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function Graph({ graphData }) {
  const { theme } = useTheme();
  console.log(graphData);
  return (
    <>
      <Line
        data={{
          labels: graphData.map((i) => i[0]),
          datasets: [
            {
              type: "line",
              data: graphData.map((i) => i[1]),
              label: "wpm",
              borderColor: theme.title,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Time in Seconds",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Words per minute",
              },
            },
          },
        }}
      />
    </>
  );
}

export default Graph;
