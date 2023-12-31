import { FastifyError, RouteHandler } from "fastify";
// import { JWTDecoded } from '../../types/jwt'

export const postRegisterCtrl: RouteHandler<{
  Body: {
    username: string;
    email: string;
    password: string;
  };
}> = async (req, rep) => {
  const { username, email, password } = req.body;
  try {
    console.log(username, email, password);
    // await req.jwtVerify();
    // const decoded = (await req.jwtDecode()) as JWTDecoded
    // todo find user by auth token
    return rep.status(200).send();
  } catch (e) {
    const error = e as FastifyError;
    return rep.status(error.statusCode ?? 500).send(error);
  }
};

export const postLoginCtrl: RouteHandler<{}> = async (req, rep) => {
  try {
    // await req.jwtVerify();
    // const decoded = (await req.jwtDecode()) as JWTDecoded
    // todo find user by auth token
    return rep.status(501).send();
  } catch (e) {
    const error = e as FastifyError;
    return rep.status(error.statusCode ?? 500).send(error);
  }
};

export const getUserCtrl: RouteHandler<{}> = async (req, rep) => {
  try {
    // await req.jwtVerify();
    // const decoded = (await req.jwtDecode()) as JWTDecoded
    // todo find user by auth token
    return rep.status(501).send();
  } catch (e) {
    const error = e as FastifyError;
    return rep.status(error.statusCode ?? 500).send(error);
  }
};

export const postLogoutCtrl: RouteHandler<{}> = async (req, rep) => {
  try {
    // await req.jwtVerify();
    // const decoded = (await req.jwtDecode()) as JWTDecoded
    // todo find user by auth token
    return rep.status(501).send();
  } catch (e) {
    const error = e as FastifyError;
    return rep.status(error.statusCode ?? 500).send(error);
  }
};

export const patchUserProfileCtrl: RouteHandler<{}> = async (req, rep) => {
  try {
    // await req.jwtVerify();
    // const decoded = (await req.jwtDecode()) as JWTDecoded
    // todo find user by auth token
    return rep.status(501).send();
  } catch (e) {
    const error = e as FastifyError;
    return rep.status(error.statusCode ?? 500).send(error);
  }
};
