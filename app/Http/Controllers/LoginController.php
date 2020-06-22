<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication passed...
            return response()->json('success!');
        } else {
            return response()->json(["message" => 'Benutzer oder Passwort nicht korrekt!'], 400);
        }
    }
    
    
    public function register(Request $request)
    {
        
    }
    
    
    public function logout(Request $request)
    {
        Auth::logout();
    }
}
