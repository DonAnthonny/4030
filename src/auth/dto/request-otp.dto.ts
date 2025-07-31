import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsOptional, IsIn } from 'class-validator';

export class RequestOtpDto {
  @ApiProperty({ example: '+989123456789', description: 'شماره موبایل' })
  @IsPhoneNumber('IR')
  phone: string;

  @ApiProperty({ example: 'car', enum: ['car', 'vanet', 'motor'], required: false })
  @IsOptional()
  @IsIn(['car', 'vanet', 'motor'])
  type?: 'car' | 'vanet' | 'motor'; // اگر راننده است
}
