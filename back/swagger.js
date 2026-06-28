import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title: "Api de videojuegos",
        description: "Esta es una api de pruebas sobre videojuegos"
    },
    host: "localhost:2026",
    basePath: "/api",
    schemes: ["http"]
}

const endpointsFiles = [
    "./api/routes/videojuegos.routes.js",
    "./api/routes/categorias.routes.js",
    "./api/routes/plataformas.routes.js"
]

const swagger = swaggerAutogen()
swagger("swagger.json", endpointsFiles, doc)
