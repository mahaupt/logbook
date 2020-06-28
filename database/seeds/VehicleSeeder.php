<?php

use Illuminate\Database\Seeder;
use App\User;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    
    public function run()
    {
        App\Vehicle::truncate();
        
        //
        $admin = App\User::where('email', 'admin@mail.net')->firstOrFail();
        $user1 = App\User::where('email', 'user1@mail.net')->firstOrFail();
        $user2 = App\User::where('email', 'user2@mail.net')->firstOrFail();
        
        $vehicle = new App\Vehicle;
        $vehicle->name = "Ebike Argon";
        $vehicle->bike_id = "E187966GHJ";
        $vehicle->save();
        
        $admin->vehicles()->attach($vehicle, ['role' => 'admin']);
        $user1->vehicles()->attach($vehicle, ['role' => 'user']);
        $user2->vehicles()->attach($vehicle, ['role' => 'user']);
    }
}
