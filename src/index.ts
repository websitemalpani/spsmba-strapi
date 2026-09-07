import type { Core } from '@strapi/strapi';
import fs from 'fs';
import path from 'path';

// Collection types (and single types) that are safe to expose publicly as
// read-only, per cms/CONTRACT.md: "Public permissions should expose only
// published read endpoints".
const PUBLIC_READ_COLLECTIONS = [
  'faculty',
  'program',
  'notice',
  'facility',
  'document',
  'committee',
  'specialization',
  'admission',
  'news',
  'event',
  'gallery-album',
  'iqac',
  'fee',
  'testimonial',
  'page',
  'navigation',
  'quick-link',
];

const PUBLIC_READ_SINGLE_TYPES = ['site-setting', 'homepage', 'about-page', 'placements-page', 'homepage-popup'];

// Public form endpoints: create-only, per cms/CONTRACT.md
// ("create-only access for validated enquiry endpoints").
const PUBLIC_CREATE_ONLY = ['admission-enquiry', 'contact-submission', 'feedback-submission'];

async function grantPublicPermission(strapi: Core.Strapi, roleId: number, action: string) {
  const existing = await strapi.query('plugin::users-permissions.permission').findOne({
    where: { action, role: roleId },
  });
  if (!existing) {
    await strapi.query('plugin::users-permissions.permission').create({
      data: { action, role: roleId },
    });
  }
}

async function configurePublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });
  if (!publicRole) return;

  for (const uid of PUBLIC_READ_COLLECTIONS) {
    await grantPublicPermission(strapi, publicRole.id, `api::${uid}.${uid}.find`);
    await grantPublicPermission(strapi, publicRole.id, `api::${uid}.${uid}.findOne`);
  }
  for (const uid of PUBLIC_READ_SINGLE_TYPES) {
    await grantPublicPermission(strapi, publicRole.id, `api::${uid}.${uid}.find`);
  }
  for (const uid of PUBLIC_CREATE_ONLY) {
    await grantPublicPermission(strapi, publicRole.id, `api::${uid}.${uid}.create`);
  }
}

async function ensureServerApiToken(strapi: Core.Strapi) {
  const tokenService = strapi.service('admin::api-token-content-api' as any);
  const existing = await tokenService.getByName('nextjs-server');
  if (existing) return;

  const created = await tokenService.create({
    name: 'nextjs-server',
    description: 'Server-side token used by the Next.js app (STRAPI_API_TOKEN). Full access — kept server-side only.',
    type: 'full-access',
    lifespan: null,
  });

  const outPath = path.join(strapi.dirs.app.root, '.generated-strapi-api-token.txt');
  fs.writeFileSync(
    outPath,
    `Generated once on first boot. Copy this into STRAPI_API_TOKEN in your .env.local, then delete this file.\n\n${created.accessKey}\n`
  );
  strapi.log.info(`[bootstrap] Server API token generated. See ${outPath}`);
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await configurePublicPermissions(strapi);
    await ensureServerApiToken(strapi);
  },
};
