import { Injectable ,UnauthorizedException} from '@nestjs/common';
import { UserService } from '../../module/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService){}
    async validateUserCredentials(email: string, password: string): Promise <any>{
        const user = await this.userService.getUserByEmail(email);
        console.log(user,"user")
        if(user){
            if(! await bcrypt.compare(password,user.password)){
                throw new UnauthorizedException()
            }
        }
        return user;
    }

    generateToken(user:any){
        return {
            access_token: this.jwtService.sign({
                name: user.name,
                sub: user.id
            }),
        };
    }
}
