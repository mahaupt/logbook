<?php

use Illuminate\Database\Seeder;

class LogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $vehicles = App\Vehicle::all();
        foreach($vehicles as $v) {
            for ($i=0; $i < 50; $i++) {
                $log = new App\Log;
                $log->date = now();
                $log->start = Str::random(3);
                $log->finish = Str::random(3);
                $log->time = rand(10,100);
                $log->distance = rand(10,100);
                $log->user()->associate(App\User::all()->random());
                $log->vehicle()->associate($v);
                $log->save();
            }
            
            $v->recalcStats();
        }
    }
}
