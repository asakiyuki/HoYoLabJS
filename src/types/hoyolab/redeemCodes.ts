export interface RedeemtionCode {
    codes: Code[];
}

interface Code {
    rewards: string;
    code: string;
}
