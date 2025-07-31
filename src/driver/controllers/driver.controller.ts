// src/driver/controllers/driver.controller.ts
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { DriverService } from '../services/driver.service';
import { Step1BasicInfoDto } from '../dto/step1-basic-info.dto';
import { Step2LocationDto } from '../dto/step2-location.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../common/guards/jwt.guard'; // فرض بر وجود گارد JWT

@Controller('driver')
@UseGuards(JwtAuthGuard)
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  // مرحله 1: اطلاعات پایه
  @Post('step1-basic')
  async handleStep1(@Body() dto: Step1BasicInfoDto, @Req() req) {
    const phone = req.user.phone;
    return this.driverService.updateStep1(phone, dto);
  }

  // مرحله 2: موقعیت مکانی یا داده‌های دیگر
  @Post('step2-location')
  async handleStep2(@Body() dto: Step2LocationDto, @Req() req) {
    const phone = req.user.phone;
    return this.driverService.updateStep2(phone, dto);
  }

  // مرحله 3: آپلود عکس روی گواهینامه (جلو)
  @Post('step3-license-front')
  @UseInterceptors(FileInterceptor('licenseFront'))
  async uploadLicenseFront(@UploadedFile() file: Express.Multer.File, @Req() req) {
    if (!file) {
      throw new BadRequestException('فایل گواهینامه جلو ارسال نشده است.');
    }
    return this.driverService.uploadLicenseFront(req.user.phone, file.path);
  }

  @Post('step4-license-back')
  @UseInterceptors(FileInterceptor('licenseBack'))
  async uploadLicenseBack(@UploadedFile() file: Express.Multer.File, @Req() req) {
    if (!file) {
      throw new BadRequestException('فایل گواهینامه عقب ارسال نشده است.');
    }
    return this.driverService.uploadLicenseBack(req.user.phone, file.path);
  }

  @Post('step5-selfie')
  @UseInterceptors(FileInterceptor('selfie'))
  async uploadSelfie(@UploadedFile() file: Express.Multer.File, @Req() req) {
    if (!file) {
      throw new BadRequestException('فایل سلفی ارسال نشده است.');
    }
    return this.driverService.uploadSelfie(req.user.phone, file.path);
  }

  @Post('step6-video')
  @UseInterceptors(FileInterceptor('video'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File, @Req() req) {
    if (!file) {
      throw new BadRequestException('فایل ویدیو ارسال نشده است.');
    }
    return this.driverService.uploadVideo(req.user.phone, file.path);
  }
}
