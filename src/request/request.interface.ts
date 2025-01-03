export type HTTPHeaders = HeadersInit;
export type HTTPQueryParams = Record<string, string | number | boolean>;
export type HTTPBody = object;

export type HTTPRequestMethod =
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "REMOVE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE"
    | "PATCH";

export interface HTTPRequestInit extends Omit<RequestInit, "body"> {
    method?: HTTPRequestMethod;
    headers?: HTTPHeaders;
    body?: BodyInit | string | object;
    flag?: boolean;
    params?: HTTPQueryParams | string;
    requireCookie?: boolean;
}
