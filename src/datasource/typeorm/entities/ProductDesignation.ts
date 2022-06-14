import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import Language from './Language';

import Product from './Product';

@Entity('product_designation')
class ProductDesignation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  id_product: string;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  description: string;

  @Column()
  code_lang: string;

  @ManyToOne(() => Language)
  @JoinColumn({ name: 'code_lang' })
  language: Language;

  @CreateDateColumn()
  date_created: Date;

  @UpdateDateColumn()
  date_modified: Date;
}

export default ProductDesignation;
