<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::get('/prueba',function(){
//     return 'Hola, esta es una ruta de prueba!';
//     return response()->json(['message','Hola, esta es una ruta de prueba!']);
// });

//Mostrar todas las tareas
Route::get('/tareas', function () {
    $tareas=DB::table('tareas')->get();
    return $tareas;
});

//Mostrar tarea por id
Route::get("/tarea/{id}", function ($id) {
    $tarea = DB::table("tareas")->where("id", $id)->get();
    return $tarea;
});

//Crear tarea
Route::get("/creart/{responsable}/{tarea}", function ($responsable,$tarea) {
    $tarea = DB::table("tareas")->insert(
        [
            "NombreTarea"=>$tarea,
            "Responsable"=>$responsable,
            "estado"=>1
        ]);
});

//Eliminar tarea por id
Route::get("/borrarT/{id}", function ($id) {
    $tarea = DB::table("tareas")->where("id", $id)->delete();
    if($tarea){
        $res = [
            "estado" => "ok",
            "resp" => "tarea eliminada con exito"
        ];
    } else {
        $res = [
            "estado" => "no",
            "resp" => "tarea no eliminada"
        ];
    }
    return $res;
});