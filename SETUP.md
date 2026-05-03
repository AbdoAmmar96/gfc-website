# GFC IT — Setup Guide

Tested and confirmed working end-to-end on Ubuntu 24.04 with PHP 8.3, MariaDB 10.11, and Node 22.

## Stack

- **Backend:** Laravel 11.51 + Filament v3.2 + Sanctum + Spatie Translatable
- **Frontend:** React 18 + Vite 5 + Tailwind 3 + react-i18next + framer-motion
- **Database:** MySQL 8 / MariaDB 10.11+

## Prerequisites

```bash
# Ubuntu / Debian
sudo apt install -y php-cli php-mbstring php-xml php-curl php-zip \
  php-mysql php-bcmath php-gd php-intl unzip mariadb-server
# Composer
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
# Node 18+ (use nvm or apt)
```

## 1. Database

```bash
sudo service mariadb start

# Root over Unix socket can't be used by Laravel — create a dedicated user
sudo mysql -uroot <<SQL
CREATE DATABASE IF NOT EXISTS gfc_it CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'gfc'@'127.0.0.1' IDENTIFIED BY 'gfcsecret';
CREATE USER IF NOT EXISTS 'gfc'@'localhost' IDENTIFIED BY 'gfcsecret';
GRANT ALL PRIVILEGES ON gfc_it.* TO 'gfc'@'127.0.0.1';
GRANT ALL PRIVILEGES ON gfc_it.* TO 'gfc'@'localhost';
FLUSH PRIVILEGES;
SQL
```

If you're using stock MySQL with a known root password, just create the database and use root in `.env` instead.

## 2. Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Edit `.env` with your DB credentials:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gfc_it
DB_USERNAME=gfc
DB_PASSWORD=gfcsecret
APP_URL=http://127.0.0.1:8000
FRONTEND_URL=http://127.0.0.1:5173
```

```bash
php artisan migrate --seed
php artisan storage:link
php artisan serve --host=127.0.0.1 --port=8000
```

**Default admin login** (Filament panel at `/admin`):
- Email: `admin@gfc-it.com`
- Password: `ChangeMe!2026`

⚠️ **Change the admin password before deploying anywhere.**

## 3. Frontend (React + Vite)

In a second terminal:

```bash
cd frontend
npm install --legacy-peer-deps   # eslint v9 vs eslint-plugin-react-hooks v4 conflict
npm run dev -- --host 127.0.0.1 --port 5173
```

Open `http://127.0.0.1:5173` — Vite proxies `/api/*` and `/storage/*` to Laravel automatically (configured in `vite.config.js`).

## API Endpoints

All under `/api/v1/`:

| Method | Path | Returns |
|--------|------|---------|
| GET | /settings | Site settings (hero text, contact info, social) |
| GET | /services | All product categories |
| GET | /services/{slug} | Single product detail |
| GET | /solutions | Industry solutions |
| GET | /partners | Supplier list |
| GET | /projects | Projects portfolio |
| GET | /team | Team members |
| GET | /blog | Blog posts |
| POST | /contact | Submit contact form |

## Production Build

```bash
# Frontend
cd frontend && npm run build
# → outputs to dist/ — serve via Nginx/Apache or any static host

# Backend
cd backend
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

For deployment, point Nginx to `backend/public/` for the API and `frontend/dist/` for the SPA, or deploy them on separate domains.

## Troubleshooting

**"Class Filament\PanelProvider not found"** → composer install didn't complete. Run `composer install` again.

**Vite reports `/api/* 502`** → Laravel isn't running. Make sure `php artisan serve` is up on port 8000.

**Migration error "Access denied"** → MariaDB root uses unix_socket auth on Ubuntu. Use the dedicated `gfc` user instead.

**Map iframe blank** → expected; replace the embed URL via Filament admin → Settings → Google Maps embed.

**Product images show as gradient placeholders** → upload via Filament admin → Services → [edit] → Image. Until then the bundled `/images/product-{slug}.jpg` files are used as fallback.
