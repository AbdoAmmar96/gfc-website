<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Service extends Model
{
    use HasFactory, HasTranslations;

    public $translatable = [
        'title',
        'short_description',
        'description',
        'features',
        'meta_title',
        'meta_description',
    ];

    protected $fillable = [
        'slug',
        'icon',
        'image',
        'title',
        'short_description',
        'description',
        'features',
        'meta_title',
        'meta_description',
        'order',
        'is_featured',
        'is_published',
    ];

    protected $casts = [
        'features' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'order' => 'integer',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('id');
    }
}
