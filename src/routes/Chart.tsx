import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId!),
    { refetchInterval: 10000 }
  );
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            colors: ["#f39c12"],
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#1abc9c"], stops: [0, 100] },
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((data) => data.time_close),
            },
            grid: {
              show: false,
            },
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 400,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: { curve: "smooth", width: 5 },
            tooltip: {
              y: {
                formatter: (value) => {
                  return `$${value.toFixed(2)}`;
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
