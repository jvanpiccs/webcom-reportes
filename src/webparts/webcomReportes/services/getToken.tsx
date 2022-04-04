import {
  HttpClient,
  IHttpClientOptions,
  HttpClientResponse,
} from '@microsoft/sp-http';

export function getToken(context): Promise<HttpClientResponse> {
  const postURL =
    'https://prod-01.westus.logic.azure.com:443/workflows/c8e4ced358c44e55b9b4cb5322fd799e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hsx7H3QCkF6EwiMt76Az1gs6an1cttwkw834XsAx0Lw';
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

  return context.httpClient
    .post(postURL, HttpClient.configurations.v1, httpClientOptions)
    .then((response: HttpClientResponse): Promise<HttpClientResponse> => {
      return response.json();
    });
}
