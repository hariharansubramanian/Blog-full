<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('post_actions', function (Blueprint $table) {
            $table->foreign('action_type')
                ->references('type')
                ->on('lookup_action_types')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('post_actions', function (Blueprint $table) {
            $table->dropForeign(['action_type']);
        });
    }
};
