import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        database: {
            name: process.env.DATABASE_NAME,
            port: process.env.DATABASE_PORT,
        },
        postgresUrl: process.env.DATABASE_URL,
        postgres: {
            dbName: process.env.POSTGRES_DB,
            port: parseInt(process.env.POSTGRES_PORT, 10),
            password: process.env.POSTGRES_PASSWORD,
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
        },
        wooproducts: {
            user: process.env.WP_USER,
            password: process.env.WP_PASSWORD,
        },
        openpay: {
            apikey: process.env.OPENPAY_APIKEY,
            merchId: process.env.OPENPAY_MERCHID,
        },
        typeorm: {
            entity_dir: process.env.TYPEORM_ENTITIES,
            migrations: process.env.TYPEORM_MIGRATIONS,
            migrations_dir: process.env.TYPEORM_MIGRATIONS_DIR,
        },
        apiKey: process.env.API_KEY,
        jwtsecret: process.env.JWT_SECRET,
    };
});
