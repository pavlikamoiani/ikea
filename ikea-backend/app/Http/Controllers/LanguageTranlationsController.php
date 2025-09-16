<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\LanguageTranlations;

class LanguageTranlationsController extends Controller
{

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


    public function save(Request $request, $lang)
    {
        if ($request->hasFile('file') && $request->input('key') === 'header_logo_url') {
            $model = (new LanguageTranlations())->setLanguage($lang);
            $old = $model->where('key', 'header_logo_url')->first();
            if ($old && !empty($old->value)) {
                $parsed = parse_url($old->value, PHP_URL_PATH);
                if ($parsed) {
                    $relative = ltrim(str_replace('/storage/', '', $parsed), '/');
                    $storagePath = storage_path('app/public/' . $relative);
                    if (file_exists($storagePath)) {
                        @unlink($storagePath);
                    }
                }
            }

            $file = $request->file('file');
            $filename = uniqid('logo_') . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('public/logos', $filename);
            $url = url('/storage/logos/' . $filename);

            $translation = $model->updateOrCreate(
                ['key' => 'header_logo_url'],
                ['value' => $url]
            );
            return response()->json($translation);
        }

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
