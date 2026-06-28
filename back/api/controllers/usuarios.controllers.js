import * as services from "../../services/usuarios.service.js"

export function createUser(req, res){
    services.createUser(req.body)
        .then( usuario => res.status(201).json(usuario) )
        .catch( err => res.status(500).json(err) )
}

export function login(req, res){
    services.login(req.body)
        .then( usuario => res.status(200).json(usuario) )
        .catch( err => res.status(400).json({ message: "Usuario o contraseña incorrectos" }) )
}

export function getUsuarios(req, res){
    services.getUsuarios()
        .then( usuarios => res.status(200).json(usuarios) )
        .catch( err => res.status(500).json({ message: "error al obtener los usuarios" }) )
}

export function asignarRol(req, res){
    const idUsuario = req.params.idUsuario
    const rol = req.body.rol
    if( !idUsuario ) res.status(404).json({ message: "El id es obligatorio" })
    services.asignarRol(idUsuario, rol)
        .then( data => res.status(202).json(data) )
        .catch( err => res.status(500).json({ message: "No se puso asignar el rol" }) )
}