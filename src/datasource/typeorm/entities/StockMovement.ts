import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import Product from './Product';

@Entity('stock_movement')
class StockMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  id_product: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @Column('integer')
  quantity: number;

  @CreateDateColumn()
  date_movement: Date;
}

export default StockMovement;
