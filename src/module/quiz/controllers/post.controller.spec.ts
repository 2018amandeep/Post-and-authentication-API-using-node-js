import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { PostService } from '../services/post.service';
import { PostController } from './post.controller';

describe('PostController', () => {
  let controller: PostController;

  const post = {
    id: 1,
    body : "fake_body",
    title : "fake_title",
    user_id: 1,
    latitude : 324,
    longitude:234
  }

  let mockPostRepository = {
    save: jest.fn().mockImplementation(dto=>Promise.resolve({id:5,...post})),
    find:jest.fn().mockImplementation(()=>Promise.resolve([{post}])),
    findOne:jest.fn((req)=>post),
    query:jest.fn(dto=>{
        return post;
      })
  }
  const mockService = {
    getAllPost: jest.fn(()=>{
      return post;
    }),
    getpostById:jest.fn(()=>{
      return post;
    }),
    createpost:jest.fn(()=>{
      return post;
    }),
    getPostOnGeoLocation:jest.fn(()=>{
      return post;
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, {
        provide:getRepositoryToken(Post),
        useValue: mockPostRepository
      }]
    }).overrideProvider(PostService).useValue(mockService).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all the posts', () => {
    const res = controller.getAllPost();
    expect(res).toBeTruthy();
  });

  it('should return all the posts', () => {
    const res = controller.getpostById(1);
    expect(res).toBeTruthy();
  });

  it('should return all the posts', () => {
    const res = controller.createpost({
      body : "fake_body",
      title : "fake_title",
      user_id: 1,
      latitude : 324,
      longitude:234
    });
    expect(res).toBeTruthy();
  });

  it('should return all the posts', () => {
    const res = controller.getPostOnGeoLocation({
      latitude : 324,
      longitude:234
    });
    expect(res).toBeTruthy();
  });
});
