import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
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
        <ReactApexChart
          type="candlestick"
          series={[
            {
              data: [
                {
                  x: new Date(),
                  y: data?.map((price) => [
                    price.open,
                    price.high,
                    price.low,
                    price.close,
                  ]),
                },
              ],
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              height: 350,
              width: 600,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
