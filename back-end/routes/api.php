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

// Cambiar estado de una tarea por id
Route::get("/estado/{id}/{nuevoEstado}", function ($id, $nuevoEstado) {
    $actualizar = DB::table("tareas")
        ->where("id", $id)
        ->update(["estado" => $nuevoEstado]);

    if ($actualizar) {
        return [
            "estado" => "ok",
            "resp" => "Estado actualizado correctamente"
        ];
    } else {
        return [
            "estado" => "no",
            "resp" => "Error al actualizar el estado"
        ];
    }
});

// Modificar datos de una tarea por id
Route::get("/modificar/{id}/{tarea}/{responsable}/{fecha}", function ($id, $tarea, $responsable, $fecha) {
    $modificarDatos = DB::table("tareas")
        ->where("id", $id)
        ->update([
            "NombreTarea" => $tarea,
            "Responsable" => $responsable,
            "Fecha" => $fecha
        ]);

    if ($modificarDatos) {
        return [
            "estado" => "ok",
            "resp" => "Datos modificados correctamente"
        ];
    } else {
        return [
            "estado" => "no",
            "resp" => "Error al modificar los datos"
        ];
    }
});