import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Row } from '../rows/row.entity';

@Entity()
export class Analytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event: string;

  @Column({ type: 'varchar' })
  userId: string;

  @ManyToOne(() => Row, row => row.analytics)
  row: Row | null;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
