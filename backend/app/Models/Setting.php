<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Setting extends Model
{
    use HasFactory, HasTranslations;

    public $translatable = [
        'site_name', 'site_tagline',
        'hero_title', 'hero_subtitle', 'hero_cta_text',
        'about_short', 'address_line', 'working_hours',
    ];

    protected $fillable = [
        'logo', 'logo_dark', 'favicon',
        'site_name', 'site_tagline',
        'hero_title', 'hero_subtitle', 'hero_cta_text', 'hero_image',
        'about_short',
        'phone_primary', 'phone_secondary',
        'email_primary', 'email_support',
        'address_line', 'whatsapp',
        'facebook', 'linkedin', 'instagram', 'twitter', 'youtube',
        'google_maps_embed', 'working_hours',
    ];

    /**
     * Always operate on the single settings row. Creates it lazily.
     */
    public static function instance(): self
    {
        return static::firstOrCreate(['id' => 1]);
    }
}
