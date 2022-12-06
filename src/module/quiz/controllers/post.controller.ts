import { Controller, Get, Body, Post,HttpCode, UsePipes, ValidationPipe, UseGuards, Delete, Put } from '@nestjs/common';
import { LatAndLngDto } from '../../../module/dto/geo-location.dto';
import { JwtAuthGuard } from '../../../modules/auth/jwt-auth.guard';
import { CreatePostDto } from '../../dto/createPost.dto';
import { PostService } from '../services/post.service';

@Controller('post')
export class PostController {
    constructor( private readonly postService:PostService){}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    getAllPost(){
        return this.postService.getAllPost()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getpostById(@Body('id') id: number){
        return await this.postService.getPostById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createpost(@Body() postData: CreatePostDto ){
        return await this.postService.createNewPost(postData);
    }

    @UseGuards(JwtAuthGuard)
    @Get('postStatus')
    async getActiveInactivePost(@Body('status') status: string):Promise<any>{  // send active/inactive to get those post
        return await this.postService.getActiveInactivePost(status);
    }
    @UseGuards(JwtAuthGuard)
    @Get('geoLocationPost')
    async getPostOnGeoLocation(@Body('geoLocationInput') latitudeLongitude: LatAndLngDto ): Promise<any>{
        return await this.postService.getPostOnGeoLocation(latitudeLongitude)
    }


    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    async deletePost(post_id: number,user_id: number ){
        return await this.postService.deletePost(post_id,user_id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    async updatePost(@Body() postData: CreatePostDto,user_id: number){
        await this.postService.updatePost(postData,user_id);
    }
}
