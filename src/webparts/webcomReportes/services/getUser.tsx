import {
  HttpClient,
  IHttpClientOptions,
  HttpClientResponse,
} from '@microsoft/sp-http';

export function getUser(context, dispatch): Promise<HttpClientResponse> {
  const postURL =
    'https://prod-152.westus.logic.azure.com:443/workflows/e6d5598c4016499cb697caf459232b71/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AvP2FLP38vvxAtDEg-YDBcUecH_h7g14uHeS-2SvwaI';
  const body: string = JSON.stringify({
    Email: 'juan.picco1@claro.com.ar',
  });

  const requestHeaders: Headers = new Headers();
  requestHeaders.append('Content-type', 'application/json');
  requestHeaders.append('Authorization', '');

  const httpClientOptions: IHttpClientOptions = {
    body: body,
    headers: requestHeaders,
  };

  return context.httpClient
    .post(postURL, HttpClient.configurations.v1, httpClientOptions)
    .then((response: HttpClientResponse): Promise<HttpClientResponse> => {
      try {
        return response.json();
      } catch (error) {
        return error;
      }
    });
}
