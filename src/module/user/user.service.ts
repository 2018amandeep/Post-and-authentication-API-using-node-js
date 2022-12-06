import { Injectable, UnauthorizedException,HttpException, HttpStatus } from "@nestjs/common";
import { UserRegistrationDto } from "./dto/user-register.req.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";



@Injectable()
export class UserService{
    constructor( @InjectRepository(User) private userRepository: Repository<User>){}

    async createUser(userInput: UserRegistrationDto): Promise<User>{
        
        let existing_user = await this.userRepository.findOne({
            where:{
                email: userInput.email
            }
        });
        if(existing_user){
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'User Already Exist',
              }, HttpStatus.FORBIDDEN,
        )}

        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(userInput.password,salt);
        const user = new User();
        user.name = userInput.name;
        user.email = userInput.email;
        user.password = password;
        user.createdAt = new Date().getTime();
        user.updatedAt = new Date().getTime();

        return await user.save();
    }

    async getUserByEmail(email: string): Promise<User>{
        const user = await this.userRepository.findOne({
            where:{
                email: email
            }
        });
        if(!user && user === undefined){
            throw new UnauthorizedException();
        }
        return user;
    }
}