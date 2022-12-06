import { Controller, Post,Body,ValidationPipe } from  '@nestjs/common';
import { SETTINGS } from '../../app.util';
import { UserRegistrationDto } from './dto/user-register.req.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController{
    constructor(private userService: UserService){}

    @Post('/registration')
    async createUser(@Body(SETTINGS.VALIDATION_PIPE) userRegister: UserRegistrationDto): Promise<User>{
        return await this.userService.createUser(userRegister);
    }

}