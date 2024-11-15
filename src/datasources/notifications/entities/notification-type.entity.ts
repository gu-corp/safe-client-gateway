import { NotificationSubscriptionNotificationType } from '@/datasources/notifications/entities/notification-subscription-notification-type.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('notification_types')
@Unique('name', ['name'])
export class NotificationType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name!: string;

  @OneToMany(
    () => NotificationSubscriptionNotificationType,
    (notificationType) => notificationType.id,
    { onDelete: 'CASCADE' },
  )
  notification_subscription_notification_type!: NotificationSubscriptionNotificationType[];
}
