import { HTTPRequest } from "../../request";
import {
    GAMEID,
    GAMES,
    HSRServer,
    LANGUAGE,
    RedeemtionCode,
} from "../../types";
import { GetGameByID, RedeemtionCodeAPI } from "../routes";

export class Rewards {
    private request: HTTPRequest;
    private game: GAMES;

    constructor(
        cookie: string,

        gameId?: GAMEID,
        private server?: HSRServer,
        language?: LANGUAGE
    ) {
        if (!gameId) gameId = GAMEID.HONKAI_STAR_RAIL;
        this.request = HTTPRequest.register(cookie, language);
        this.game = GetGameByID(gameId);
    }

    async redeemtionCode(): Promise<RedeemtionCode> {
        return await this.request.fetchJson(RedeemtionCodeAPI(this.game), {
            requireCookie: false,
        });
    }
}
