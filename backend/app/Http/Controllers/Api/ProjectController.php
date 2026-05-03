<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => Project::published()->ordered()->get()]);
    }

    public function featured(): JsonResponse
    {
        return response()->json(['data' => Project::published()->featured()->ordered()->limit(6)->get()]);
    }

    public function show(string $slug): JsonResponse
    {
        $project = Project::published()->where('slug', $slug)->firstOrFail();
        return response()->json(['data' => $project]);
    }
}
