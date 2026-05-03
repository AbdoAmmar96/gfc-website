<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:120',
            'email'   => 'required|email|max:160',
            'phone'   => 'nullable|string|max:30',
            'company' => 'nullable|string|max:160',
            'subject' => 'nullable|string|max:200',
            'message' => 'required|string|max:5000',
        ]);

        $submission = ContactSubmission::create($validated);

        // Optional: dispatch a notification email here. Wire up once SMTP is configured.

        return response()->json([
            'message' => 'Thanks for reaching out — we will get back to you shortly.',
            'data' => ['id' => $submission->id],
        ], 201);
    }
}
