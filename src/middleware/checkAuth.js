import jwt from "jsonwebtoken";

function checkAuth(request, reply, done) {
  const token = request.headers["authorization"];

  if (!token) {
    reply.code(401).send({ error: "Unauthorized" });
    return done(new Error("Unauthorized"));
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedToken) {
    reply.code(401).send({ error: "Unauthorized" });
    return done(new Error("Unauthorized"));
  }

  request.token = decodedToken;

  done();
}

export { checkAuth };
