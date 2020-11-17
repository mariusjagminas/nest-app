// import { JwtModule } from '@nestjs/jwt';
// import { Test, TestingModule } from '@nestjs/testing';
// import { authJwtSecret } from './auth.constants';
// import { AuthService } from './auth.service';

describe('AuthService', () => {
  // let authService: AuthService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     imports: [
  //       JwtModule.register({
  //         secret: authJwtSecret,
  //         signOptions: { expiresIn: '1d' },
  //       }),
  //     ],
  //     providers: [AuthService],
  //   }).compile();

  //   authService = module.get<AuthService>(AuthService);
  // });

  it('should be defined', () => {
    // expect(authService).toBeDefined();
  });

  // it('should generate token', () => {
  //   const { accessToken } = authService.getToken(10)
  //   expect(accessToken).not.toBe(null);
  // });
});
