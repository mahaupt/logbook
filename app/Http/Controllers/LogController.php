<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Log;
use App\Vehicle;

class LogController extends Controller
{
    //
    public function indexByVehicle(Request $request, $vid)
    {
        $user = $request->user();
        $vehicle = $user->vehicles()->findOrFail($vid);
        $logs = $vehicle->logs()->get();
        foreach($logs as $i=>$l) {
            $logs[$i]->editable = $vehicle->pivot->role == 'admin' || $l->user_id == $user->id;
        }
        
        return response()->json($logs, 200);
    }
    
    public function index(Request $request)
    {
        $user = $request->user();
        return response()->json($user->logs()->get(), 200);
    }
    
    public function create(Request $request, $vid)
    {
        $request->validate([
            'date' => 'required|date_format:Y-m-d',
            'start' => 'required|string',
            'finish' => 'required|string', 
            'time' => 'required|numeric'
        ]);
        
        $user = $request->user();
        $vehicle = $user->vehicles()->findOrFail($vid);
        $log = new Log;
        $log->date = $request->date . ' 00:00:00';
        $log->start = $request->start;
        $log->finish = $request->finish;
        $log->time = intval($request->time);
        $dist = floatval(str_replace(",", ".", $request->distance));
        $log->distance = $dist;
        $log->user()->associate($user);
        $log->vehicle()->associate($vehicle);
        $log->save();
        $vehicle->recalcStats();
        
        return response()->json(['success' => true], 201);
    }
    
    public function show(Request $request, $id)
    {        
        $user = $request->user();
        $vehicles = $user->vehicles()->get();
        foreach($vehicles as $v) {
            $log = $v->logs->find($id);
            if ($log) {
                return response()->json($log, 200);
            }
        }
        return response()->json(['message' => 'No query results for model [App\\Log]'], 404);
    }
    
    public function edit(Request $request, $id)
    {
        $request->validate([
            'date' => 'required|date_format:Y-m-d',
            'start' => 'required|string',
            'finish' => 'required|string', 
            'time' => 'required|numeric'
        ]);
        
        $user = $request->user();
        
        $log = null;
        try {
            $log = $user->logs()->findOrFail($id);
        } catch(Exception $e) {
            $vehicles = $user->adminVehicles()->get();
            foreach($vehicles as $v) {
                $log = $v->logs->find($id);
                if ($log) {
                    break;
                }
            }
            
            if (!$log) {
                return response()->json(['message' => 'No query results for model [App\\Log]'], 404);
            }
        }
        
        $log->date = $request->date . ' 00:00:00';
        $log->start = $request->start;
        $log->finish = $request->finish;
        $log->time = intval($request->time);
        $dist = floatval(str_replace(",", ".", $request->distance));
        $log->distance = $dist;
        $log->save();
        
        $vehicle = $log->vehicle;
        if ($vehicle) {
            $vehicle->recalcStats();
        }
        
        return response()->json(['success' => true], 201);
    }
    
    public function delete(Request $request, $id)
    {
        $user = $request->user();
        
        $log = null;
        try {
            $log = $user->logs()->findOrFail($id);
        } catch(Exception $e) {
            $vehicles = $user->adminVehicles()->get();
            foreach($vehicles as $v) {
                $log = $v->logs->find($id);
                if ($log) {
                    break;
                }
            }
            
            if (!$log) {
                return response()->json(['message' => 'No query results for model [App\\Log]'], 404);
            }
        }
        
        $vehicle = $log->vehicle;
        $log->delete();
        
        if ($vehicle) {
            $vehicle->recalcStats();
        }
        
        return response()->json(['success' => true], 201);
    }
}
