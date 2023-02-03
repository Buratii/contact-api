import { Model } from 'mongoose';
import {
  HttpException,
  BadRequestException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users, UsersDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);

    const findUser = this.userModel.findById(createdUser._id);

    if (!createdUser) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    if (findUser) {
      throw new BadRequestException(HttpStatus.BAD_REQUEST);
    }

    return createdUser.save();
  }

  findAll() {
    const users = this.userModel.find();

    if (!users) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return users;
  }

  findOne(id: string) {
    const user = this.userModel.findById(id);

    if (!user) {
      throw new BadRequestException('User do not exists.');
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.userModel.findByIdAndUpdate(
      { _id: id },
      updateUserDto,
      { new: true },
    );

    const findUser = this.userModel.findById(id);

    if (findUser === updatedUser) {
      throw new BadRequestException('Same values.');
    }

    return updatedUser;
  }

  remove(id: string) {
    const deletedUser = this.userModel.deleteOne({ _id: id });

    if (!deletedUser) {
      throw new BadRequestException('User already deleted or do not exists.');
    }

    return deletedUser.exec();
  }
}
