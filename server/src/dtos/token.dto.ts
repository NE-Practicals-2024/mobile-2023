import { IsNumberString, Length, Matches } from "class-validator"

export class PurchaseTokenDTO {

    @Matches(/^(?:[1-9]\d*|0{1,2})00$/, { message: "Amount should be divisible by 100 and greater than 100" })
    amount: number;

    @IsNumberString()
    @Length(6, 6)
    meter: string;

}