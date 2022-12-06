import { IsNotEmpty, Length } from 'class-validator';

export class CreatePostDto{

    @IsNotEmpty({message: "This field should have title"})
    @Length(3,255)
    title: string;

    @IsNotEmpty({message:"This field should have body"})
    @Length(3,255)
    body: string;

    @IsNotEmpty({message: "This field should have geo location"})
    @Length(3,255)
    latitude: number;  

    @IsNotEmpty({message: "This field should have geo location"})
    @Length(3,255)
    longitude: number;  

    @IsNotEmpty()
    @Length(3,255)
    user_id: number;   

}