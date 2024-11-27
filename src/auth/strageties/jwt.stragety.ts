import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SignInData } from '../models/auth.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  // Por defecto el nombre de la "Strategy" es "jwt"
  'custom-jwt-strategy', // Cambia el nombre del parametro para "jwt" dentro del "AuthGuard" de "xxx", lo que nos permitiria crear diferentes "jwt" strategies
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'el-secret-key',
    });
  }

  async validate(payload: {
    sub: string;
    username: string;
  }): Promise<SignInData> {
    return {
      userId: Number(payload.sub),
      username: payload.username,
    };
  }
}
