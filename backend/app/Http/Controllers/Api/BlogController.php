<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;

class BlogController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = BlogPost::published()->latestFirst()->paginate(9);
        return response()->json($posts);
    }

    public function show(string $slug): JsonResponse
    {
        $post = BlogPost::published()->where('slug', $slug)->firstOrFail();
        $related = BlogPost::published()->where('id', '!=', $post->id)->latestFirst()->limit(3)->get();
        return response()->json(['data' => $post, 'related' => $related]);
    }
}
