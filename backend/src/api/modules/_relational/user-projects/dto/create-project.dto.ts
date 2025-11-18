import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserProjectDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;
}
