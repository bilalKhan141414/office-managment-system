import * as bcrypt from 'bcrypt';

export const encrptPassword = (password: string): string => {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, SALT);
};

export const ValidatePasswordHash = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash);
