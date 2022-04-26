import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  email: string;

  @Column()
  cellphone_number: string;

  @CreateDateColumn()
  date_created: Date;

  @UpdateDateColumn()
  date_modified: Date;
}

export default User;
