import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../model/user';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserRequest } from '../controller/dto/create-user.request';
import { CreateUserResponse } from '../controller/dto/create-user.response';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserRequest): Promise<CreateUserResponse> {
    const createdUser = new this.userModel(createUserDto);
    const registeredUser = await createdUser.save();

    return new CreateUserResponse(<string>registeredUser._id);
  }
}
