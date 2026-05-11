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
    if (!loginDto.email && !loginDto.username) {
      throw new UnauthorizedException('Provide email or username');
    }
    // Find user by whichever identifier was provided
    const user = loginDto.email
    ? await this.usersService.findByEmail(loginDto.email)
    : await this.usersService.findByUsername(loginDto.username!);
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
