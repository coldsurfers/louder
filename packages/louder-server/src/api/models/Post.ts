import { prisma } from "../database/prisma";

export default class Post {
  public id?: string;

  public title!: string;

  public artist_name!: string;

  public created_at?: Date;

  constructor(params: {
    id?: string;
    title: string;
    artist_name: string;
    created_at?: Date;
  }) {
    this.id = params.id;
    this.title = params.title;
    this.artist_name = params.artist_name;
    this.created_at = params.created_at;
  }

  public async create() {
    const created = await prisma.post.create({
      data: {
        title: this.title,
        artist_name: this.artist_name,
      },
    });

    return new Post({
      ...created,
    });
  }
}
