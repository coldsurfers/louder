/* eslint-disable class-methods-use-this */
import { prisma } from "../database/prisma";

export type UserSerialized = {
  id: string;
  email: string;
  username: string;
  created_at: string;
};

export default class User {
  public id?: string;

  public username!: string;

  public email!: string;

  public password!: string;

  public created_at?: Date;

  constructor(params: {
    id?: string;
    email: string;
    username: string;
    password: string;
    created_at?: Date;
  }) {
    this.id = params.id;
    this.email = params.email;
    this.username = params.username;
    this.password = params.password;
    this.created_at = params.created_at;
  }

  public static async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  public async create() {
    const user = await prisma.user.create({
      data: {
        email: this.email,
        username: this.username,
        password: this.password,
      },
    });
    return user;
  }

  public serialize(): UserSerialized {
    return {
      id: this.id ?? "",
      email: this.email,
      username: this.username,
      created_at: this.created_at?.toISOString() ?? "",
    };
  }
}
