import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne
} from 'typeorm';
import Cart from './Cart';
import Product from './Product';
import StockMovement from './StockMovement';

@Entity('cart_item')
class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  id_product: string;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @Column('uuid')
  id_cart: string;

  @ManyToOne(() => Cart)
  @JoinColumn({ name: 'id_cart' })
  cart: Cart;

  @Column('integer')
  quantity: number;

  @Column('uuid')
  id_stock_movement: string;

  @OneToOne(() => StockMovement, { cascade: true })
  @JoinColumn({ name: 'id_stock_movement' })
  stockMovement: StockMovement;

  @Column('integer')
  price: number;

  @Column('integer')
  final_price: number;

  @CreateDateColumn()
  date_created: Date;

  @UpdateDateColumn()
  date_modified: Date;
}

export default CartItem;
