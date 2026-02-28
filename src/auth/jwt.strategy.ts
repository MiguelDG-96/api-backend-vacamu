import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'CLAVE_SECRETA_SUPER_SEGURA', // Mover a variables de entorno .env
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email }; // Esto se inyecta en request.user
  }
}
