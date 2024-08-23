const { Router } = require('express');
const router = Router();

// Aqui van los imports

const empleadosController = require('../controllers/empleadoController');
const proyectosController = require('../controllers/proyectoController');
const asignacionController = require('../controllers/asignacionController');
const alertaController = require('../controllers/alertaController');

//RUTAS

module.exports = (app) => {

    //AQUI VAN LAS RUTAS

    // Crear un nuevo empleado
    router.post('/empleados/create', empleadosController.createEmpleado);

    // Obtener todos los empleados
    router.get('/empleados', empleadosController.getAllEmpleados);

    // Obtener un empleado por ID
    router.get('/empleados/:idEmpleado', empleadosController.getEmpleadoById);

    // Actualizar un empleado por ID
    router.put('/empleados/:idEmpleado', empleadosController.updateEmpleado);

    // Eliminar un empleado por ID
    router.delete('/empleados/:idEmpleado', empleadosController.deleteEmpleado);

    // Crear un nuevo proyecto
    router.post('/proyectos/create', proyectosController.createProyecto);

    // Obtener todos los proyectos
    router.get('/proyectos', proyectosController.getAllProyectos);

    // Obtener un proyecto por ID
    router.get('/proyectos/:idProyecto', proyectosController.getProyectoById);

    // Actualizar un proyecto por ID
    router.put('/proyectos/:idProyecto', proyectosController.updateProyecto);

    // Eliminar un proyecto por ID
    router.delete('/proyectos/:idProyecto', proyectosController.deleteProyecto);

    // Crear una nueva asignación
    router.post('/asignaciones/create', asignacionController.createAsignacion);

    // Obtener todas las asignaciones
    router.get('/asignaciones', asignacionController.getAllAsignaciones);

    // Obtener una asignación por ID
    router.get('/asignaciones/:idAsignacion', asignacionController.getAsignacionById);

    // Actualizar una asignación por ID
    router.put('/asignaciones/:idAsignacion', asignacionController.updateAsignacion);

    // Eliminar una asignación por ID
    router.delete('/asignaciones/:idAsignacion', asignacionController.deleteAsignacion);

    // Crear una nueva alerta
    router.post('/alertas/create', alertaController.createAlerta);

    // Obtener todas las alertas
    router.get('/alertas', alertaController.getAllAlertas);

    // Obtener una alerta por ID
    router.get('/alertas/:idAlerta', alertaController.getAlertaById);

    // Actualizar una alerta por ID
    router.put('/alertas/:idAlerta', alertaController.updateAlerta);

    // Eliminar una alerta por ID
    router.delete('/alertas/:idAlerta', alertaController.deleteAlerta);

    app.use('/', router);

};