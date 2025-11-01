/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailUseCase } from '../../application/use-cases/send-email.use-case';
import { SendNotificationDto } from '../../presentation/dto/send-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly sendEmailUseCase: SendEmailUseCase) {}

  @Post()
  send(@Body() body: SendNotificationDto) {
    this.sendEmailUseCase.execute(body.recipientEmail, body.subject, body.message);
    return { message: 'Notification sent successfully' };
  }
}
