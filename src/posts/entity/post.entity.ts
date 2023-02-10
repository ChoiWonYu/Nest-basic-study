import { UserEntity } from 'src/users/entity/user.entity';
import {
  Column,
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
  hashtag: string;

  @ManyToOne((type) => UserEntity, (user) => user.posts)
  user: UserEntity;
}
