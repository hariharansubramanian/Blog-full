<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::all();
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
