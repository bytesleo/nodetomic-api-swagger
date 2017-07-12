export function unprotectedGet(args, res, next) {
  let response = { message: "My resource!" };
  return res.json(response);
};

export function  protectedGet(args, res, next) {
  let response = { message: "My protected resource for admins and users!" };
  return res.json(response);
};

export function protected2Get(args, res, next) {
  let response = { message: "My protected resource for admins!" };
  return res.json(response);
};

export function loginPost(args, res, next) {
  let role = args.swagger.params.role.value;
  let username = args.body.username;
  let password = args.body.password;

  if (role != "user" && role != "admin") {
  //   var response = { message: 'Error: Role must be either "admin" or "user"' };
  //   res.writeHead(400, { "Content-Type": "application/json" });
  //   return res.end(JSON.stringify(response));
  // }
  //
  // if (username == "username" && password == "password" && role) {
    // var tokenString = auth.issueToken(username, role);
    // var response = { token: tokenString };
    // res.writeHead(200, { "Content-Type": "application/json" });
    // return res.end(JSON.stringify(response));
  } else {
    // var response = { message: "Error: Credentials incorrect" };
    // res.writeHead(403, { "Content-Type": "application/json" });
    // return res.end(JSON.stringify(response));
  }
};
