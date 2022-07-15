import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import { TickersData } from "./Coin";
import styled from "styled-components";

interface PriceProps {
  coinId: string;
}

const PriceDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceInfo = styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<TickersData>(["tickers", coinId], () =>
    fetchCoinTickers(coinId!)
  );
  return (
    <div>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <PriceDiv>
          <PriceInfo>✅ Last updated at {data?.last_updated}</PriceInfo>
          <PriceInfo>
            📌 Circulating supply: {data?.circulating_supply}
          </PriceInfo>
          <PriceInfo>
            💡 Market cap change 24h: {data?.quotes.USD.market_cap_change_24h}
          </PriceInfo>
          <PriceInfo>
            💡 Volume change 24h: {data?.quotes.USD.volume_24h_change_24h}
          </PriceInfo>
        </PriceDiv>
      )}
    </div>
  );
}

export default Price;
