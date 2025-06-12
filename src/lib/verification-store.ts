import fs from 'fs';
import path from 'path';

const STORE_FILE = path.join(process.cwd(), 'tmp', 'verification-codes.json');

// Ensure the tmp directory exists
if (!fs.existsSync(path.join(process.cwd(), 'tmp'))) {
  fs.mkdirSync(path.join(process.cwd(), 'tmp'));
}

// Initialize store if it doesn't exist
if (!fs.existsSync(STORE_FILE)) {
  fs.writeFileSync(STORE_FILE, JSON.stringify({}));
}

export function setVerificationCode(email: string, code: string): void {
  const store = JSON.parse(fs.readFileSync(STORE_FILE, 'utf-8'));
  store[email] = {
    code,
    expires: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
  };
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2));
}

export function getVerificationCode(email: string): { code: string; expires: Date } | undefined {
  const store = JSON.parse(fs.readFileSync(STORE_FILE, 'utf-8'));
  const data = store[email];
  if (!data) return undefined;
  return {
    code: data.code,
    expires: new Date(data.expires),
  };
}

export function deleteVerificationCode(email: string): void {
  const store = JSON.parse(fs.readFileSync(STORE_FILE, 'utf-8'));
  delete store[email];
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2));
} 