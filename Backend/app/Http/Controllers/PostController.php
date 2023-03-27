<?php

namespace App\Http\Controllers;

use App\Models\Post;
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
        // Retrieve the requesting user's IP address to check his blog post interest
        $userIpAddress = $request->ip();

        // get posts with requesting user's interest
        $posts = $this->postService->getPostsWithUserInterest($userIpAddress);

        $response = [
            'posts' => $posts,
            'userIpAddress' => $userIpAddress
        ];

        return response()->json($response);
    }

    /**
     * Creates a new blog post
     * @param Request $request The incoming HTTP request.
     * @return JsonResponse A JSON response containing the ID, creation and update timestamps of the newly created post.
     */
    public function createPost(Request $request)
    {
        // validate fields
        $data = $request->validate([
            'title' => 'required|max:50',
            'author' => 'required|max:50',
            'content' => 'required|max:10000'
        ]);

        // create post
        $newPostDetails = $this->postService->createPost($data);

        return response()->json($newPostDetails);
    }

    /**
     * Performs an action on a blog post
     * @param Request $request The incoming HTTP request.
     * @param int $postId The ID of the post to perform the action on
     * @return void Returns nothing
     */
    public function createPostAction(Request $request, int $postId)
    {
        // Retrieve the requesting user's IP address to check his blog post interest
        $userIpAddress = $request->ip();
        $post = Post::findOrFail($postId);

        $this->postService->createPostAction($post, $userIpAddress, $request->actionType);
    }
}
