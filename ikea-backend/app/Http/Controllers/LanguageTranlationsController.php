<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\LanguageTranlations;

class LanguageTranlationsController extends Controller
{
    /**
     * Получить перевод по ключу и языку
     */

    public function index(Request $request, $lang)
    {
        $translations = (new LanguageTranlations())->setLanguage($lang)->get();
        return response()->json($translations);
    }

    public function get(Request $request, $lang, $key)
    {
        $translation = (new LanguageTranlations())->setLanguage($lang)->where('key', $key)->first();
        if (!$translation) {
            return response()->json(['message' => 'Not found'], 404);
        }
        return response()->json($translation);
    }

    /**
     * Сохранить или обновить перевод
     */
    public function save(Request $request, $lang)
    {
        $data = $request->validate([
            'key' => 'required|string',
            'value' => 'required|string',
        ]);

        $model = (new LanguageTranlations())->setLanguage($lang);
        $translation = $model->updateOrCreate(
            ['key' => $data['key']],
            ['value' => $data['value']]
        );

        return response()->json($translation);
    }
}
