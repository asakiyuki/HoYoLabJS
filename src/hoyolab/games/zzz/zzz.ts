import { HTTPRequest } from "../../../request";
import { LANGUAGE } from "../../../types";

export class ZenlessZoneZero {
    private request: HTTPRequest;

    constructor(cookie: string, lang?: LANGUAGE) {
        this.request = HTTPRequest.register(cookie, lang);
    }
}