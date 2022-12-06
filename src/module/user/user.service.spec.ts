import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../module/user/user.service';
import { User } from './user.entity';

describe('UserService', () => {
  let service: UserService;

  const user = {
    name: "fake",
    email: "fake@email.com",
    password: "pass@qwe",
    createdAt: 1233445532
  }

  const mockUserRepository = {
    findOne:jest.fn((req)=>{
        if(req && req.where.email === "fake@example.com"){
            return undefined;
        }
        return user
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,{
        provide:getRepositoryToken(User),
        useValue: mockUserRepository
      },],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', () => {
    const res = service.createUser({
        name:"fake",
        email:"fa@example.com",
        password:"Test123#",
        reEnterPassword:"Test123#"
    });
    expect(res).toBeTruthy();
  });
  it('should throw error while creating error', () => {
    try{
        const res = service.createUser({
            name:"fake",
            email:"fake@example.com",
            password:"Test123#",
            reEnterPassword:"Test123#"
        });
        expect(res).toBeTruthy();
    }catch(e){
        console.log(e)
    }
    
  });

  it("should return user", async () => {
    const res = await service.getUserByEmail("fa@eamil.com")
    expect(res).toBeTruthy();
  })

  it("should throw error ", async () => {
    try{
        const res = await service.getUserByEmail("fake@example.com")
        expect(res).toBeTruthy();
    }catch(e){
        console.log(e)
    }
  })
});
