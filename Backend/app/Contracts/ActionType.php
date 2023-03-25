<?php

namespace App\Contracts;

enum ActionType: int
{
    case Like = 1;
    case Undo_like = 2;
    case Dislike = 3;
    case Undo_dislike = 4;
}
