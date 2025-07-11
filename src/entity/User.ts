export class User {
  userId: string;
  username: string;
  email: string;
  password: string;
  birthdate: string;

  constructor({
    userId,
    username,
    email,
    password,
    birthdate,
  }: {
    userId: string;
    username: string;
    email: string;
    password: string;
    birthdate: string;
  }) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.birthdate = birthdate;
  }
}
