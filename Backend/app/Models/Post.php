<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    protected $table = 'posts';
    protected $fillable = [
        'title',
        'author',
        'content',
    ];

    public function postActions(): HasMany
    {
        return $this->hasMany(PostAction::class);
    }
}
