import { IsString, IsOptional } from 'class-validator';

export class Step2LocationDto {
  @IsString() city: string;
  @IsString() address: string;
  @IsOptional()
  @IsString()
  refCode?: string;
}
