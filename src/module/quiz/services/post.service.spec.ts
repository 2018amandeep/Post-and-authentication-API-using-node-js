import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { PostService } from './post.service';


describe('PostService', () => {
  let service: PostService;

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


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService,{
        provide:getRepositoryToken(Post),
        useValue:mockPostRepository
      }
    ],
    })
    .compile();
    
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all the posts', () => {
    const res = service.getAllPost();
    expect(res).toBeTruthy();
  });

  it('should return all the posts', () => {
    const res = service.getPostById(1);
    expect(res).toBeTruthy();
  });

  it('should return all the posts', () => {
    const res = service.createNewPost({
      body : "fake_body",
      title : "fake_title",
      user_id: 1,
      latitude : 324,
      longitude:234
    });
    expect(res).toBeTruthy();
  });

  it('should return all the posts', () => {
    const res = service.getPostOnGeoLocation({
      latitude : 324,
      longitude:234
    });
    expect(res).toBeTruthy();
  });
 
});