import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.stratagey';
import { UserModule } from '../../module/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule,  PassportModule, JwtModule.register({
    secret: 'akjhfkfefhakjfgsakfgsakfkj33jkekjfkjdsafsa',
    signOptions:{expiresIn: '1d'}
  }),],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
