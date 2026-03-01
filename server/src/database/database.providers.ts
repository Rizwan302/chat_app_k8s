import { Sequelize } from 'sequelize-typescript';
import { Channel } from 'src/channel/channel.entity';
import { Message } from 'src/message/message.entity';
import { User } from 'src/user/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
      });
      sequelize.addModels([User, Message, Channel]);
      await sequelize.sync();
      return sequelize;
    }
  }
];
