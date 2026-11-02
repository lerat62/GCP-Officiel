import { createHmac, timingSafeEqual } from 'node:crypto';
import { getCookie, setCookie, deleteCookie, setResponseHeader } from '@tanstack/react-start/server';
import protectedArticles from '@/data/protocoles.server.json';
import type { Article } from '@/data/manual';

const COOKIE_NAME = 'gcp_resources_access';
const SESSION_MAX_AGE = 60 * 60 * 12;

function expectedToken() {
  const password = process.env.RESOURCES_PASSWORD;
  const secret = process.env.RESOURCES_SESSION_SECRET;
  if (!password || !secret) return null;
  return createHmac('sha256', secret).update(`gcp-resources:${password}`).digest('hex');
}

function hasResourcesAccess() {
  const expected = expectedToken();
  const supplied = getCookie(COOKIE_NAME);
  if (!expected || !supplied || !/^[a-f0-9]{64}$/.test(supplied)) return false;
  const a = Buffer.from(expected, 'hex');
  const b = Buffer.from(supplied, 'hex');
  return a.length === b.length && timingSafeEqual(a, b);
}

export function checkResourcesAccess() {
  setResponseHeader('Cache-Control', 'no-store');
  return hasResourcesAccess();
}

export function unlockResources(password: string) {
  setResponseHeader('Cache-Control', 'no-store');
  const configuredPassword = process.env.RESOURCES_PASSWORD;
  const secret = process.env.RESOURCES_SESSION_SECRET;
  if (!configuredPassword || !secret) return false;
  const submitted = Buffer.from(password);
  const expected = Buffer.from(configuredPassword);
  const valid = submitted.length === expected.length && timingSafeEqual(submitted, expected);
  if (!valid) return false;

  setCookie(COOKIE_NAME, expectedToken()!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  return true;
}

export function getProtectedArticles(): Article[] | null {
  setResponseHeader('Cache-Control', 'no-store');
  if (!hasResourcesAccess()) return null;
  return protectedArticles as Article[];
}

export function getProtectedArticle(id: string): Article | null {
  setResponseHeader('Cache-Control', 'no-store');
  if (!hasResourcesAccess()) return null;
  return (protectedArticles as Article[]).find((article) => article.id === id) ?? null;
}

export function lockResources() {
  deleteCookie(COOKIE_NAME, { path: '/' });
  return true;
}
