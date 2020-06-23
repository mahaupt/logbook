<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    //
    
    public function users()
    {
        return $this->belongsToMany('App\User', 'vehicle_roles')->withPivot('role');
    }
    
    public function logs()
    {
        return $this->hasMany('App\Log');
    }
}
