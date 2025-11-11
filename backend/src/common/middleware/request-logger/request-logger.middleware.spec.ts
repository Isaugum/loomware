import { RequestLoggerMiddleware } from './request-logger.middleware';
import type { Logger } from 'winston';

describe('RequestLoggerMiddleware', () => {
  it('should be defined', () => {
    const mockLogger = { info: jest.fn() } as unknown as Logger;
    expect(new RequestLoggerMiddleware(mockLogger)).toBeDefined();
  });
});
