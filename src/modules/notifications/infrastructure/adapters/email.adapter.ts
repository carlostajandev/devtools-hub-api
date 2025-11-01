/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailAdapter {
  private readonly logger = new Logger(EmailAdapter.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, message: string): Promise<boolean> {
    try {
      const from = process.env.MAIL_FROM || process.env.MAIL_USER;

      const html = `
      <div style="background-color:#f8f9fa;padding:20px;font-family:Arial,sans-serif;">
        <div style="max-width:600px;margin:auto;background-color:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 0 10px rgba(0,0,0,0.1);">
          <div style="background-color:#007bff;padding:15px;color:white;text-align:center;">
            <h2>💳 Confirmación de Pago - DevToolsHub</h2>
          </div>
          <div style="padding:25px;">
            <p style="font-size:16px;color:#333;">Hola 👋,</p>
            <p style="font-size:16px;color:#333;">${message}</p>
            <div style="margin-top:25px;text-align:center;">
              <a href="https://devtoolshub.com" 
                 style="background-color:#007bff;color:white;padding:12px 20px;
                        text-decoration:none;border-radius:5px;font-weight:bold;">
                Ver tu cuenta
              </a>
            </div>
          </div>
          <div style="background-color:#f1f1f1;padding:10px;text-align:center;color:#777;font-size:13px;">
            DevToolsHub © ${new Date().getFullYear()} — Automatización inteligente para desarrolladores.
          </div>
        </div>
      </div>
      `;

      await this.transporter.sendMail({
        from,
        to,
        subject,
        html,
      });

      this.logger.log(`📧 Email enviado correctamente a ${to}`);
      return true;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error(`❌ Error enviando email: ${error.message}`);
      return false;
    }
  }
}
