import { Model } from 'mongoose';
import {
  HttpException,
  BadRequestException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContactsPagination, UserDto } from './dto/user.dto';
import { Users, UsersDocument } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  create(createUserDto: UserDto) {
    console.log(createUserDto);
    const createdUser = new this.userModel(createUserDto);

    if (!createdUser) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return createdUser.save();
  }

  async findAll({ page = 1, limit = 3 }: ContactsPagination) {
    const rawUsers = await this.userModel.find();

    const total = rawUsers.length;
    const pageStart = (Number(page) - 1) * Number(limit);
    const pageEnd = pageStart + Number(limit);

    const users = rawUsers.slice(pageStart, pageEnd);

    if (!users) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return {
      users,
      totalCount: total,
    };
  }

  findOne(id: string) {
    const user = this.userModel.findById(id);

    if (!user) {
      throw new BadRequestException('User do not exists.');
    }

    return user;
  }

  update(id: string, updateUserDto: UserDto) {
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
