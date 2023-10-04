import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { Request } from 'express';
import { JwtConfig } from '@src/config';

export const Public = () => SetMetadata('isPublic', true);
@Injectable()
export class AuthGuard implements CanActivate {
  private jwtService = new JwtService();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublic = new Reflector().get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) return true;
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Missing Auth Token');
    try {
      await this.jwtService.verifyAsync(token, JwtConfig);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid Auth Token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
