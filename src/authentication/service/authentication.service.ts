import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Authentication,
  AuthenticationDocument,
} from '../schemas/authentication.schema';

const symbolGeneratorString = 'qwertyuiopasdfghjklzxcvbnm1234567890';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(Authentication.name)
    private authenticationModel: Model<AuthenticationDocument>,
  ) {
  }

  async checkUser(email: string): Promise<boolean> {
    return this.authenticationModel.exists({ email });
  }

  async verificationUser(email: string): Promise<any> {
    const user = await this.authenticationModel.findOne({ email });
    let code = '';
    if (user) {
      code = this.generateCodeVerification();
      await this.authenticationModel
        .updateOne({ email }, { $set: { code } })
        .exec();
      this.sendCodeToEmail(code);
      return true;
    }
    return false;
  }

  generateCodeVerification(): string {
    let str = '';
    for (let i = 0; i < 20; i++) {
      const rand = Math.floor(
        Math.random() * (symbolGeneratorString.length + 1),
      );
      str += symbolGeneratorString[rand];
    }
    return str;
  }

  sendCodeToEmail(code: string): void {

  }
}
