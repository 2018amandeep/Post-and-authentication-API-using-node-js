import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../module/user/user.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  const user = {
    name: "fake",
    email: "fake@email.com",
    password: "pass@qwe",
    createdAt: 1233445532
  }

  const mockService = {
    getUserByEmail: jest.fn(()=>{
      return user;
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,UserService,JwtService],
    }).overrideProvider(UserService).useValue(mockService).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should validate credentials", async () => {
    const res = await service.validateUserCredentials("fake@email.com","pass@qwe")
    expect(res).toBeTruthy();
  })

  it("should return error for validate credentials", async () => {
    try{
      const res = await service.validateUserCredentials("fake@email.com","pass@qwe")
    expect(res).toBeTruthy();
    }catch(e){
      console.log(e)
    }
  })

  it("should generate token", async () => {
    const res = await service.generateToken("fake@eamil.com")
    expect(res).toBeTruthy();
  })
});
