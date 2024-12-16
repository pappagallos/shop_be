import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// Passport JWT 미들웨어
// https://docs.nestjs.com/recipes/passport#implementing-passport-jwt
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // PassportStrategy 생성자에 JWT 검증에 필요한 설정 전달
    // JWT에서 토큰을 추출하고, 유효성을 검사한 후 validate 메서드로 전달되는 payload를 생성
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더에서 Bearer 토큰 추출
      ignoreExpiration: false, // 토큰 만료 검증 활성화
      secretOrKey: process.env.JWT_SECRET, // 토큰 서명을 검증하기 위한 비밀 키
    });
  }

  // PassportStrategy의 validate 함수를 오버라이드
  // 토큰 검증 후 payload에서 필요한 데이터를 반환해 req.user에 저장
  async validate(payload: any) {
    // 반환된 객체가 req.user에 매핑됨
    return {
      id: payload.id, // 사용자 아이디
      email: payload.email, // 사용자 이메일
      role: payload.role, // 사용자 역할("seller" || "buyer")
    };
  }
}
