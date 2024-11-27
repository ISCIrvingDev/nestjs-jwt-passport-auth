import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { SignInData } from '../models/auth.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  // Por defecto el nombre de la "Strategy" es "local"
  'custom-local-strategy', // Cambia el nombre del parametro para "local" dentro del "AuthGuard" de "PassportLocalGuard", lo que nos permitiria crear diferentes "local" strategies
) {
  constructor(private authservice: AuthService) {
    super({
      usernameField: 'user', // Cambia el nombre del parametro para "username"
      passwordField: 'pass', // Cambia el nombre del parametro para "password"
    });
  }

  async validate(username: string, password: string): Promise<SignInData> {
    const user = await this.authservice.validateUser({
      username,
      password,
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales invalidas!');
    }

    return user;
  }
}
