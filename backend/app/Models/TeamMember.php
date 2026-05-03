<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class TeamMember extends Model
{
    use HasFactory, HasTranslations;

    public $translatable = ['name', 'position', 'bio'];

    protected $fillable = [
        'photo', 'name', 'position', 'bio',
        'linkedin', 'email', 'order', 'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'order' => 'integer',
    ];

    public function scopePublished($q) { return $q->where('is_published', true); }
    public function scopeOrdered($q) { return $q->orderBy('order')->orderBy('id'); }
}
