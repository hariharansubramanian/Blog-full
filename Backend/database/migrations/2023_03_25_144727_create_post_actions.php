<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('post_actions', function (Blueprint $table) {
            $table->unsignedBigInteger('post_id');
            $table->unsignedInteger('action_type');
            $table->string('user_ip_address', 32);
            $table->timestamps();

            // constraints
            $table->primary(['post_id', 'user_ip_address', 'action_type', 'created_at']);
            $table->foreign('post_id')
                ->references('id')
                ->on('posts')
                ->onDelete('cascade');

            // indexes
            $table->index('post_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('post_actions');
    }
};
