import { useState, useMemo } from "react";

const exchangeRate = {
  USD: {
    value: 1,
    name: "US Dollar",
  },
  EUR: {
    value: 0.85,
    name: "Euro",
  },
  GBP: {
    value: 0.75,
    name: "British Pound",
  },
  JPY: {
    value: 110.0,
    name: "Japanese Yen",
  },
};

const quickAmounts = [1, 10, 100, 1000];

const currencyOptions = Object.keys(exchangeRate);

function App() {
  const [startCurrency, setStartCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [startAmount, setStartAmount] = useState(1);

  function handleStartCurrency(e) {
    setStartCurrency(e.target.value);
  }

  function handleTargetCurrency(e) {
    setTargetCurrency(e.target.value);
  }

  function handleStartAmount(e) {
    const value = e.target.value;
    setStartAmount(value === "" ? 0 : Number(value));
  }

  function handleSwapCurrencies() {
    setStartCurrency(targetCurrency);
    setTargetCurrency(startCurrency);
  }

  const rateFactor =
    exchangeRate[targetCurrency].value / exchangeRate[startCurrency].value;

  const result = useMemo(() => {
    const converted = {};

    for (const currency in exchangeRate) {
      converted[currency] =
        startAmount *
        (exchangeRate[currency].value / exchangeRate[startCurrency].value);
    }
    return converted;
  }, [startAmount, startCurrency]);

  return (
    <main>
      <article className="converter" aria-labelledby="converter-title">
        {/* Header */}
        <header className="converter-header">
          <h1 id="converter-title">Currency Converter</h1>
        </header>

        {/* Main Content */}
        <div className="converter-main">
          <section className="converter-form-section">
            <form id="converter-form">
              <div className="field">
                <label htmlFor="amount">Amount</label>
                <div className="amount-wrap">
                  <input
                    type="number"
                    name="amount"
                    min="1"
                    value={startAmount}
                    onChange={handleStartAmount}
                  />
                  <span className="unit" aria-hidden="true">
                    {startCurrency}
                  </span>
                </div>
              </div>

              <fieldset className="currency-pair">
                <legend className="visually-hidden">Currencies</legend>

                <div className="field">
                  <label htmlFor="from">From</label>
                  <select
                    name="from"
                    id="from"
                    value={startCurrency}
                    onChange={handleStartCurrency}
                  >
                    {currencyOptions.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  className="swap"
                  aria-label="Swap currencies"
                  onClick={handleSwapCurrencies}
                >
                 <span aria-hidden="true">⇄</span>
                </button>

                <div className="field">
                  <label htmlFor="to">To</label>
                  <select
                    name="to"
                    id="to"
                    value={targetCurrency}
                    onChange={handleTargetCurrency}
                  >
                    {currencyOptions.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>
            </form>
          </section>

          <aside className="result" aria-labelledby="result-heading">
            <h2 id="result-heading">Converted amount</h2>
            <p className="result-intro">
              {startAmount} {exchangeRate[startCurrency].name} equals
            </p>

            <output
              form="converter-form"
              htmlFor="amount from to"
              aria-live="polite"
            >
              <strong>{result[targetCurrency].toFixed(2)}</strong>{" "}
              <span>{targetCurrency}</span>
            </output>
            <p className="result-name">{exchangeRate[targetCurrency].name}</p>
          </aside>
        </div>

        {/* Quick reference */}
        <section className="quick-reference" aria-labelledby="quick-heading">
          <header className="section-head">
            <h2 id="quick-heading">Quick reference</h2>
            <p>
              <abbr title={exchangeRate[startCurrency].name}>
                {startCurrency}
              </abbr>{" "}
              →{" "}
              <abbr title={exchangeRate[targetCurrency].name}>
                {targetCurrency}
              </abbr>
            </p>
          </header>

          <ul className="reference-grid">
            {quickAmounts.map((amount) => (
              <li key={amount}>
                <span>
                  {amount} {startCurrency}
                </span>
                <strong>{(amount * rateFactor).toFixed(2)}</strong>{" "}
                <span>{targetCurrency}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer className="converter-footer">
          <p>A basic app, yeah?</p>
        </footer>
      </article>
    </main>
  );
}

export default App;
