import app from './app';
import dotenv from 'dotenv';
import Database from './services/database';

dotenv.config();

process.on('SIGINT', () => {
    process.exit(0)
})

async function main() {
    const port: number = parseInt(process.env.PORT as string) ?? 3000;
    const host: string = process.env.HOST ?? 'localhost';

    await Database.init()

    app.listen(port, () => {
        console.log(`Server đang chạy tại http://${host}:${port}`);
    });
}

main();