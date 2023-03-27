<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        DB::statement('ALTER TABLE post_actions MODIFY created_at TIMESTAMP(6) NOT NULL');
        DB::statement('ALTER TABLE post_actions MODIFY updated_at TIMESTAMP(6) NULL');
    }

    public function down(): void
    {

    }
};
