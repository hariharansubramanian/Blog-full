<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('blog.posts', function (Blueprint $table) {
            $table->id();
            $table->string('title',50);
            $table->string('author',50);
            $table->string('content',10000);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog.posts');
    }
};
