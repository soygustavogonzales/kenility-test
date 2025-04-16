import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'The username of the user', example: 'johndoe' })
  readonly username: string;

  @ApiProperty({ description: 'The password of the user', example: 'password' })
  readonly password: string;
}
