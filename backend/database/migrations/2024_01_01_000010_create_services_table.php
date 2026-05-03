<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('icon')->nullable(); // lucide icon name or path
            $table->string('image')->nullable();
            $table->json('title');           // {"ar":"...","en":"..."}
            $table->json('short_description'); // shown on cards
            $table->json('description');     // full markdown/html
            $table->json('features')->nullable(); // [{ "ar":"...", "en":"..." }, ...]
            $table->json('meta_title')->nullable();
            $table->json('meta_description')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->timestamps();

            $table->index(['is_published', 'order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
