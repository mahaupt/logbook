<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vehicle;
use App\User;

class VehicleController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = $request->user();
        return response()->json($user->vehicles()->get(), 200);
    }
    
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'bike_id' => 'required|string'
        ]);
        
        $user = $request->user();
        $vehicle = new Vehicle;
        $vehicle->name = $request->name;
        $vehicle->bike_id = $request->bike_id;
        $vehicle->save();
        
        $user->vehicles()->attach($vehicle, ['role' => 'admin']);
        
        return response()->json(['success' => true], 201);
    }
    
    public function show(Request $request, $id)
    {
        $user = $request->user();
        $vehicle = $user->vehicles()->findOrFail($id);
        return response()->json($vehicle, 200);
    }
    
    public function getUsers(Request $request, $id)
    {
        $user = $request->user();
        $vehicle = $user->adminVehicles()->findOrFail($id);
        return response()->json($vehicle->users, 200);
    }
    
    public function getRemainingUsers(Request $request, $id)
    {
        $user = $request->user();
        $vehicle = $user->adminVehicles()->findOrFail($id);
        $vehicle_users = $vehicle->users;
        $remaining = User::whereNotIn('id', $vehicle_users->pluck('id')) // exclude already followed
                        ->where('id', '<>', $user->id) // and the user himself
                        ->get();
                        
        return response()->json($remaining, 200);
    }
    
    public function addUser(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required|numeric',
            'role' => 'required|in:user,admin'
        ]);
        
        $user = $request->user();
        $vehicle = $user->adminVehicles()->findOrFail($id);
        $add_user = User::findOrFail($request->user_id);
        $add_user->vehicles()->attach($vehicle, ['role' => $request->role]);
    }
    
    public function editUser(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required|numeric',
            'role' => 'required|in:user,admin'
        ]);
        
        $user = $request->user();
        $vehicle = $user->adminVehicles()->findOrFail($id);
        $add_user = User::findOrFail($request->user_id);
        $add_user->vehicles()->detach($vehicle);
        $add_user->vehicles()->attach($vehicle, ['role' => $request->role]);
    }
    
    public function removeUser(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required|numeric'
        ]);
        
        $user = $request->user();
        $vehicle = $user->adminVehicles()->findOrFail($id);
        $add_user = User::findOrFail($request->user_id);
        $add_user->vehicles()->detach($vehicle);
    }
    
    public function edit(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'bike_id' => 'required|string'
        ]);
        
        $user = $request->user();
        $vehicle = $user->adminVehicles()->findOrFail($id);
        $vehicle->name = $request->name;
        $vehicle->bike_id = $request->bike_id;
        $vehicle->save();
        return response()->json(['success' => true], 201);
    }
    
    public function delete(Request $request, $id)
    {
        $user = $request->user();
        $vehicle = $user->adminVehicles()->findOrFail($id);
        $vehicle->logs()->delete();
        $vehicle->delete();
        return response()->json(['success' => true], 201);
    }
}
