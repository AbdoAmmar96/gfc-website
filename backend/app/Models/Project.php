<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Project extends Model
{
    use HasFactory, HasTranslations;

    public $translatable = [
        'title', 'client_name', 'industry', 'summary',
        'challenge', 'solution_text', 'results',
    ];

    protected $fillable = [
        'slug', 'cover_image', 'gallery', 'title', 'client_name',
        'industry', 'summary', 'challenge', 'solution_text', 'results',
        'completed_at', 'order', 'is_featured', 'is_published',
    ];

    protected $casts = [
        'gallery' => 'array',
        'results' => 'array',
        'completed_at' => 'date',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'order' => 'integer',
    ];

    public function scopePublished($q) { return $q->where('is_published', true); }
    public function scopeFeatured($q) { return $q->where('is_featured', true); }
    public function scopeOrdered($q) { return $q->orderBy('order')->orderByDesc('completed_at'); }
}
