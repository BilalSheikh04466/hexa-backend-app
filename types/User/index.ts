type SignUpResponse = {
  id: number;
  name: string;
  email: string;
};

type LoginResponse = {
  name: string;
  email: string;
};

type CreateUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export { CreateUserPayload, LoginResponse, SignUpResponse };
