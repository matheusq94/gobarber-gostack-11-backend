import Notification from '../infra/typeorm/schemas/Notification';

import CreateNotificationDTO from '../dtos/ICreateNotificationDTO';

export default interface INotificationsRepository {
  create(data: CreateNotificationDTO): Promise<Notification>;
}
