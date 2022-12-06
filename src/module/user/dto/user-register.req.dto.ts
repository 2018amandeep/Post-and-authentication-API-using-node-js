import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator"
import { MESSAGES, REGEX } from "../../../app.util"

export class UserRegistrationDto{

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @Length(8,24)
    @Matches(REGEX.PASSWORD_REGEX,{
        message: MESSAGES.PASSWORD_REGEX_MESSAGE
    })
    password: string

    @IsNotEmpty()
    @Length(8,24)
    @Matches(REGEX.PASSWORD_REGEX,{
        message: MESSAGES.PASSWORD_REGEX_MESSAGE
    })
    reEnterPassword: string
}