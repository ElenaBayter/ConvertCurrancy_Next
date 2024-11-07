import { useState, useEffect } from 'react';

var myHeaders = new Headers();
myHeaders.append("apikey", "NZCKJ1XnU6Sv16H9p0f8J5HjvFB446V7");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

export default function Home() {
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [result, setResult] = useState(null);
    const [currencies, setCurrencies] = useState([]);

    // Получение списка доступных валют из API при загрузке страницы
    useEffect(() => {
        fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
            .then(response => response.json())
            .then(data => setCurrencies(Object.keys(data.symbols)))
            .catch(error => console.error('Error fetching currency symbols:', error));
    }, []);

    const convertCurrency = () => {
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
            .then(response => response.json())
            .then(data => setResult(data.result))
            .catch(error => console.error('Error fetching exchange rate:', error));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Currency Converter</h1>
            <div>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    style={{ marginRight: '10px' }}
                />
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} style={{ marginRight: '10px' }}>
                    {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} style={{ marginRight: '10px' }}>
                    {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                <button onClick={convertCurrency} style={{ marginTop: '10px' }}>Convert</button>
            </div>
            {result && (
                <p style={{ marginTop: '20px' }}>{amount} {fromCurrency} is equal to {result} {toCurrency}</p>
            )}
        </div>
    );
}
