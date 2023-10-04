import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RoutesMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl } = request;
    Logger.log(`${method} ${originalUrl}`, 'HTTP');
    next();
  }
}
