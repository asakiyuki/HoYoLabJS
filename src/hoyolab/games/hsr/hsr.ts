import { Rewards } from "../../../modules";
import { HTTPRequest } from "../../../request";
import {
    GAMEID,
    HONKAISTARRAIL_API,
    HSRServer,
    IHSRInfo,
    LANGUAGE,
    RecordCard,
} from "../../../types";
import { HoYoLab } from "../../hoyolab";

export class HonkaiStarRail {
    private request: HTTPRequest;
    private server: HSRServer;
    private hoyolabInfo?: RecordCard;

    rewards: Rewards;

    constructor(
        private cookie: string,
        server?: HSRServer,
        private lang?: LANGUAGE
    ) {
        this.server = server || HSRServer.ASIA;
        this.request = HTTPRequest.register(cookie, lang);
        this.rewards = new Rewards(
            cookie,
            GAMEID.HONKAI_STAR_RAIL,
            server,
            lang
        );
    }

    async recordCard(): Promise<RecordCard | undefined> {
        if (this.hoyolabInfo) return this.hoyolabInfo;

        const hoyolab = new HoYoLab(this.cookie, this.lang);
        const gameRecordCard = await hoyolab
            .getGameRecordCard()
            .then((gameRecordCard) => {
                return gameRecordCard.list.find(({ game_id, region }) => {
                    return (
                        game_id === GAMEID.HONKAI_STAR_RAIL &&
                        region === this.server
                    );
                });
            });

        return (this.hoyolabInfo = gameRecordCard!);
    }

    async info(uid?: number, need_wiki: boolean = false): Promise<IHSRInfo> {
        const info = await this.request.fetchData(HONKAISTARRAIL_API.INFO, {
            flag: true,
            params: {
                server: this.server,
                role_id: uid || (await this.recordCard())?.game_role_id!,
                need_wiki,
            },
        });

        return info;
    }

    async node(uid?: number) {
        const node = await this.request.fetchData(HONKAISTARRAIL_API.NOTE, {
            flag: true,
            params: {
                server: this.server,
                role_id: uid || (await this.recordCard())?.game_role_id!,
            },
        });

        return node;
    }
}
