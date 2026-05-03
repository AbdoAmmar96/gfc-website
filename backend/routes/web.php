<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect(config('app.url'));
});

// Filament panel routes are auto-registered by AdminPanelProvider at /admin
