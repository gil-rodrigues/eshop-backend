import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import UserAddress from './UserAddress';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => UserAddress, userAddress => userAddress.id_user)
  userAddresses: UserAddress[];

  @Exclude()
  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  cellphone_number: string;

  @Column()
  inactive: boolean;

  @CreateDateColumn()
  date_created: Date;

  @UpdateDateColumn()
  date_modified: Date;
}

export default User;
