<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('lookup.action_types', function (Blueprint $table) {
            $table->unsignedInteger('type');
            $table->string('value', 50);

            // constraints
            $table->primary(['type', 'value']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lookup.action_types');
    }
};
