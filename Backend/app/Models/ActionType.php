<?php

namespace App\Models;

use Illuminate\Validation\Rules\Enum;

enum ActionType: int
{
    case Like = 1;
    case Undo_like = 2;
    case Dislike = 3;
    case Undo_dislike = 4;
}
