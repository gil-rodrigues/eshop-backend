import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import CartItem from './CartItem';
import User from './User';
import UserAddress from './UserAddress';

@Entity('cart')
class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  id_user: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column('uuid')
  id_user_address: string;

  @ManyToOne(() => UserAddress)
  @JoinColumn({ name: 'id_user_address' })
  userAddress: UserAddress;

  @OneToMany(() => CartItem, cartItem => cartItem.cart, { eager: true })
  cartItems: CartItem[];

  @Column('timestamp with time zone')
  date_purchased: Date;

  // redundant with date_purchase, to improve performance
  @Column()
  purchased: boolean;

  @Column()
  deleted: boolean;

  @CreateDateColumn()
  date_created: Date;

  @UpdateDateColumn()
  date_modified: Date;
}

export default Cart;
