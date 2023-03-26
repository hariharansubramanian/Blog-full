<?php

namespace App\Contracts;

use App\Models\Post;

/**
 * This class represents the result of a post query.
 * It contains the post itself, the total likes and dislikes for the post and the requesting user's interest in the post.
 * @package App\Contracts
 * @property Post $post Post from database
 * @property int $likeCount Total likes for the post
 * @property int $dislikeCount Total dislikes for the post
 * @property UserPostInterest $userPostInterest Requesting user's interest in the post
 */
class PostResult
{
    /** @var Post Post from database */
    public Post $post;

    /** @var int Total likes for the post */
    public int $likeCount;

    /** @var int Total dislikes for the post */
    public int $dislikeCount;

    /** @var UserPostInterest Requesting user's interest in the post */
    public UserPostInterest $userPostInterest;

    /**
     * PostResult constructor.
     * @param Post $post Post from database
     * @param int $likeCount Total likes for the post
     * @param int $dislikeCount Total dislikes for the post
     * @param UserPostInterest $userPostInterest Requesting user's interest in the post
     */
    public function __construct(Post $post, int $likeCount, int $dislikeCount, UserPostInterest $userPostInterest)
    {
        $this->post = $post;
        $this->likeCount = $likeCount;
        $this->dislikeCount = $dislikeCount;
        $this->userPostInterest = $userPostInterest;
    }
}
