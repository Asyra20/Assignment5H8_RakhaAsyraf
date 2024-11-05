import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [currency, setCurrency] = useState([]);
  // Fetch Data
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=e9fce07ef1ac462d8b05008dd5571390&symbols=CAD,IDR,JPY,CHF,EUR,GBP"
        );
        const fetchedRates = response.data.rates;
        const mataUang = ["CAD", "EUR", "IDR", "JPY", "CHF", "GBP"];
        const processedRates = Object.entries(fetchedRates)
          .map(([currency, rate]) => {
            const exchangeRate = parseFloat(rate).toFixed(4);
            return {
              currency,
              exchangeRate,
              weBuy: (exchangeRate * 1.05).toFixed(4),
              weSell: (exchangeRate * 0.95).toFixed(4),
            };
          })
          .sort(
            (a, b) =>
              mataUang.indexOf(a.currency) - mataUang.indexOf(b.currency)
          );

        setCurrency(processedRates);
      } catch (error) {
        console.error("Error fetching rates", error);
      }
    };

    fetchRates();
  }, []);

  return (
    // Tampilan Web
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f58220",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <table
            className="table table-borderless"
            style={{
              maxWidth: "600px",
            }}
          >
            <thead>
              <tr>
                <th scope="col">Currency</th>
                <th scope="col">We Buy</th>
                <th scope="col">Exchange Rate</th>
                <th scope="col">We Sell</th>
              </tr>
            </thead>
            <tbody>
              {currency.map((rate) => (
                <tr key={rate.currency}>
                  <td>{rate.currency}</td>
                  <td>{rate.weBuy}</td>
                  <td>{rate.exchangeRate}</td>
                  <td>{rate.weSell}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3">Rates are based from 1 USD.</p>
        <p>
          This application uses API from{" "}
          <a
            href="https://currencyfreaks.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", textDecoration: "underline" }}
          >
            https://currencyfreaks.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default App;
