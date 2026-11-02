import { createServerFn } from '@tanstack/react-start';
import {
  checkResourcesAccess as checkAccess,
  getProtectedArticle as readProtectedArticle,
  getProtectedArticles as readProtectedArticles,
  unlockResources as unlock,
} from '@/server/resources-auth.server';

export const checkResourcesAccess = createServerFn({ method: 'GET' }).handler(async () => checkAccess());

export const unlockResources = createServerFn({ method: 'POST' })
  .validator((data: { password: string }) => data)
  .handler(async ({ data }) => unlock(data.password));

export const getProtectedArticles = createServerFn({ method: 'GET' }).handler(async () => readProtectedArticles());

export const getProtectedArticle = createServerFn({ method: 'GET' })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => readProtectedArticle(data.id));
