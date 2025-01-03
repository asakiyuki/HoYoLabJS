import { GAMEID } from "../game.interface";
import { HSRServer } from "../server.interface";
import { GAMELOGO } from "./game_logo";

export interface HoYoLabGetGameRecordCard {
    list: RecordCard[];
}

export interface HoYoLabGameRecordCard {
    honkai_impact_3rd?: RecordCard;
    genshin_impact?: RecordCard;
    honkai_star_rail?: RecordCard;
    zenless_zone_zero?: RecordCard;
}

export interface RecordCard {
    has_role: boolean;
    game_id: GAMEID;
    game_role_id: string;
    nickname: string;
    region: HSRServer;
    level: number;
    background_image: string;
    is_public: boolean;
    data: Datum[];
    region_name: string;
    url: string;
    data_switches: Dataswitch[];
    h5_data_switches: any[];
    background_color: string;
    background_image_v2: string;
    logo: GAMELOGO;
    game_name: string;
}

interface Dataswitch {
    switch_id: number;
    is_public: boolean;
    switch_name: string;
}

interface Datum {
    name: string;
    type: number;
    value: string;
}
