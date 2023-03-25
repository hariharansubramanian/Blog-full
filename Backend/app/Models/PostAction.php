<?php

namespace App\Models;

use App\Contracts\ActionType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostAction extends Model
{
    use HasFactory;

    protected $table = 'post_actions';
    protected $fillable = [
        'post_id',
        'user_ip_address',
        'action_type',
    ];

    protected $casts = [
        'action_type' => ActionType::class
    ];

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
