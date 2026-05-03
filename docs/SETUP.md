# Setup guide

End-to-end setup for the GFC IT bilingual website.

## Prerequisites

- PHP 8.2+
- Composer 2.6+
- Node.js 20+ and npm 10+
- MySQL 8.0+ (or MariaDB 10.6+) — PostgreSQL works too with minor adjustments
- A local web server: Laravel Herd / Valet / `php artisan serve` is fine for dev

## 1. Backend (Laravel + Filament)

```bash
cd backend

# Install PHP dependencies
composer install

# Environment
cp .env.example .env
php artisan key:generate

# Configure your database in .env:
#   DB_CONNECTION=mysql
#   DB_DATABASE=gfc_it
#   DB_USERNAME=...
#   DB_PASSWORD=...

# Create the database
mysql -uroot -p -e "CREATE DATABASE gfc_it CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run migrations and seed initial content
php artisan migrate --seed

# Storage symlink (so uploaded images are publicly accessible)
php artisan storage:link

# Boot the dev server
php artisan serve
# Backend now at http://localhost:8000
```

### Filament admin

- URL: http://localhost:8000/admin
- Default seeded login:
  - Email: `admin@gfc-it.com`
  - Password: `ChangeMe!2026`
- Change the password immediately after first login.

### Adding more admin users

Either through Tinker:

```bash
php artisan tinker
> User::create([
>   'name' => 'Amr',
>   'email' => 'amr@business-partner.com',
>   'password' => bcrypt('strong-password-here'),
>   'email_verified_at' => now(),
> ]);
```

Or extend `app/Models/User.php` `canAccessPanel()` to allow more email domains.

## 2. Frontend (React + Vite)

```bash
cd frontend

# Install JS dependencies
npm install

# Environment (defaults are fine for local dev with backend on :8000)
cp .env.example .env

# Start dev server
npm run dev
# Frontend now at http://localhost:5173
```

The Vite dev server proxies `/api` and `/storage` to `http://localhost:8000`, so you don't hit CORS during development.

## 3. Production deployment

### Backend

Recommended: Laravel Forge / Hostinger / Cloudways with PHP 8.2+ and MySQL.

```bash
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Point the web root to `backend/public`.

### Frontend

Build a static bundle and deploy to any static host (Vercel, Netlify, Cloudflare Pages, S3+CloudFront, or even the Laravel server's `public/` directory):

```bash
cd frontend
# Update .env with the production API URL:
#   VITE_API_BASE_URL=https://api.gfc-it.com/api/v1
#   VITE_STORAGE_URL=https://api.gfc-it.com/storage
npm run build
# Output: dist/
```

If hosting frontend and backend on the same domain (e.g. `gfc-it.com` for the React app and `api.gfc-it.com` for Laravel), update CORS in `backend/config/cors.php` and the `FRONTEND_URL` env var.

## 4. Email setup (contact form notifications)

Add SMTP credentials to `backend/.env`:

```
MAIL_MAILER=smtp
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USERNAME=hello@gfc-it.com
MAIL_PASSWORD=...
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="hello@gfc-it.com"
MAIL_FROM_NAME="GFC IT"
```

To send notifications when contact submissions arrive, extend `App\Http\Controllers\Api\ContactController@store` with a `Mail::send(...)` or notification dispatch.

## Troubleshooting

| Issue                                  | Fix                                                                 |
| -------------------------------------- | ------------------------------------------------------------------- |
| 419 errors on the admin login          | `php artisan key:generate` and clear caches                         |
| Images not loading                     | `php artisan storage:link`                                          |
| CORS errors in dev                     | Confirm Vite proxy and `FRONTEND_URL` env match                     |
| `Class "Filament\\..." not found`      | `composer install` then `php artisan filament:upgrade`              |
| Translatable values returning as JSON  | Confirm the model has `use HasTranslations` and `$translatable[]` set |
