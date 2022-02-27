module.exports = app => {
    const Estudiante = require("../controllers/estudiante.controller");
    var router = require("express").Router();

    router.get("/findByCareer", Estudiante.findByCareer);

    router.get("/findAll:limit", Estudiante.findAllLimit);

    router.get("/findAll", Estudiante.findAll);

    router.get("/:id", Estudiante.findOne);

    router.post("/", Estudiante.create);

    router.put("/:id", Estudiante.update);

    router.delete("/:id", Estudiante.delete);

    router.delete("/", Estudiante.deleteAll);

    app.use('/estudiantes', router);
}