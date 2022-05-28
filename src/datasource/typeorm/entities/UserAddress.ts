import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import AddressType from './AddressType';
import User from './User';

@Entity('user_address')
class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  id_user: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  local: string;

  @Column()
  postal_code: string;

  @Column()
  region: string;

  @Column()
  country: string;

  @Column('uuid')
  id_address_type: string;

  @ManyToOne(() => AddressType)
  @JoinColumn({ name: 'id_address_type' })
  addressType: AddressType;

  @Column()
  inactive: boolean;

  @CreateDateColumn()
  date_created: Date;

  @UpdateDateColumn()
  date_modified: Date;
}

export default UserAddress;
