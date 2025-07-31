// src/common/utils/encrypt-path.ts
import * as crypto from 'crypto';
import * as path from 'path';

const algorithm = 'aes-256-ctr';
const secretKey = process.env.ENCRYPTION_SECRET || 'myverystrongpasswordo32bitlength';
const iv = crypto.randomBytes(16);

export function encryptPath(filePath: string): string {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  const encrypted = Buffer.concat([cipher.update(filePath), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decryptPath(hash: string): string {
  const [ivHex, encryptedPath] = hash.split(':');
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    Buffer.from(ivHex, 'hex'),
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedPath, 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString();
}
