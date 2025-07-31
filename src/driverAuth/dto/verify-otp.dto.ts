import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({ example: '+989123456789' })
  @IsPhoneNumber('IR')
  phone: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  otp: string;
}
