<?php

namespace App\Services;

use App\Contracts\ActionType;
use App\Contracts\PostResult;
use App\Contracts\UserPostInterest;
use App\Models\Post;
use App\Models\PostAction;
use Carbon\Carbon;

// TODO: Dependency inject this class as an implementation of IPostService to enable configurable app behavior and flexibility in testing
class PostService
{
    /**
     * Gets all posts with the requesting user's interest in each post
     */
    public function getPostsWithUserInterest(string $userIpAddress): array
    {
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
     * Creates a new post
     * @param array $data The data to create the post with
     * @return array The ID, created at and updated at of the created post
     */
    public function createPost(array $data): array
    {
        $post = new Post();
        $post->title = $data['title'];
        $post->author = $data['author'];
        $post->content = $data['content'];
        $post->save();

        return [
            'id' => $post->id,
            'createdAt' => $post->created_at,
            'updatedAt' => $post->updated_at
        ];
    }

    /**
     * Creates a new post action by a user
     * @param Post $post The post to create an action for
     * @param string $userIpAddress The requesting user's IP address
     * @param int $actionType The type of action to create
     * @return void Returns nothing
     */
    public function createPostAction(Post $post, string $userIpAddress, int $actionType)
    {
        $postAction = new PostAction();
        $postAction->post_id = $post->id;
        $postAction->user_ip_address = $userIpAddress;
        $postAction->action_type = $actionType;
        $postAction->save();
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
