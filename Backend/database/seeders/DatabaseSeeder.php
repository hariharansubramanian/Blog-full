<?php

use Database\Seeders\PostActionsSeeder;
use Database\Seeders\PostsSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PostsSeeder::class,
            PostActionsSeeder::class
        ]);
    }
}
