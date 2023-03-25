import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/auth/roles/roles';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
