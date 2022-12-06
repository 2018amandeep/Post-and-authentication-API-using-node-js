import { IsNotEmpty, Length } from 'class-validator';

export class LatAndLngDto{

    @IsNotEmpty({message: "This field should have geo location"})
    @Length(3,255)
    latitude: number;  

    @IsNotEmpty({message: "This field should have geo location"})
    @Length(3,255)
    longitude: number;  


}