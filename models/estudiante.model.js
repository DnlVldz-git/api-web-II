module.exports = (sequelize, Sequelize) => {
    const Estudiante = sequelize.define("estudiante", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            defaultValue: 2001,
        },
        no_de_control: {
            type: Sequelize.TEXT
        },
        nombres: {
            type: Sequelize.TEXT
        },
        apellido_paterno: {
            type: Sequelize.TEXT
        },
        apellido_materno: {
            type: Sequelize.TEXT
        },
        fecha_nacimiento: {
            type: Sequelize.DATE
        },
        carrera: {
            type: Sequelize.TEXT
        },
        semestre: {
            type: Sequelize.TEXT
        },
        estatus: {
            type: Sequelize.TEXT
        },
        promedio_certificado: {
            type: Sequelize.NUMERIC
        },
        fecha_creacion: {
            type: Sequelize.DATE
        }
    });

    return Estudiante;
};

