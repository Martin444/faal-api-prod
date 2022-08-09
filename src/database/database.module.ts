import { Module, Global, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';

// https://help.heroku.com/sharing/313e9ee1-7137-4368-9fb7-76c3525c2361

import { Client } from 'pg';
@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                try {
                    if (process.env.DYNO == 'web.1') {
                        return {
                            type: 'postgres',
                            url: configService.postgresUrl,
                            synchronize: true,
                            autoLoadEntities: true,
                            ssl: { rejectUnauthorized: false },
                        };
                    } else {
                        return {
                            type: 'postgres',
                            database: configService.postgres.dbName,
                            port: configService.postgres.port,
                            password: configService.postgres.password,
                            user: configService.postgres.user,
                            host: configService.postgres.host,
                            synchronize: true,
                            autoLoadEntities: true,
                            ssl: false,
                        };
                    }
                } catch (e) {
                    throw new UnauthorizedException({
                        message: 'Hubo un error de integración de datos',
                    });
                }
            },
        }),
    ],
    providers: [
        {
            provide: 'DATABASE_CONNECTION',
            useFactory: (configService: ConfigType<typeof config>) => {
                try {
                    if (process.env.DYNO == 'web.1') {
                        const client = new Client({
                            connectionString: configService.postgresUrl,
                            // database: configService.postgres.dbName,
                            // port: configService.postgres.port,
                            // password: configService.postgres.password,
                            // user: configService.postgres.user,
                            // host: configService.postgres.host,
                            ssl: { rejectUnauthorized: false },
                        });
                        client.connect();
                        return client;
                    } else {
                        const client = new Client({
                            database: configService.postgres.dbName,
                            port: configService.postgres.port,
                            password: configService.postgres.password,
                            user: configService.postgres.user,
                            host: configService.postgres.host,
                            ssl: false,
                        });
                        client.connect();
                        return client;
                    }
                } catch (e) {
                    console.error(`Falló ${e}`);
                    throw new UnauthorizedException({
                        message: 'DB config error',
                    });
                }
            },
            inject: [config.KEY],
        },
    ],
    exports: ['DATABASE_CONNECTION', TypeOrmModule],
})
export class DatabaseModule {}
