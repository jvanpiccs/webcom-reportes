import {
  HttpClient,
  IHttpClientOptions,
  HttpClientResponse,
} from '@microsoft/sp-http';
import { useContext } from 'react';
import { ReportesStateContext } from '../context/ReportesContext';

export function getData(context): Promise<HttpClientResponse> {
  const postURL =
    'https://prod-28.westus.logic.azure.com:443/workflows/db055f617b344e6b804787a527b595d0/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DAd9YKen7XAEHkBuYBdhOkuumy5GgjSa8PYcj7YeIKU';
  const body: string = JSON.stringify({
    userEmail: 'juan.picco1@claro.com.ar',
  });
  const requestHeaders: Headers = new Headers();
  requestHeaders.append('Content-type', 'application/json');
  requestHeaders.append('Authorization', '');

  const httpClientOptions: IHttpClientOptions = {
    body: body,
    headers: requestHeaders,
  };
  console.log('startFlow');

  return context.httpClient
    .post(postURL, HttpClient.configurations.v1, httpClientOptions)
    .then((response: HttpClientResponse): Promise<HttpClientResponse> => {
      console.log(response.json());
      return response.json();
    });
}
