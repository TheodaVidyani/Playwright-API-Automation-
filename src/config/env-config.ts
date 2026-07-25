import dotenv from 'dotenv';
dotenv.config();

function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}

export const envConfig = {
    BASE_URL: getEnv("BASE_URL"),
    TOKEN_URL: getEnv("TOKEN_URL"),
    IDENTIFIER: getEnv("IDENTIFIER"),
    PASSWORD: getEnv("PASSWORD"),
    PORTAL: getEnv("PORTAL")
};