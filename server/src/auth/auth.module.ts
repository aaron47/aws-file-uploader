import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalAuthStrategy } from 'src/shared/strategies/local-auth.strategy';
import { JwtConfigService } from 'src/config/jwt-config.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalAuthStrategy],
})
export class AuthModule {}
