<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LogController extends Controller
{
    //
    public function indexByVehicle(Request $request, $vid)
    {
        $user = $request->user();
        $vehicle = $user->vehicles()->findOrFail($vid);
        return response()->json($vehicle->logs()->get(), 200);
    }
    
    public function index(Request $request)
    {
        $user = $request->user();
        return response()->json($user->logs()->get(), 200);
    }
    
    public function create(Request $request, $vid)
    {
        $user = $request->user();
        $vehicle = $user->vehicles()->findOrFail($vid);
        $log = new Log;
        $log->start = $request->start;
        $log->finish = $request->finish;
        $log->time = $request->time;
        $log->distance = $request->distance;
        $log->user()->associate($user);
        $log->vehicle()->associate($vehicle);
        $log->save();
        $vehicle->recalcStats();
        
        return response()->json(['success' => true], 201);
    }
    
    public function show(Request $request, $id)
    {
        $user = $request->user();
        $log = $user->vehicles()->logs()->findOrFail($id);
        return response()->json($log, 200);
    }
    
    public function edit(Request $request, $id)
    {
        $user = $request->user();
        
        $log = null;
        try {
            $log = $user->logs()->findOrFail($id);
        } catch(Exception $e) {
            $log = $user->adminVehicles()->logs()->findOrFail($id);
        }
        
        $log->start = $request->start;
        $log->finish = $request->finish;
        $log->time = $request->time;
        $log->distance = $request->distance;
        $log->save();
        
        $vehicle = $log->vehicle->get();
        $vehicle->recalcStats();
        
        return response()->json(['success' => true], 201);
    }
    
    public function delete(Request $request, $id)
    {
        $user = $request->user();
        
        $log = null;
        try {
            $log = $user->logs()->findOrFail($id);
        } catch(Exception $e) {
            $log = $user->adminVehicles()->logs()->findOrFail($id);
        }
        
        $vehicle = $log->vehicle->get();
        $log->delete();
        
        $vehicle->recalcStats();
        
        return response()->json(['success' => true], 201);
    }
}
