<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Solution;
use Illuminate\Http\JsonResponse;

class SolutionController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => Solution::published()->ordered()->get()]);
    }

    public function show(string $slug): JsonResponse
    {
        $solution = Solution::published()->where('slug', $slug)->firstOrFail();
        return response()->json(['data' => $solution]);
    }
}
