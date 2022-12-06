import { ValidationPipe } from  '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const VALIDATION_PIPE = new ValidationPipe({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})

export const MESSAGES = {
    PASSWORD_REGEX_MESSAGE : "Password should have 1 upper case, lower case along with special character"
}

export const REGEX = {
    PASSWORD_REGEX
}

export const SETTINGS = {
    VALIDATION_PIPE
}