import { HttpExceptionFilter } from './http-exception.filter';
import type { Logger } from 'winston';

describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    const mockLogger = { error: jest.fn() } as unknown as Logger;
    expect(new HttpExceptionFilter(mockLogger)).toBeDefined();
  });
});
