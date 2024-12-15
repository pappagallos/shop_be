import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register({
    email,
    password,
    role,
  }: {
    email: string;
    password: string;
    role: 'buyer' | 'seller';
  }) {
    // [1] 이메일 중복 검사
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser)
      return { result: false, message: '이미 사용중인 이메일 입니다.' };

    // [2] 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));

    // [3] 사용자 정보 작성
    const user = new this.userModel({ email, password: hashedPassword, role });

    // [4] 사용자 추가
    user.save();
    return { result: true };
  }

  async login({ email, password }: { email: string; password: string }) {
    // [1] 사용자 검색
    const user = await this.userModel.findOne({ email });

    // [2] 비밀번호 검사
    const isValidPassword = await bcrypt.compare(password, user.password);

    // [3-1] 사용자가 존재하지 않거나 비밀번호가 틀릴 경우,
    if (!user || !isValidPassword)
      return {
        result: false,
        message: '존재하지 않은 사용자이거나 비밀번호가 올바르지 않습니다.',
      };

    // [3-2] 사용자가 존재하고 비밀번호가 일치할 경우
    const token = jwt.sign({ id: user._id, role: user.role }, 'secret');

    // [4] Token 반환
    return { result: true, token };
  }
}
