<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function getPosts()
    {
        $posts = Post::with('postActions')->get();
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required'],
            'author' => ['required'],
            'content' => ['required'],
        ]);

        return Post::create($request->validated());
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => ['required'],
            'author' => ['required'],
            'content' => ['required'],
        ]);

        $post->update($request->validated());

        return $post;
    }
}
