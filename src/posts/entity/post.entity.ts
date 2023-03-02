import { UserEntity } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Post')
export class postEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  caption: string;

  @Column()
  userId: string;

  @Column()
  hashtag: string;

  @Column('boolean', { default: true })
  isPublished: boolean;

  @ManyToOne((type) => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @CreateDateColumn()
  createdDate: Date;
}
