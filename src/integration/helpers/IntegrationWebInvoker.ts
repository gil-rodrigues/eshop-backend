import Axios from 'axios';

const IntegrationWebInvoker = Axios.create({
  baseURL: 'http://localhost:3333'
});

export { IntegrationWebInvoker };
