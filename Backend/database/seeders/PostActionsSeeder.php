<?php

namespace Database\Seeders;

use App\Models\ActionType;
use App\Models\Post;
use App\Models\PostAction;
use Faker\Factory as Faker;
use Faker\Generator;
use Illuminate\Database\Seeder;

/** Seed post actions for each post where an individual ip address follows a chronological sequence of Like/Dislike actions.
 *  Each user's ip_address must follow a cyclic sequence of interactions: LIKE -> UNDO_LIKE -> DISLIKE -> UNDO_DISLIKE -> LIKE -> ...
 */
class PostActionsSeeder extends Seeder
{
    private Generator $faker;

    public function __construct()
    {
        $this->faker = Faker::create();
    }

    public function run(): void
    {
        $posts = Post::all();

        // Generate a pool of 5 unique IP addresses
        $numberOfIpAddresses = 5;
        $ipPool = collect()
            ->times($numberOfIpAddresses)
            ->map(fn() => $this->faker->unique()->ipv4);

        // For each post, generate a random number of actions for each IP address in the pool.
        $posts->each(function ($post) use ($ipPool) {
            $postActions = $ipPool
                ->flatMap(function ($ipAddress) {
                    return $this->generateRandomActionsInCyclicPattern($ipAddress);
                })
                ->sortBy('created_at')
                ->values()
                ->all();

            $post->postActions()->saveMany($postActions);
        });
    }

    /**
     * Generate an array of random actions for an IP address that follow the cyclic pattern:
     * LIKE -> UNDO_LIKE -> DISLIKE -> UNDO_DISLIKE -> LIKE -> ...
     */
    private function generateRandomActionsInCyclicPattern(string $ipAddress): array
    {
        $actions = [];
        $maxActions = rand(5, 15);
        $timestamp = now();

        $cycle = [
            ActionType::Like,
            ActionType::Undo_like,
            ActionType::Dislike,
            ActionType::Undo_dislike
        ];

        // Generate a random offset to start with either 'Like' or 'Dislike' in the cycle.
        $randomOffset = rand(0, 1) * 2; // will be either 0 or 2

        // Generate actions until the maximum number of actions is reached.
        for ($currentActionCount = 0; $currentActionCount < $maxActions; $currentActionCount++) {
            // consistently get the next cycle index. If cycle length is 4 we get => 0, 1, 2, 3, 0, 1, 2, 3, ...
            $actionIndex = $currentActionCount + $randomOffset;
            $actionType = $cycle[$actionIndex % count($cycle)];

            $actionData = [
                'action_type' => $actionType,
                'user_ip_address' => $ipAddress,
                'created_at' => $timestamp
            ];

            $actions[] = new PostAction($actionData);

            // Move forward in time for the next action.
            $timestamp = $timestamp->addSeconds(1);
        }

        return $actions;
    }
}
