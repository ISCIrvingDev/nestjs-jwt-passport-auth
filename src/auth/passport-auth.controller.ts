import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtGuard } from './guards/passport-jwt.guard';

@Controller('passport-auth')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(PassportLocalGuard)
  @Post('login')
  async login(@Request() request) {
    // Al implemetar el metodo "validate" en la clase "LocalStrategy" y retornar el usuario, se vuelve accesible ese objeto "user" desde el "request"
    const res = await this.authService.signIn(request.user);

    return res;
  }

  @UseGuards(PassportJwtGuard)
  @Get('me')
  getUserInfo(@Request() request) {
    const res = request.user;

    return res;
  }
}
