<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    public function logs()
    {
        return $this->hasMany('App\Log');
    }
    
    public function vehicles()
    {
        return $this->belongsToMany('App\Vehicle', 'vehicle_role')->withPivot('role');
    }
    
    public function adminVehicles()
    {
        return $this->belongsToMany('App\Vehicle', 'vehicle_role')->wherePivot('role', 'admin');
    }
    
    public function userVehicles()
    {
        return $this->belongsToMany('App\Vehicle', 'vehicle_role')->wherePivot('role', 'user');
    }
}
