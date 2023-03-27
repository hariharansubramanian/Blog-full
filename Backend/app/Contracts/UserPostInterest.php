<?php

namespace App\Contracts;
/**
 * This represents the cumulative interest of a user's ip address on a blog post.
 * This is calculated by subtracting the number of undo actions from the number of actions.
 * For example, if a user has liked a post 3 times and disliked it 2 times, the net interest is 'Liked'.
 */
enum UserPostInterest: string
{
    case Liked = "liked";
    case Disliked = "disliked";
    case Neutral = "neutral";
}
