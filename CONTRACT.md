# SPS MBA Strapi CMS

Create a Strapi v5 project in this directory and use `content-types/blueprint.json` as the implementation contract. All frontend content access belongs behind `frontend/lib/api`; public form writes are proxied through Next.js server routes.

Recommended roles: Super Admin, Content Manager, Admissions CRM, Reviewer. Public permissions should expose only published read endpoints and create-only access for validated enquiry endpoints. Configure upload MIME limits, CAPTCHA, rate limiting and a Cloudinary/S3 provider before production.
