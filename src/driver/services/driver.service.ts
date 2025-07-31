import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver, DriverDocument } from '../schemas/driver.schema';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
  ) {}

  // Step 1: Update or create driver basic info (upsert)
  async updateStep1(phone: string, data: Partial<Driver>): Promise<Driver> {
    const driver = await this.driverModel.findOneAndUpdate({ phone }, data, {
      upsert: true,
      new: true,
    });
    if (!driver) {
      throw new NotFoundException('راننده یافت نشد.');
    }
    return driver;
  }

  // Step 2: Update driver location or other data (no upsert here)
  async updateStep2(phone: string, data: Partial<Driver>): Promise<Driver> {
    const driver = await this.driverModel.findOneAndUpdate({ phone }, data, {
      new: true,
    });
    if (!driver) {
      throw new NotFoundException('راننده یافت نشد.');
    }
    return driver;
  }

  // Upload front side of license
  async uploadLicenseFront(phone: string, filePath: string): Promise<Driver> {
    const driver = await this.driverModel.findOneAndUpdate(
      { phone },
      { licenseFront: filePath },
      { new: true },
    );
    if (!driver) {
      throw new NotFoundException('راننده یافت نشد.');
    }
    return driver;
  }

  // Upload back side of license
  async uploadLicenseBack(phone: string, filePath: string): Promise<Driver> {
  const driver = await this.driverModel.findOneAndUpdate(
    { phone },
    { licenseBack: filePath },
    { new: true }
  );
  if (!driver) throw new NotFoundException('راننده یافت نشد.');
  return driver;
}

  // Upload selfie photo
  async uploadSelfie(phone: string, filePath: string): Promise<Driver> {
  const driver = await this.driverModel.findOneAndUpdate(
    { phone },
    { selfie: filePath },
    { new: true }
  );
  if (!driver) throw new NotFoundException('راننده یافت نشد.');
  return driver;
}

  // Upload video
  async uploadVideo(phone: string, filePath: string): Promise<Driver> {
    const driver = await this.driverModel.findOneAndUpdate(
      { phone },
      { video: filePath },
      { new: true },
    );
    if (!driver) throw new NotFoundException('راننده یافت نشد.');
    return driver;
  }
  // Optional: Find driver by phone
  async findByPhone(phone: string): Promise<Driver | null> {
    return this.driverModel.findOne({ phone }).exec();
  }

  // Optional: Create a new driver (used in Auth service for signup)
  async create(data: Partial<Driver>): Promise<Driver> {
    const newDriver = new this.driverModel(data);
    return newDriver.save();
  }
}
