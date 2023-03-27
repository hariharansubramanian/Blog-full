<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        DB::statement('ALTER TABLE post_actions MODIFY created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6)');
        DB::statement('ALTER TABLE post_actions MODIFY updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE posts MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
        DB::statement('ALTER TABLE posts MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
    }
};
