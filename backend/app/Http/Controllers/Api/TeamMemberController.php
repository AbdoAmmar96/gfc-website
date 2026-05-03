<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\JsonResponse;

class TeamMemberController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => TeamMember::published()->ordered()->get()]);
    }
}
