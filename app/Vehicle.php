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
    
    
    public function recalcStats()
    {
        $logs = $this->logs()->get();
        $this->sum_distance = 0;
        $this->sum_time = 0;
        $this->drives = count($logs);
        
        foreach($logs as $l) {
            $this->sum_distance += $l->distance;
            $this->sum_time += $l->time;
        }
        
        $this->save();
    }
}
