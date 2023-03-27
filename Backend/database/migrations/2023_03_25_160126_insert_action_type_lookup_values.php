<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        DB::table('lookup_action_types')->insert([
            ['type' => 1, 'value' => 'Like'],
            ['type' => 2, 'value' => 'Undo_like'],
            ['type' => 3, 'value' => 'Dislike'],
            ['type' => 4, 'value' => 'Undo_dislike'],
        ]);
    }

    public function down(): void
    {
        DB::table('lookup_action_types')->whereIn('type', [1, 2, 3, 4])->delete();
    }
};
