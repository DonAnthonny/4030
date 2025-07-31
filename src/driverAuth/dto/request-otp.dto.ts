import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsIn } from 'class-validator';

export class RequestOtpDto {
  @ApiProperty({ example: '+989123456789' })
  @IsPhoneNumber('IR')
  phone: string;

  @ApiProperty({ example: 'car', enum: ['car', 'vanet', 'motor'] })
  @IsIn(['car', 'vanet', 'motor'])
  type: 'car' | 'vanet' | 'motor';
}
