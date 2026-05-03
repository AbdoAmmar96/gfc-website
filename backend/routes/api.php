<?php

use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\PartnerController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\SolutionController;
use App\Http\Controllers\Api\TeamMemberController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API (consumed by the React frontend)
|--------------------------------------------------------------------------
| Returns translatable fields as JSON {"ar":"...","en":"..."} so the
| frontend picks the active language client-side.
*/

Route::prefix('v1')->group(function () {

    Route::get('settings', [SettingController::class, 'show']);

    Route::get('services', [ServiceController::class, 'index']);
    Route::get('services/featured', [ServiceController::class, 'featured']);
    Route::get('services/{slug}', [ServiceController::class, 'show']);

    Route::get('solutions', [SolutionController::class, 'index']);
    Route::get('solutions/{slug}', [SolutionController::class, 'show']);

    Route::get('projects', [ProjectController::class, 'index']);
    Route::get('projects/featured', [ProjectController::class, 'featured']);
    Route::get('projects/{slug}', [ProjectController::class, 'show']);

    Route::get('partners', [PartnerController::class, 'index']);
    Route::get('team', [TeamMemberController::class, 'index']);

    Route::get('blog', [BlogController::class, 'index']);
    Route::get('blog/{slug}', [BlogController::class, 'show']);

    Route::post('contact', [ContactController::class, 'store'])->middleware('throttle:5,1');
});
