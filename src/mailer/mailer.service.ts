import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { SYSTEM_EMAIL } from 'src/config/configVariables';

@Injectable()
export class MailerService {
  mailTransport = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.ADMIN_MAIL,
      pass: process.env.ADMIN_PASS_GOOGLE,
    },
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  async sendEmailTo(addressee: string) {
    await this.mailTransport.sendMail(
      {
        from: SYSTEM_EMAIL,
        to: addressee,
        subject: 'User Register',
        html: `
    <div>
    <h1>New user registered</h1>
    <span>User with email <${addressee}> has been register succesfully!</span>
    </div>
    `,
      },
      (error) => {
        if (error)
          console.error(
            `Has been an error with the product creational email: ${error}`,
          );
      },
    );
  }
}
