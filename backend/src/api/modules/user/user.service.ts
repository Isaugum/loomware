import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}
    
    async findByEmail(email: string): Promise<User | null> 
    {
      return this.userRepository.findOne({ 
        where: { email } 
      });
    }

    async findById(id: User['id']): Promise<Partial<User> | null>
    {
      const user = await this.userRepository.findOne({
        where: { id },
        select: ['id', 'email', 'username', 'roles']
      });

      if (!user) { throw new InternalServerErrorException('User with id ' + id + ' not found.') };
      return user;
    }

    async createUser(email: string, password: string): Promise<Partial<User>> {
      const newUser = this.userRepository.create({ email, password });
      try {
        await this.userRepository.save(newUser);

        return {
          id: newUser?.id,
          email: newUser?.email,
          username: newUser?.username,
          roles: newUser?.roles
        }
      } catch (err) {
        throw new BadRequestException(err);  
      }
    }
}