import {
    API,
    GAMEID,
    GAMES,
    GENSHINIMPACT_API,
    HONKAIIMPACT3RD_API,
    HONKAISTARRAIL_API,
    ZENLESSZONEZERO_API,
} from "../../types";

export function getEvent(game: GAMES) {
    switch (game) {
        case GAMES.HONKAI_IMPACT:
            return "mani";
        case GAMES.GENSHIN_IMPACT:
            return "sol";
        case GAMES.HONKAI_STAR_RAIL:
            return "luna/os";
        case GAMES.ZENLESS_ZONE_ZERO:
            return "luna/zzz/os";
        default:
            return "";
    }
}

export function eventUrl(game: GAMES) {
    if (game === GAMES.GENSHIN_IMPACT) {
        return API.HK4E;
    } else if (
        [
            GAMES.HONKAI_IMPACT,
            GAMES.HONKAI_STAR_RAIL,
            GAMES.ZENLESS_ZONE_ZERO,
        ].includes(game)
    ) {
        return API.PUBLIC;
    }

    return "";
}

export function actId(game: GAMES) {
    switch (game) {
        case GAMES.HONKAI_IMPACT:
            return "e202110291205111";
        case GAMES.GENSHIN_IMPACT:
            return "e202102251931481";
        case GAMES.HONKAI_STAR_RAIL:
            return "e202303301540311";
        case GAMES.ZENLESS_ZONE_ZERO:
            return "e202406031448091";
        default:
            return "";
    }
}

export function redeemClaimAPI(game: GAMES) {
    switch (game) {
        case GAMES.HONKAI_IMPACT:
        case GAMES.GENSHIN_IMPACT:
            return `${API.HK4E}/common/apicdkey/api/webExchangeCdkeyHyl`;
        case GAMES.HONKAI_STAR_RAIL:
            return `${API.HKRPG}/common/apicdkey/api/webExchangeCdkeyHyl`;
        case GAMES.ZENLESS_ZONE_ZERO:
            return "https://public-operation-nap.hoyolab.com/common/apicdkey/api/webExchangeCdkeyHyl";
        default:
            return "";
    }
}

export function GetGameByID(game: GAMEID) {
    switch (game) {
        case GAMEID.GENSHIN_IMPACT:
            return GAMES.GENSHIN_IMPACT;
        case GAMEID.HONKAI_STAR_RAIL:
            return GAMES.HONKAI_STAR_RAIL;
        case GAMEID.HONKAI_IMPACT_3RD:
            return GAMES.HONKAI_IMPACT;
        case GAMEID.ZENLESS_ZONE_ZERO:
            return GAMES.ZENLESS_ZONE_ZERO;
    }
}

export function GetGameAPIByGame(game: GAMES) {
    switch (game) {
        case GAMES.GENSHIN_IMPACT:
            return GENSHINIMPACT_API;
        case GAMES.HONKAI_IMPACT:
            return HONKAIIMPACT3RD_API;
        case GAMES.HONKAI_STAR_RAIL:
            return HONKAISTARRAIL_API;
        case GAMES.ZENLESS_ZONE_ZERO:
            return ZENLESSZONEZERO_API;
    }
}

export function RedeemtionCodeAPI(game: GAMES) {
    return GetGameAPIByGame(game).REDEEMTIONCODES;
}

export function DailyInfoAPI(game: GAMES) {
    return `${eventUrl(game)}/event/${getEvent(game)}/info?act_id=${actId(
        game
    )}`;
}

export function DailyRewardAPI(game: GAMES) {
    return `${eventUrl(game)}/event/${getEvent(game)}/home?act_id=${actId(
        game
    )}`;
}

export function DailyClaimAPI(game: GAMES) {
    return `${eventUrl(game)}/event/${getEvent(game)}/sign?act_id=${actId(
        game
    )}`;
}
