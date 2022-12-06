import { Repository, EntityRepository } from "typeorm";
import { Post } from "./entities/post.entity";

@EntityRepository(Post)
export class PostRepository extends Repository<Post>{

}