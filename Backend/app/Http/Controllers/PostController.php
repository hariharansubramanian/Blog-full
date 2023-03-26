<?php

namespace App\Http\Controllers;

use App\Services\PostService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * This controller handles the getting, submitting and updating blog posts and their actions
 */
class PostController extends Controller
{
    /**
     * @var PostService The PostService instance used for handling blog post related operations
     */
    protected PostService $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    /**
     * Get posts along with requesting user's interest in each.
     * This method retrieves all posts, their like/dislike stats and the requesting user's interest on each post
     * @param Request $request The incoming HTTP request.
     * @return JsonResponse A JSON response containing {@see \App\Contracts\PostResult} objects with the posts and user interest details.
     */
    public function getPosts(Request $request)
    {
        $result = $this->postService->getPostsWithUserInterest($request);
        return response()->json($result);
    }
}
