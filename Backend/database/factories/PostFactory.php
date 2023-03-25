<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->text(50),
            'author' => $this->faker->unique()->safeEmail,
            'content' => implode('\n\n', $this->faker->paragraphs(5)),
            'created_at' => now(),
        ];
    }
}
