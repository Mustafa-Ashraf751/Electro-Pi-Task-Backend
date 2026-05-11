import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByUsername(registerDto.username);
    const existingEmail = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }
    const user = await this.usersService.create(registerDto);
    const token = this.jwtService.sign({ sub: user._id, email: user.email, role: user.role });
    return { token };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByUsername(loginDto.identifier) || await this.usersService.findByEmail(loginDto.identifier);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ sub: user._id, email: user.email, role: user.role });
    return { token };
  }
}
