import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    console.log('JWT_SECRET in JwtStrategy:', secret); // برای بررسی مقدار

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret || 'fallbackSecretForTest', // در صورت نداشتن مقدار
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, phone: payload.phone, role: payload.role };
  }
}