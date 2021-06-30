import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';

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
    return new Promise(async (resolve, reject) => {
      const user = await this.authenticationModel.findOne({ email });
      let code = '';
      if (user) {
        code = this.generateCodeVerification(6);
        const writeToDbStatus = await this.authenticationModel
          .findOneAndUpdate({ email }, { $set: { code } })
          .exec();
        if (writeToDbStatus) {
          const sendStatus: any = await this.sendCodeToEmail(code, email);
          resolve({ status: sendStatus.response });
        }
        reject({ status: 401 });
      }
      reject({ status: 401 });
    });
  }

  async loginUser(email: string, code: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const user = await this.authenticationModel.findOne({ email });
      if (user && user.code === code) {
        const access_token = this.generateHash(20);
        const writeToDbStatus = await this.authenticationModel
          .findOneAndUpdate(
            { email },
            { $set: { token: access_token, code: '' } },
          )
          .exec();
        if (writeToDbStatus) {
          resolve({ access_token });
        }
        resolve({ status: 401, message: 'Incorrect write to db' });
      }
      reject({ status: 401, message: 'Incorrect code' });
    });
  }

  async loginWithToken(token: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const user = await this.authenticationModel.findOne({ token });
      if (user && user.token === token) {
        const access_token = this.generateHash(20);
        const writeToDbStatus = await this.authenticationModel
          .findOneAndUpdate(
            { token },
            { $set: { token: access_token, code: '' } },
          )
          .exec();
        if (writeToDbStatus) {
          resolve({ token: access_token });
        }
        resolve({ status: false });
      }
      reject({ status: false });
    });
  }

  async checkCode(email: string, code: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const user = await this.authenticationModel.findOne({ email });
      if (user && user.code === code) {
        resolve({ status: 200 });
      }
      reject({ status: 401, message: 'Incorrect code' });
    });
  }

  generateCodeVerification(length: number): string {
    return Math.floor(Math.random() * 1000001)
      .toString()
      .padStart(length, '0');
  }

  generateHash(length: number): string {
    let str = '';
    for (let i = 0; i < length; i++) {
      const rand = Math.floor(
        Math.random() * (symbolGeneratorString.length + 1),
      );
      str += symbolGeneratorString[rand];
    }
    return str;
  }

  async sendCodeToEmail(code: string, email: string): Promise<void> {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'mr.ivent6@gmail.com',
        pass: '1598753ivent',
      },
    });
    // send mail with defined transport object
    return transporter.sendMail({
      from: 'bravoWebTool@domain.com',
      to: email,
      subject: 'Confirm Email',
      text: 'Please confirm your email',
      html: '<p>Please confirm your email</p><p>Code: ' + code + '</p>',
    });
  }
}
