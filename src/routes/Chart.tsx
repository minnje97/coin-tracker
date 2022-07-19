import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { darkTheme } from "../theme";
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

export interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId!),
    { refetchInterval: 10000 }
  );
  console.log(data);
  const dataFunction = (data: IHistorical[], n: number) => {
    return {
      x: data[n].time_close,
      y: [data[n].open, data[n].close, data[n].high, data[n].low],
    };
  };
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ReactApexChart
          type="candlestick"
          series={[
            {
              data: [
                dataFunction(data!, 20),
                dataFunction(data!, 19),
                dataFunction(data!, 18),
                dataFunction(data!, 17),
                dataFunction(data!, 16),
                dataFunction(data!, 15),
                dataFunction(data!, 14),
              ],
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              height: 600,
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
