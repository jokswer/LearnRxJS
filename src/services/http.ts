import { Observable } from "rxjs";
import * as config from "../config.json";

const request$ = <T extends any>(
  endpoint: string,
  options: RequestInit = { method: "GET" }
): Observable<T> => {
  return new Observable<T>(observer => {
    fetch(`${config.url}/${endpoint}`, options)
      .then(response => response.json())
      .then(data => observer.next(data))
      .catch(error => observer.error(error))
      .finally(() => observer.complete());
  });
};

export default request$;
