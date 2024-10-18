import * as sgMail from '@sendgrid/mail';
import { Injectable } from '@nestjs/common';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable()
export class EmailService {
    constructor(
        private readonly analyticsService: AnalyticsService
    ) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async sendNotification(emails: string[], subject: string, message: string) {
        const msgTemplate = {
            from: {
                name: "Webhook",
                email: process.env.SENDGRID_EMAIL,
            },
            subject,
            text: message,
        };

        const sendPromises = emails.map(async (email) => {
            const msg = { ...msgTemplate, to: email };

            try {
                await sgMail.send(msg);
                console.log(`Email sent to: ${email}`);

                const event = `Email sent to ${email}`;
                const userId = 'system';
                const rowId = null;

                await this.analyticsService.logEvent(event, userId, rowId);
            } catch (error) {
                console.error(`Error sending email to ${email}:`, error.response?.body?.errors);

                const event = `Failed to send email to ${email}`;
                const userId = 'system';
                const rowId = null;

                await this.analyticsService.logEvent(event, userId, rowId);
            }
        });

        await Promise.all(sendPromises);
    }
}
