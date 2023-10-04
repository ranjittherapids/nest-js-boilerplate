import { JwtModuleOptions } from '@nestjs/jwt';
import { JWT_SECRET } from '@src/config';

export const JwtConfig: JwtModuleOptions = {
  global: true,
  secret: JWT_SECRET,
  signOptions: { expiresIn: '1h' },
};
