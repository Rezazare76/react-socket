import { useEffect, useState, useRef } from "react";
import { CoinValueState, prevRef } from "../../interfaces/CoinValueState";
import style from "./CoinValue.module.scss";
import bnb from "../../assets/images/bnb.svg";
import ethereum from "../../assets/images/ethereum.svg";
import aave from "../../assets/images/aave.svg";
import agix from "../../assets/images/agix.svg";
import alphaca from "../../assets/images/alphaca.svg";
import bitcoin from "../../assets/images/bitcoin.svg";
import doge from "../../assets/images/doge.svg";
import link from "../../assets/images/link.svg";
import waves from "../../assets/images/waves.svg";
import xrp from "../../assets/images/xrp.svg";
// coins list
const symbols: { [index: string]: string } = {
  BTCUSDT: bitcoin,
  ETHUSDT: ethereum,
  XRPUSDT: xrp,
  BNBUSDT: bnb,
  LINKUSDT: link,
  WAVESUSDT: waves,
  DOGEUSDT: doge,
  AAVEUSDT: aave,
  AGIXUSDT: agix,
  ALPACAUSDT: alphaca,
};

const CoinValue: React.FC = () => {
  const [priceData, setPriceData] = useState<CoinValueState>({}); // State to store current prices for each symbol
  const prevPriceDataRef = useRef<{ [symbol: string]: prevRef }>({}); // Ref to store previous prices
  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const updatedPriceData: CoinValueState = {};

      for (const entry of data) {
        if (symbols[entry.s]) {
          const symbol = entry.s;
          const current = parseFloat(entry.c).toFixed(3);
          const prev = prevPriceDataRef.current[symbol]?.current || "N/A";
          updatedPriceData[symbol] = {
            current: current,
            prev: prev,
            changeDay: parseFloat(entry.p).toFixed(2),
            highDay: parseFloat(entry.h).toFixed(2),
            LowDay: parseFloat(entry.l).toFixed(2),
          };
          prevPriceDataRef.current[symbol] = { current };
        }
      }

      setPriceData((prevPrices) => ({
        ...prevPrices,
        ...updatedPriceData,
      }));
    };
    // Clean up WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, []);
  return (
    <table
      className={`${style.table} p-2 text-center rounded-3 overflow-hidden`}
    >
      <tr className="vertical-top">
        <th>Names</th>
        <th>Current Price</th>
        <th> Previous Price</th>
        <th>24h Change</th>
        <th>24h High</th>
        <th>24h Low</th>
      </tr>
      {Object.keys(priceData).map((symbol) => (
        <tr key={symbol}>
          <td className="d-flex align-items-center">
            <img
              src={symbols[symbol]}
              alt={symbol}
              width="25px"
              className="rounded-circle"
            />
            {symbol}
          </td>
          <td
            className={`${
              priceData[symbol].current > priceData[symbol].prev
                ? "text-success "
                : "text-danger"
            }`}
          >
            {priceData[symbol].current}
          </td>
          <td>{priceData[symbol].prev}</td>
          <td>{priceData[symbol].changeDay}</td>
          <td>{priceData[symbol].highDay}</td>
          <td>{priceData[symbol].LowDay}</td>
        </tr>
      ))}
    </table>
  );
};
export default CoinValue;
