<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


use App\Http\Controllers\LanguageTranlationsController;

Route::get('/translations/{lang}', [LanguageTranlationsController::class, 'index']);
Route::post('/translations/{lang}', [LanguageTranlationsController::class, 'save']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/storage/{folder}/{filename}', function ($folder, $filename) {
    $path = storage_path("app/{$folder}/{$filename}");
    if (!file_exists($path)) {
        abort(404);
    }
    return Response::file($path);
});
