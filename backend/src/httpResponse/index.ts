import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_URL } from '@src/config';
import { IResponse } from './dto';

@Injectable()
export class HTTPResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const { url, method } = request;

    return next.handle().pipe(
      map((result) => {
        const payload = {
          status: true,
          url: `${APP_URL}${url}`,
          method,
          timestamp: new Date().toISOString(),
          result,
        };
        return payload;
      }),
    );
  }
}
