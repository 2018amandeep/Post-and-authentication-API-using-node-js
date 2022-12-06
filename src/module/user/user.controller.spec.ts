import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const user = {
    email:"fake@email.com",
    password:"13433433"
  }
  const mockUserRepository = {
    findOne:jest.fn((req)=>{
        if(req && req.where.email === "fake@example.com"){
            return undefined;
        }
        return user
    }),
  }

  const mockService = {
    createUser: jest.fn(()=>{
      return user;
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserService],
      providers: [UserService,{
        provide:getRepositoryToken(User),
        useValue: mockUserRepository
      },]
    }).overrideProvider(UserService).useValue(mockService).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', () => {
    const res = controller.createUser({
        name:"fake",
        email:"fake@example.com",
        password:"Test123#",
        reEnterPassword:"Test123#"
    });
    expect(res).toBeTruthy();
  });
});
