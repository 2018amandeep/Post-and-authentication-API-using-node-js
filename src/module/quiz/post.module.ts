import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './controllers/post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './services/post.service';

@Module({
  controllers: [PostController],
  imports: [TypeOrmModule.forFeature([PostRepository])],
  providers:[PostService]
})
export class QuizModule {}
