<?php

namespace App\Services;

use App\Contracts\ActionType;
use App\Contracts\PostResult;
use App\Contracts\UserPostInterest;
use App\Models\Post;
use Illuminate\Http\Request;

// TODO: Dependency inject this class as an implementation of IPostService to enable configurable app behavior and flexibility in testing
class PostService
{
    /**
     * Gets all posts with the requesting user's interest in each post
     */
    public function getPostsWithUserInterest(Request $request): array
    {
        // Retrieve the requesting user's IP address to check his blog post interest
        $userIpAddress = $request->ip();

        $posts = Post::all();

        return $posts
            ->map(function ($post) use ($userIpAddress) {
                $postActions = $post->postActions()->get(); // TODO: make sure Database is being queried only once here, and loads data in memory for the 4 count operations below

                $likeCount = $postActions->where('action_type', ActionType::Like)->count();
                $undoLikeCount = $postActions->where('action_type', ActionType::Undo_like)->count();
                $dislikeCount = $postActions->where('action_type', ActionType::Dislike)->count();
                $undoDislikeCount = $postActions->where('action_type', ActionType::Undo_dislike)->count();

                $totalLikes = $likeCount - $undoLikeCount;
                $totalDislikes = $dislikeCount - $undoDislikeCount;

                $userPostInterest = $this->getUserPostInterest($userIpAddress, $post);

                return new PostResult($post, $totalLikes, $totalDislikes, $userPostInterest);
            })
            ->toArray();
    }

    /**
     * Gets the user's interest in a post by looking at their last like/dislike action
     * @param string $userIpAddress The requesting user's IP address
     * @param Post $post The post to get the user's interest in
     * @return UserPostInterest The user's interest in the post
     */
    private function getUserPostInterest(string $userIpAddress, Post $post): UserPostInterest
    {
        // Get the last user action, this tells us if the user has liked, disliked or is neutral with the post
        $lastLikeInteraction = $post->postActions()
            ->where('user_ip_address', $userIpAddress)
            ->whereIn('action_type', [ActionType::Like, ActionType::Undo_like, ActionType::Dislike, ActionType::Undo_dislike])
            ->orderBy('created_at', 'desc')
            ->first();

        // If the user has not interacted with the post, return neutral
        if (!$lastLikeInteraction) return UserPostInterest::Neutral;

        return match ($lastLikeInteraction->action_type) {
            ActionType::Like => UserPostInterest::Liked,
            ActionType::Dislike => UserPostInterest::Disliked,
            default => UserPostInterest::Neutral,
        };
    }
}
