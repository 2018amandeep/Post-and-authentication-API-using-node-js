import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../../../module/dto/createPost.dto';
import { LatAndLngDto } from '../../../module/dto/geo-location.dto';
import { Post } from '../entities/post.entity';
import { PostRepository } from '../post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository) private postRepository: PostRepository,
  ) {}
  async getAllPost() {
    // const quizs = this.quizRepository.find()
    return await this.postRepository.find();
  }

  async getPostById(id: number): Promise<Post> {
    return await this.postRepository.findOne(id);
  }

  async createNewPost(postinput: CreatePostDto): Promise<Post> {
    let post = new Post();
    post.title = postinput.title;
    post.latitude = postinput.latitude;
    post.longitude = postinput.longitude;
    post.body = postinput.body;
    post.createdBy = postinput.user_id;
    return await this.postRepository.save(post);
  }

  async getActiveInactivePost(status: string): Promise<Post[]>{
    let post = await this.postRepository.find({
        where: {
            status: status
        }
    })
    return post;
  }

  async getPostOnGeoLocation(latLongInput: LatAndLngDto): Promise<Post>{
    const lat = latLongInput.latitude || 0;
    const lng = latLongInput.longitude || 0;
    let query = `SELECT 
    id, 
    (
       3959 *    # For miles if you want to find it in kilometers then we need to change it as 6371
       acos(cos(radians(18.18005)) * 
       cos(radians(${lat})) * 
       cos(radians(${lng}) - 
       radians(-66.75218)) + 
       sin(radians(18.18005)) * 
       sin(radians(${lat} )))
    ) AS distance 
    FROM post HAVING distance<20;`

    return await this.postRepository.query(query);
  }

  async deletePost(post_id: number, user_id: number){
    let post = await this.postRepository.findOne({
        where:{
            id: post_id,
            user_id : user_id
        }
    });
    if(post){
       return  await this.postRepository.delete(post);
    }
  }

  async updatePost(postData: CreatePostDto,user_id: number): Promise<any>{
    const post = await this.postRepository.findOne({
        where:{user_id: user_id}
    });

    if(!post){
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'No Post Found',
          }, HttpStatus.FORBIDDEN,)
      }

      post.title = postData.title;
      post.body = postData.body;
      post.latitude = postData.latitude;
      post.longitude = postData.longitude;
      return await this.postRepository.save(post);
  }

  


}
