import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Analytics } from 'src/analytics/analytics.entity';

@Entity()
export class Row {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Analytics, analytics => analytics.row)
  analytics: Analytics[];
}
