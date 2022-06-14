import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('language')
class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @CreateDateColumn()
  date_created: Date;

  @UpdateDateColumn()
  date_modified: Date;
}

export default Language;
