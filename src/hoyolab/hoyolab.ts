import { HTTPRequest } from "../request";
import {
    LANGUAGE,
    HoYoLabUserBriefInfo,
    HoYoLabGetGameRecordCard,
    HoYoLabGameRecordCard,
    GAMEID,
    HSRServer,
    UserFullInfo,
} from "../types";
import { HoYoLabFull, HOYOLAB_API } from "../types";
import {
    GenshinImpact,
    HonkaiImpact3rd,
    HonkaiStarRail,
    ZenlessZoneZero,
} from "./games";

export class HoYoLab {
    private request: HTTPRequest;

    constructor(private cookie: string, private language?: LANGUAGE) {
        this.request = HTTPRequest.register(cookie, language);
    }

    honkaiImpact3rd() {
        return new HonkaiImpact3rd(this.cookie, this.language);
    }

    genshinImpact() {
        return new GenshinImpact(this.cookie, this.language);
    }

    honkaiStarRail(server?: HSRServer) {
        return new HonkaiStarRail(this.cookie, server, this.language);
    }

    zenlessZoneZero() {
        return new ZenlessZoneZero(this.cookie, this.language);
    }

    async full(): Promise<HoYoLabFull> {
        return await this.request.fetchData(HOYOLAB_API.FULL);
    }

    async userBriefInfo(): Promise<HoYoLabUserBriefInfo> {
        return await this.request.fetchData(HOYOLAB_API.USER_BRIEF_INFO);
    }

    async getGameRecordCard(
        uid?: string | number
    ): Promise<HoYoLabGetGameRecordCard> {
        if (!uid) {
            const fullInfo = await this.full();
            uid = fullInfo.user_info.uid;
        }

        return await this.request.fetchData(HOYOLAB_API.GET_GAME_RECORD_CARD, {
            params: { uid },
        });
    }

    async getUserFullInfo(gid: number = 2): Promise<UserFullInfo> {
        return await this.request.fetchData(HOYOLAB_API.GET_USER_FULL_INFO, {
            flag: false,
            params: {
                gid,
            },
        });
    }

    async gameRecordCard(
        url?: string | number
    ): Promise<HoYoLabGameRecordCard> {
        const gameRecordCard: HoYoLabGameRecordCard = {};

        const gameRecordCards = await this.getGameRecordCard(url);

        for (const gameRecord of gameRecordCards.list) {
            switch (gameRecord.game_id) {
                case GAMEID.HONKAI_IMPACT_3RD:
                    gameRecordCard.honkai_impact_3rd = gameRecord;
                    break;
                case GAMEID.GENSHIN_IMPACT:
                    gameRecordCard.genshin_impact = gameRecord;
                    break;
                case GAMEID.HONKAI_STAR_RAIL:
                    gameRecordCard.honkai_star_rail = gameRecord;
                    break;
                case GAMEID.ZENLESS_ZONE_ZERO:
                    gameRecordCard.zenless_zone_zero = gameRecord;
                    break;
            }
        }

        return gameRecordCard;
    }
}
