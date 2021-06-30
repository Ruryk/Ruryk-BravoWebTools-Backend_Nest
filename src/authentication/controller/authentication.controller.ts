import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationDto } from '../dto/authentication.dto';
import { AuthenticationService } from '../service/authentication.service';
import { VerificationDto } from '../dto/verification.dto';
import { LoginDto } from '../dto/login.dto';
import { CheckCodeDto } from '../dto/checkCode.dto';
import { LoginTokenDto } from '../dto/loginToken.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {
  }

  @Post('check-user')
  @HttpCode(HttpStatus.OK)
  async checkUser(@Body() authentication: AuthenticationDto): Promise<boolean> {
    return this.authenticationService.checkUser(authentication.email);
  }

  @Post('verification')
  @HttpCode(HttpStatus.OK)
  async verificationUser(
    @Body() verification: VerificationDto,
  ): Promise<boolean> {
    return this.authenticationService.verificationUser(verification.email);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Body() login: LoginDto,
  ): Promise<boolean> {
    return this.authenticationService.loginUser(login.email, login.code);
  }

  @Post('login-token')
  @HttpCode(HttpStatus.OK)
  async loginWithToken(@Body() loginToken: LoginTokenDto): Promise<boolean> {
    return this.authenticationService.loginWithToken(loginToken.token);
  }

  @Post('check-code')
  @HttpCode(HttpStatus.OK)
  async checkCode(@Body() checkCode: CheckCodeDto): Promise<boolean> {
    return this.authenticationService.checkCode(
      checkCode.email,
      checkCode.code,
    );
  }
}
