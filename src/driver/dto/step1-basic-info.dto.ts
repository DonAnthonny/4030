import { IsString } from 'class-validator';

export class Step1BasicInfoDto {
  @IsString() name: string;
  @IsString() lastname: string;
  @IsString() shenasnameh: string;
  @IsString() nationalCode: string;
  @IsString() birthday: string;
  @IsString() fatherName: string;
}
