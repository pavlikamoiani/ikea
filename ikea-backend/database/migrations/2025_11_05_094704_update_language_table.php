<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Change 'value' column to nullable for 'language_translations_am'
        DB::statement('ALTER TABLE language_translations_am MODIFY value TEXT NULL');

        // Change 'value' column to nullable for 'language_translations_ru'
        DB::statement('ALTER TABLE language_translations_ru MODIFY value TEXT NULL');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Revert 'value' column to NOT NULL
        DB::statement('ALTER TABLE language_translations_am MODIFY value TEXT NOT NULL');
        DB::statement('ALTER TABLE language_translations_ru MODIFY value TEXT NOT NULL');
    }
};
