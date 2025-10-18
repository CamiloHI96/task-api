<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

//Mostrar todas las tareas
Route::get('/tareas', function () {
    $tareas=DB::table('tareas')->get();
    return $tareas;
});

//Mostrar tarea por id
// Route::get("/tarea/{id}", function ($id) {
//     $tarea = DB::table("tareas")->where("id", $id)->get();
//     return $tarea;
// });

//Crear tarea
Route::get("/creart/{responsable}/{tarea}/{fecha}", function ($responsable, $tarea, $fecha) {
    $insertado = DB::table("tareas")->insert([
        "NombreTarea" => $tarea,
        "Responsable" => $responsable,
        "Fecha" => $fecha,
        "estado" => 1
    ]);

    if ($insertado) {
        return [
            "estado" => "ok",
            "resp" => "Tarea creada con éxito"
        ];
    } else {
        return [
            "estado" => "no",
            "resp" => "Error: no se pudo crear la tarea"
        ];
    }
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