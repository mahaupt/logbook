<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
    
    public function edit(Request $request, $id)
    {
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
        $user->adminVehicles()->findOrFail($id)->delete();
        return response()->json(['success' => true], 201);
    }
}
