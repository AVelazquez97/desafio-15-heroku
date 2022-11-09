import path from 'path';
const authenticationMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401);
  res.sendFile(path.join(process.cwd(), '/src/views/redirect401.html'));
};

export default authenticationMiddleware;