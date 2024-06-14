<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(): \Inertia\Response
    {
        $posts = Post::with('user')->latest()->get();

        return Inertia::render('Posts/Index', [
            'posts' => PostResource::collection($posts)
        ]);
    }

    public function Store(StorePostRequest $request)
    {
        auth()->user()->posts()->create($request->validated());
    }

}
