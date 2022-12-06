import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const user = {
    name: "fake",
    email:"fake@mail.com"
  }

  const mockService = {
    generateToken :jest.fn(()=>{
      return user;
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers:[AuthService]
    }).overrideProvider(AuthService).useValue(mockService)
    .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all the posts', () => {
    const res = controller.login({
      username: "fake"
    });
    expect(res).toBeTruthy();
  });
  it('should return all the posts', () => {
    const res = controller.user({username: "fake"});
    expect(res).toBeTruthy();
  });

});
