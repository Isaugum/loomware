import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as fs from 'fs';
import path from 'path';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const logDir = path.join(process.cwd(), 'logs');
if(!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

@Module({
    imports: [
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.printf(({ level, message, timestamp}) => {
                            return `[${timestamp}] [${level}] [${message}]`;
                        })
                    ),
                }),

                // save logs to files
                new winston.transports.DailyRotateFile({
                    dirname: logDir,
                    filename: 'app-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20mb',
                    maxFiles: '14d',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.json()
                    )
                })
            ]
        })
    ]
})
export class LoggerModule {}
