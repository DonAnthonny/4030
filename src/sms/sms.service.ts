// src/sms/sms.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  sendSms(phone: string, message: string) {
    console.log(`[SMS to ${phone}]: ${message}`);
  }
}
