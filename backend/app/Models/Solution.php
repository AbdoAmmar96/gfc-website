<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Solution extends Model
{
    use HasFactory, HasTranslations;

    public $translatable = [
        'title',
        'short_description',
        'description',
        'benefits',
    ];

    protected $fillable = [
        'slug', 'icon', 'image', 'title', 'short_description',
        'description', 'benefits', 'order', 'is_published',
    ];

    protected $casts = [
        'benefits' => 'array',
        'is_published' => 'boolean',
        'order' => 'integer',
    ];

    public function scopePublished($q) { return $q->where('is_published', true); }
    public function scopeOrdered($q) { return $q->orderBy('order')->orderBy('id'); }
}
