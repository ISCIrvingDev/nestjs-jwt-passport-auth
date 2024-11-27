import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PassportAuthController } from './passport-auth.controller';
import { LocalStrategy } from './strageties/local.stragety';
import { JwtStrategy } from './strageties/jwt.stragety';

@Module({
  controllers: [AuthController, PassportAuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'el-secret-key',
      signOptions: { expiresIn: '5m' },
    }),
    PassportModule,
    UserModule,
  ],
})
export class AuthModule {}
