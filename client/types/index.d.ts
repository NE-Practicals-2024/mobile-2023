
export type PurchaseTokenInputs = {
    meter: string
    amount: string
}

export interface ITokenInfo {
    token: string,
    remainingDays: number
}

export interface IToken {
    id: string,
    meterNumber: number,
    token: string,
    amount: number,
    tokenDays: number,
    tokenStatus: NEW,
    purchasedDate: string
}