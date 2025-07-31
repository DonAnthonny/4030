import { IsNotEmpty } from 'class-validator';

export class Step3LicenseFrontDto {
  @IsNotEmpty()
  licenseFront: Express.Multer.File;
}