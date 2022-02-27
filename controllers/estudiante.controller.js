const db = require('../models');
const Estudiante = db.estudiantes;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
    let data = {
        no_de_control: req.body.no_de_control,
        nombres: req.body.nombres,
        apellido_paterno: req.body.apellido_paterno,
        apellido_materno: req.body.apellido_materno,
        fecha_nacimiento: req.body.fecha_nacimiento,
        carrera: req.body.carrera,
        semestre: req.body.semestre,
        estatus: req.body.estatus,
        promedio_certificado: req.body.promedio_certificado,
        fecha_creacion: req.body.fecha_creacion
    }

    Estudiante.create(data)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message:
                    "Error no se pudo guardar el estudiante"
            });
        });
}

exports.findAll = (req, res) => {
    const nombres = req.query.nombres;
    var condition = nombres ? { nombres: { [Op.iLike]: `%${nombres}%` } } : null;
    Estudiante.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los estudiantes."
            });
        });
};

exports.findAllLimit = (req, res) => {
    if (req.params) {
        const nombres = req.query.nombres;
        var condition = nombres ? { nombres: { [Op.iLike]: `%${nombres}%` } } : null;
        Estudiante.findAll({ where: condition, limit: req.params.limit })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al recuperar todos los estudiantes."
                });
            });
    }

};

exports.findByCareer = (req, res) => {
    const career = req.body.carrera;
    const condition = { carrera: career };

    Estudiante.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar los estudiantes con carrera " + career
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Estudiante.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar el estudiante con id = " + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Estudiante.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Estudiante se actualizo con exito."
                });
            } else {
                res.send({
                    message: `No se encontro el estudiante con id = ${id}!`
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: "Error al actualizar estudiante con id = " + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Estudiante.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Estudiante eliminado con exito!"
                });
            } else {
                res.send({
                    message: `No se encontro el estudiante con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar el estudiante con id = " + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Estudiante.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Estudiantes fueron eliminados con exito!` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || ""
            });
        });
};
