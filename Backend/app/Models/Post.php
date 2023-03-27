<?php

namespace App\Models;

use App\Contracts\ActionType;
use App\Contracts\UserPostInterest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

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
