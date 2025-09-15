<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LanguageTranlations extends Model
{
    use HasFactory;

    protected $table;
    protected $fillable = ['key', 'value'];

    /**
     * Установить таблицу в зависимости от языка
     */
    public function setLanguage($lang)
    {
        $this->table = 'language_translations_' . $lang;
        return $this;
    }
}
