import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Row } from './row.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class RowService {
    private rowsCount = 0;

    constructor(
        @InjectRepository(Row)
        private rowRepository: Repository<Row>,
        private readonly emailService: EmailService,
    ) { }

    async saveRow(content: string): Promise<Row> {
        const newRow = this.rowRepository.create({ content });
        await this.rowRepository.save(newRow);

        this.rowsCount++;

        if (this.rowsCount % 10 === 0) {
            const emails = ['cagalp89@gmail.com'];
            const subject = '10 new rows added';
            const message = '10 new rows have been added to the database.';
            await this.emailService.sendNotification(emails, subject, message);
        }

        return newRow;
    }

    async updateRow(id: number, content: string): Promise<Row> {
        const row = await this.rowRepository.findOneBy({ id });
        if (!row) {
            throw new NotFoundException(`Row with ID ${id} not found`);
        }

        row.content = content;
        return this.rowRepository.save(row);
    }

    async deleteRow(id: number): Promise<void> {
        const result = await this.rowRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Row with ID ${id} not found`);
        }
    }

    async findAll(): Promise<Row[]> {
        return this.rowRepository.find();
    }

    async findOne(id: number): Promise<Row> {
        return this.rowRepository.findOneBy({ id });
    }
}
