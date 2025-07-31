import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from './schemas/driver.schema';
import { DriverService } from './services/driver.service';
import { DriverController } from './controllers/driver.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }])],
  providers: [DriverService],
    controllers: [DriverController], // ثبت کنترلر

  exports: [DriverService],  // حتما export کنید
})
export class DriverModule {}
