export default function getTokenFromHeader(req) {
  const {
    headers: { authorization }
  } = req;

  if (
    authorization &&
    authorization.split(' ')[0] === 'Bearer' &&
    authorization.split(' ')[1] !== undefined
  ) {
    return authorization.split(' ')[1];
  }

  return null;
}
