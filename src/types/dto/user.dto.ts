export interface SignUpRequestBody {
  email: string;
  password: string;
  password_re: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LogoutHeader {
  authorization: string;
}

export interface forgotPWRequestBody {
  email: string;
}
