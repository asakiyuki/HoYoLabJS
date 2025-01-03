import { createHash } from "crypto";

import { LANGUAGE } from "../types";
import { httpRequests } from "./request.memory";
import { HTTPHeaders, HTTPQueryParams, HTTPRequestInit } from "./";

export class HTTPRequest {
    private headers: HTTPHeaders = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "sec-ch-ua":
            '"Chromium";v="112", "Microsoft Edge";v="112", "Not:A-Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.46",
        "x-rpc-app_version": "1.5.0",
        "x-rpc-client_type": "5",
    };

    static register(cookie: string, lang?: LANGUAGE) {
        if (httpRequests[cookie]) {
            const http = httpRequests[cookie];

            if (lang) {
                http.setLanguage(lang);
            }
            return http;
        } else {
            return new HTTPRequest(cookie, lang);
        }
    }

    constructor(cookie: string, lang?: LANGUAGE) {
        this.headers = {
            ...this.headers,
            "x-rpc-language": lang || LANGUAGE.ENGLISH,
            Cookie: cookie,
        };
    }

    setLanguage(lang: LANGUAGE) {
        this.headers = {
            ...this.headers,
            "x-rpc-language": lang,
        };
    }

    getDs() {
        const t = Math.floor(new Date().getTime() / 1000);

        const r = Array.from(
            { length: 6 },
            () =>
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[
                    Math.floor(Math.random() * 52)
                ]
        ).join("");

        return `${t},${r},${createHash("md5")
            .update(`salt=6s25p5ox5y14umn1p61aqyyvbvvl3lrt&t=${t}&r=${r}`)
            .digest("hex")}`;
    }

    queryParamsBuilder(params: HTTPQueryParams) {
        let urlParams = ``;

        for (const paramKey in params) {
            const paramValue = params[paramKey];

            if (typeof paramValue === "string") {
                urlParams += `&${paramKey}=${encodeURIComponent(paramValue)}`;
            } else {
                urlParams += `&${paramKey}=${paramValue}`;
            }
        }

        return urlParams.slice(1);
    }

    async fetch(url: string, init?: HTTPRequestInit) {
        const headers = this.headers;

        if (init?.requireCookie === false) {
            delete (<any>headers)["Cookie"];
        }
        init?.requireCookie;

        if (init?.body && init.body.constructor.name === "Object") {
            init.body = JSON.stringify(init.body);
        }

        if (init?.params) {
            if (typeof init.params === "string") {
                if (init.params[0] === "?") {
                    url += init.params;
                } else {
                    url += `?${init.params}`;
                }
            } else {
                url += `?${this.queryParamsBuilder(init.params)}`;
            }

            delete init.params;
        }

        if (init?.flag) {
            (<any>headers).DS = this.getDs();
        }
        delete init?.flag;

        return await fetch(url, {
            ...(<RequestInit>init),
            headers,
        });
    }

    async fetchJson(url: string, init?: HTTPRequestInit) {
        const response = await this.fetch(url, init);
        return response.json();
    }

    async fetchData(url: string, init?: HTTPRequestInit) {
        const json = await this.fetchJson(url, init);

        if (json.retcode === 0) {
            return json.data;
        } else {
            return json;
        }
    }
}
