<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    public $translatable = ['title', 'text']; // Columns to translate (optional)

    protected $fillable = [
        'title',
        'text',
        'writer_id',
        'slug', // Add a slug for SEO-friendly URLs (optional)
        'published_at', // Allow publishing time control (optional)
        'image', // Add an image field if desired (optional)
    ];

    protected $casts = [
        'published_at' => 'datetime', // Cast published_at to datetime (optional)
    ];

    public function writer()
    {
        return $this->belongsTo(User::class, 'writer_id'); // Assuming User model
    }

    
}
