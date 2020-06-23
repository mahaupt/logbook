<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'name' => 'Markus Adminus',
            'email' => 'admin@mail.net',
            'password' => Hash::make('passwort'),
        ]);
        
        DB::table('users')->insert([
            'name' => 'Inga Userus',
            'email' => 'user1@mail.net',
            'password' => Hash::make('passwort'),
        ]);
        
        DB::table('users')->insert([
            'name' => 'Ulga Userus',
            'email' => 'user2@mail.net',
            'password' => Hash::make('passwort'),
        ]);
    }
}
