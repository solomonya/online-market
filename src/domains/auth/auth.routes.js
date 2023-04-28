import { authorizeSchema } from "./auth.schema.js";

export async function authRoutes(fastify, options) {
  const { userModel, authModel } = options;

  fastify.get("/test/", async (request, reply) => {
    reply.status(200).send(await userModel.getUsers());
  });

  fastify.post("/authorize/", { schema: authorizeSchema }, async (request, reply) => {
    const { email, password } = request.body;

    try {
      const user = await userModel.getUserByEmail(email);

      if (!user || user.password !== password)
        throw new Error("Неверно введённые пароль или почта!");

      const token = await fastify.generateToken(user);

      reply.status(200).send({ access: token });
    } catch (e) {
      reply.status(400).send(e);
    }
  });

  fastify.post("/register/", async (request, reply) => {
    await userModel.createUser(request.body);
    reply.status(200).send({ success: true });
  });
}
