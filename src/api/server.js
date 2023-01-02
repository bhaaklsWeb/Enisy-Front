import axios from 'axios';
import { getAccessToken, cleanTokensData, cleanRefTokensData, setTokens, setRefTokens, getRefToken } from '@/utils/tokens';

const baseURL = 'http://localhost:8082';
const instance = axios.create({
  baseURL,
  timeout: 10000,
});

instance.interceptors.request.use(addAccessToken);

instance.interceptors.response.use(
  r => {
    // eslint-disable-next-line
    NProgress.done()
    return r;
  },
  async error => {
    if (error.response.status !== 401) {
      return Promise.reject(error); // ошибка, не связанная с авторизацией
    }

    console.warn('refrsh: refToken in ls - ', getRefToken());
    let response = await instance.post('auth/refresh', { refreshToken: getRefToken() });
    console.warn('refrsh datas', response.data);

    if (!response.data.res) {
      error.response.config.appSilence401 = false;
      return Promise.reject(error); // прокидываем 401 код дальше
    } 

    cleanTokensData();
    cleanRefTokensData();
    setTokens(response.data.accessToken);
    setRefTokens(response.data.refreshToken);
    return axios(addAccessToken(error.config));
  }
);

export function addResponseHandler(success, error) {
  instance.interceptors.response.use(success, error);
}

export default instance;

function addAccessToken(request) {
  // eslint-disable-next-line
  NProgress.start()
  let token = getAccessToken();

  if (token !== null) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}