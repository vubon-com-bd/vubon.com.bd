export const csrfConfig = {
  cookie: true,
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
  sessionKey: 'csrfToken',
  tokenKey: '_csrf',
  headerKey: 'x-csrf-token',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
};
