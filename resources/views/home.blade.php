@extends('master')

@section('title', 'Home')

@section('content')

<form class="form-login text-center">
    <h1><i class="i-logo fas fa-stream"></i></h1>
    <h1 class="h3 mb-3 ont-weight-normal">Logbook</h1>
    <label for="inputEmail" class="sr-only">Email</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email" required autofocus>
    <label for="inputPassword" class="sr-only">Passwort</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="Passwort" required>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
    <a href="#" class="btn btn-lg btn-secondary btn-block">Account erstellen</a>
</form>

@endsection