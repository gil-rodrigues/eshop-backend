import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import ProductDesignation from './ProductDesignation';

@Entity('product')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => ProductDesignation,
    productDesignation => productDesignation.product,
    {
      eager: true
    }
  )
  productDesignations: ProductDesignation[];

  @Column('integer')
  price: number;

  @Column('integer')
  discount_price: number;

  @Column()
  inactive: boolean;

  @CreateDateColumn()
  date_created: Date;

  @UpdateDateColumn()
  date_modified: Date;
}

export default Product;
