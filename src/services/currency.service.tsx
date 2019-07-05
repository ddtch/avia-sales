import axios from 'axios';

class CurrencyService {

  getRates(currency?: string): Promise<any> {
    const serverUrl = `https://www.cbr-xml-daily.ru/daily_json.js`;
    return axios.get(serverUrl).then(resp => currency ? resp.data.Valute[currency] : resp.data.Valute);
  }
}

const currencyService = new CurrencyService();

export default currencyService;
