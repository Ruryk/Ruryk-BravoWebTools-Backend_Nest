import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationDto } from '../dto/authentication.dto';
import { AuthenticationService } from '../service/authentication.service';
import { VerificationDto } from '../dto/verification.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('check-user')
  @HttpCode(HttpStatus.OK)
  async checkUser(@Body() authentication: AuthenticationDto): Promise<boolean> {
    return this.authenticationService.checkUser(authentication.email);
  }

  @Post('verification')
  @HttpCode(HttpStatus.OK)
  async verificationUser(@Body() verification: VerificationDto): Promise<boolean> {
    return this.authenticationService.verificationUser(verification.email);
  }
}
