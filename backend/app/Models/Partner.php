<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'logo', 'website', 'order', 'is_published'];

    protected $casts = [
        'is_published' => 'boolean',
        'order' => 'integer',
    ];

    public function scopePublished($q) { return $q->where('is_published', true); }
    public function scopeOrdered($q) { return $q->orderBy('order')->orderBy('name'); }
}
