import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findById(id: User['id']): Promise<Partial<User> | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'username', 'roles'],
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async createUser(email: string, password: string): Promise<Partial<User>> {
    const newUser = this.userRepository.create({ email, password });
    try {
      const savedUser = await this.userRepository.save(newUser);

      if (!savedUser || !savedUser.id) {
        throw new InternalServerErrorException(
          'Failed to save user: id was not generated',
        );
      }

      return {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
        roles: savedUser.roles,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      throw new BadRequestException('Failed to create user: ' + errorMessage);
    }
  }
}
