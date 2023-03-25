<?php

namespace App\Contracts;

use App\Models\Post;

/** Response json object for the GET posts request **/
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

    public function __construct($post, $likeCount, $dislikeCount, $userPostInterest)
    {
        $this->post = $post;
        $this->likeCount = $likeCount;
        $this->dislikeCount = $dislikeCount;
        $this->userPostInterest = $userPostInterest;
    }
}
