//Script con instrucciones base y constantes del sistema.     //
//Version 0.2.0-b.                                           //
//Usa MaterializeCss 1.0.0.                                 //
//Firestore                                               //
//https://github.com/chubuntuarc/custom_firestore.git    //


//Constantes.//.................................................................................................................................
//Nombre de la app.//
const V_app_name = 'A&A Distribuidora';  //Titulo de la pagina/app.//
const V_top_picture = '/images/top.png'   //Imagen de fondo que aparece en la parte superior.     |     Opcional//

//Formato de calendario usado en Datepicker.//
const opciones_fecha = { 
    i18n: {
        cancel: 'Cancelar',
        clear: 'Limpiar',
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdays: ['Domingo', 'Lunes', 'Mates', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
    },
    format: 'dd/mm/yyyy'
};

//Variables.//...................................................................................................................................
//Variable para objeto dinamico.//
var V_objeto_dinamico = [];

//Funciones globales.//..........................................................................................................................
//Asignar el nombre de la aplicacion.//
function M_app_name() {
    document.title = V_app_name;
}

//Generar un reporte en base a los parametros recibidos.//
function M_reporte(nombre_coleccion, campo_condicion, evaluacion_condicion, valor_condicion, campo_condicion_2, evaluacion_condicion_2, valor_condicion_2, campo_condicion_3, evaluacion_condicion_3, valor_condicion_3, campo_condicion_4, evaluacion_condicion_4, valor_condicion_4){
    var resultado = [];

    switch (arguments.length) {
        case 4:
            var coleccion = valor_condicion === '100' ? db.collection(nombre_coleccion) : db.collection(nombre_coleccion).where(campo_condicion, evaluacion_condicion, valor_condicion); //Se obtiene la coleccion a consultar.//

            coleccion.onSnapshot(collection => {
                if (collection.size > 0) {
                    M_objecto(collection);
                } else {
                    M.toast({ html: 'No se encontraron régistros', classes: 'rounded' });
                }
            });
            break;

        case 7:
            var coleccion = valor_condicion === '100' ? db.collection(nombre_coleccion) : db.collection(nombre_coleccion).where(campo_condicion, evaluacion_condicion, valor_condicion); //Se obtiene la coleccion a consultar.//
            var coleccion_2 = valor_condicion_2 === '100' ? coleccion : coleccion.where(campo_condicion_2, evaluacion_condicion_2, valor_condicion_2);

            coleccion_2.onSnapshot(collection => {
                if (collection.size > 0) {
                    M_objecto(collection);
                } else {
                    M.toast({ html: 'No se encontraron régistros', classes: 'rounded' });
                }
            });
            break;

        case 10:
            var coleccion = valor_condicion === '100' ? db.collection(nombre_coleccion) : db.collection(nombre_coleccion).where(campo_condicion, evaluacion_condicion, valor_condicion); //Se obtiene la coleccion a consultar.//
            var coleccion_2 = valor_condicion_2 === '100' ? coleccion : coleccion.where(campo_condicion_2, evaluacion_condicion_2, valor_condicion_2);
            var coleccion_3 = valor_condicion_3 === '100' ? coleccion_2 : coleccion.where(campo_condicion_3, evaluacion_condicion_3, valor_condicion_3);

            coleccion_3.onSnapshot(collection => {
                if (collection.size > 0){
                    M_objecto(collection);
                }else{
                    M.toast({ html: 'No se encontraron régistros', classes: 'rounded' });
                }
            });
            break;

        case 13:
            var coleccion = valor_condicion === '100' ? db.collection(nombre_coleccion) : db.collection(nombre_coleccion).where(campo_condicion, evaluacion_condicion, valor_condicion); //Se obtiene la coleccion a consultar.//
            var coleccion_2 = valor_condicion_2 === '100' ? coleccion : coleccion.where(campo_condicion_2, evaluacion_condicion_2, valor_condicion_2);
            var coleccion_3 = valor_condicion_3 === '100' ? coleccion_2 : coleccion.where(campo_condicion_3, evaluacion_condicion_3, valor_condicion_3);
            var coleccion_4 = valor_condicion_4 === '100' ? coleccion_3 : coleccion.where(campo_condicion_4, evaluacion_condicion_4, valor_condicion_4);

            coleccion_4.onSnapshot(collection => {
                if (collection.size > 0) {
                    M_objecto(collection);
                } else {
                    M.toast({ html: 'No se encontraron régistros', classes: 'rounded' });
                }
            });
            break;
    
        default:
            M.toast({ html: 'No se encontraron régistros', classes: 'rounded' });
            break;
    }
}

//Objeto dinamico para trabajar con datos obtenidos en firestore. crea  V_objeto_dinamico   /     M_objecto(collection);//
function M_objecto(collection){
    V_objeto_dinamico = [];
    collection.forEach(doc => {
        V_objeto_dinamico.push(doc.data());
    });
}

//Crear tabla automaticamente.    tipo_tabla[0=firestore | 1=dinamico] |     M_table(collection, 'vista_reporte', ['val1, 'val2'], ['val1, 'val2']);//
function M_table(collection, tipo_tabla, ubicacion_html, headers, rows){
    var objetivo = document.getElementById(ubicacion_html);

    var tbl = document.getElementById('tabla_automatica'); //Limpiar tabla antes de agregar la nueva.//
    if (tbl) tbl.parentNode.removeChild(tbl);

    var tabla = '<table id="tabla_automatica" class="striped responsive-table centered">';
    //Head.//
        tabla += '<thead>';
        tabla += '<tr>';
        headers.forEach(data => {
            tabla += '<th>'+data+'</th>';
        });
        tabla += '</tr>';
        tabla += '</thead>';
    //Body.//
        tabla += '<tbody id="tabla_dinamica_body">';
        tabla += '</tbody>';
        tabla += '</table>';
        tabla += '<div class="progress col s8 offset-s2"><div class="indeterminate"></div ></div >'; //Loader

        objetivo.innerHTML = tabla;

        function generarRenglones(){ //Funcion interna, controlada con tiempo.//

            document.getElementsByClassName('progress')[0].style.display = 'none';

            //Generar rows de la tabla.//
            if (tipo_tabla === 0) { //Si la coleccion es directa de firestore.//
                collection.forEach(doc => {
                    var body = '<tr>';
                    rows.forEach(data => {
                        body += '<td>' + doc.data()[data] + '</td>';
                    });
                    /*body += '<td>' + doc.data().folio + '</td>';*/
                    body += '</tr>';
                    document.getElementsByTagName('tbody')[1].insertRow(0);
                    document.getElementsByTagName('tbody')[1].rows[0].innerHTML = body;
                });
            } else if (tipo_tabla === 1) { //Si es un arreglo creado manualmente con M_objeto.//
                collection.forEach(doc => {
                    var body = '<tr>';
                    rows.forEach(data => {
                        console.log(doc[data]);
                        body += '<td>' + doc[data] + '</td>';
                    });
                    body += '</tr>';
                    document.getElementsByTagName('tbody')[1].insertRow(0);
                    document.getElementsByTagName('tbody')[1].rows[0].innerHTML = body;
                });
            }

        } setTimeout(generarRenglones, 3000); //Ejecutar a los 3 segundos.//

        

    /*collection.forEach(doc => {
        console.log(doc.data());   //<===  Crear una tabla html en la clase .vista-reporte y ver como llega a data
    });*/
}


//Select de lista completa.    |      M_select_list('almacenes','select_almacen',1); //
function M_select_list(nombre_coleccion,select_html,opcion_todos){
    var coleccion = db.collection(nombre_coleccion); //Se obtiene la coleccion a consultar.//
    var s_select = document.getElementById(select_html); //Select DOM.//

    if (opcion_todos === 1) {
        var option = document.createElement("option");
        option.value = '100';
        option.text = 'Todos';
        s_select.appendChild(option);
    }

    coleccion.onSnapshot(collection => {

        collection.forEach(doc => {

            var option = document.createElement("option");
            option.value = doc.id;
            option.text = doc.data().nombre;
            s_select.appendChild(option);
            M_select(select_html); //Inicializar el select.//
        });

    });

}

//Inicializadores globales.//...................................................................................................................
//Inicializar selects.     |     M_select('select_reporte');//
function M_select(select,options_list) {
    var select_origen = document.getElementById(select);        //Obtener select.//

    if(options_list){

        for(var i=0; i<options_list.length; i++){

            var option = document.createElement("option");
            option.value = parseInt(i) + 1;
            option.text = options_list[i];
            select_origen.appendChild(option);
            
        }

    }

    //Obtiene un select y lo inicializa.//
    M.FormSelect.init(select_origen); 
}

//Inicializar datepickers.     |     M_datepicker('dp_fecha_inicio');//
function M_datepicker(dp_date_picker){
    var dp_origen = document.getElementById(dp_date_picker);     //Obtener datepicker.//
    //Obtiene un datepicker y lo inicializa.//
    M.Datepicker.init(dp_origen, opciones_fecha);   
}

//Conversiones globales.//........................................................................................................................
//Convertir a fecha.     |     M_toDate('11/02/2019')//
function M_toDate(fecha_string) {
    var dp_fecha_inicio = document.getElementById(fecha_string);
    var dateParts = dp_fecha_inicio.value.split("/");
    var fecha_date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    return fecha_date;
}