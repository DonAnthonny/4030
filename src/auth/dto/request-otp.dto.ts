// src/auth/dto/request-otp.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class RequestOtpDto {
  @ApiProperty({ example: '+989123456789', description: 'شماره موبایل' })
  @IsPhoneNumber('IR')
  phone: string;
}
