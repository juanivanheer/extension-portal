var link, objetoTabla = [], objetoBusqueda = [], objetoFinal = [], contenedor_seleccion = document.createElement("div");
var texto = document.getElementById("textoBusc");

var iconos = document.createElement("link");
iconos.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
iconos.rel = "stylesheet"
document.head.appendChild(iconos);

var div_mail = document.createElement("div");
div_mail.innerHTML = '<a id="mail" class="btn btn-default btn-sm"><i class="fa fa-paper-plane"></i> Generar mail </a>';
div_mail.style.textAlign = "center";
div_mail.style.marginBottom = "20px";

var fecha_actual = new Date;

var busqueda_avanzada = document.getElementsByClassName("col-xs-12 col-sm-12 col-md-12 col-lg-12 busqueda-avanzada")[0];

var esBusquedaAvanzada = false;

/* document.getElementsByClassName("abrir-avanzada")[0].addEventListener("click", function () {
    if (objetoFinal.length > 0) {
        setTimeout(() => {
            busqueda_avanzada.appendChild(document.getElementsByTagName("div")[87]);
            busqueda_avanzada.appendChild(document.getElementsByTagName("div")[87]);
            esBusquedaAvanzada = true;
            //crearListado();
        }, 200);

    }
})

//HAY UN PROBLEMA CUANDO SE VUELVE DE CERRAR
document.getElementsByClassName("cerrar-avanzada2")[0].addEventListener("click", function () {
    if (objetoFinal.length > 0) {
        setTimeout(() => {
            esBusquedaAvanzada = false;
            busqueda_avanzada.removeChild(busqueda_avanzada.children[2]);
            busqueda_avanzada.removeChild(busqueda_avanzada.children[1]);
            crearListado();
        }, 500);

    }
}) */

$(document).ready(function () {
    setInterval(() => {
        if (document.getElementById("seleccion0") == undefined || document.getElementById("seleccion0") == null) {
            if (document.getElementsByClassName("tr-busc").length > 0) {
                obtenerDatos();
                pestañas();
            }
        }

        /*      
        let cantidad = 0;
        if (document.getElementById("seleccion0") == null) {
            if (objetoBusqueda.length > 0) {
                for (let index = 0; index < objetoBusqueda.length; index++) {
                    const element = objetoBusqueda[index];
                    if (document.getElementsByClassName("paginate_button current")[0].innerText == element.pagina && texto.value == element.busqueda) {
                        objetoTabla.push(element);
                        cantidad++;
                    }
                }

                if (cantidad == 0) {
                    if (document.getElementsByClassName("tr-busc").length > 0) {
                        obtenerDatos();
                        pestañas();
                        objetoBusqueda.push(objetoTabla);
                    }
                } else {
                    pestañas();
                }
            } else {
                if (document.getElementsByClassName("tr-busc").length > 0) {
                    obtenerDatos();
                    pestañas();
                    objetoBusqueda.push(objetoTabla);
                }
            }
        } */

        if (objetoFinal.length > 0 && document.getElementsByClassName("tr-busc") != null) {
            for (let index = 0; index < objetoFinal.length; index++) {
                const element = objetoFinal[index];
                var i = String(element.checkbox).slice(9, 10);
                if (i <= document.getElementsByClassName("tr-busc").length) {
                    var fila_titulo = document.getElementsByClassName("tr-busc")[i].children[1].innerText;
                    var fila_medio = document.getElementsByClassName("tr-busc")[i].children[2].innerText;
                    if (document.getElementsByClassName("paginate_button current")[0].innerText == element.pagina && texto.value == element.busqueda && fila_titulo == element.titulo && fila_medio == element.medio) {
                        document.getElementById(element.checkbox).checked = true;
                    }
                }
            }
        }

        /*         if (document.getElementById("contenedor_seleccion") != null) {
                    mostrarBtnMail();
                } */

    }, 10000);
})


function pestañas() {
    for (let i = 0; i < document.getElementsByClassName("tr-busc").length; i++) {
        //POR CADA FILA DE LA TABLA, AGREGO UN CHECKBOX Y AGREGO EL .ID DE ESE CHK AL OBJETO DE ESA FILA
        var chk = document.getElementsByClassName("tr-busc")[i].appendChild(document.createElement("input"));
        chk.hidden = false;
        chk.type = "checkbox";
        chk.id = "seleccion" + i;
        Object.assign(objetoTabla[i], { "checkbox": "seleccion" + i });

        chk.addEventListener("click", function () {
            var checkbox = document.getElementById("seleccion" + i);
            if (checkbox.checked) {
                //AGREGA EL ELEMENTO SELECCIONADO AL OBJETO FINAL
                objetoFinal.push(objetoTabla[i])
                console.log(objetoFinal);

                crearListado();

            } else {
                for (let j = 0; j < objetoFinal.length; j++) {
                    if (objetoFinal[j] != null && objetoFinal[j].busqueda == objetoTabla[i].busqueda && objetoFinal[j].pagina == objetoTabla[i].pagina && objetoFinal[j].checkbox == objetoTabla[i].checkbox) {
                        eliminarObjetos(j);
                        break;
                    } else continue;
                }

                if (objetoFinal.length == 0 && document.getElementById("mail") != null) {
                    div_mail.remove();
                }
            }
        })
    }
}

function eliminarObjetos(j) {
    if (j == 0) {
        document.getElementById("btn_eliminar_" + j).remove();
        document.getElementById("paragraph" + j).remove();
        objetoFinal.shift(j);
        crearListado();
    } else {
        document.getElementById("btn_eliminar_" + j).remove();
        document.getElementById("paragraph" + j).remove();
        objetoFinal.splice(j, 1);
        crearListado();
    }
    console.log(objetoFinal)
}

function crearListado() {
    if (!esBusquedaAvanzada) {
        if (document.getElementsByTagName("div")[87] != null) {
            document.getElementsByTagName("div")[87].remove();
            contenedor_seleccion = document.createElement("div");
        }
    } else contenedor_seleccion = document.createElement("div");

    //AGREGA LOS ELEMENTOS SELECCIONADOS DEBAJO DEL BUSCADOR
    for (let j = 0; j < objetoFinal.length; j++) {
        if (document.getElementById("paragraph" + j) == null) {

            let titulo = objetoFinal[j].titulo;
            let medio = objetoFinal[j].medio;
            let link = objetoFinal[j].link

            let paragraph = document.createElement("p");
            paragraph.id = "paragraph" + j;
            paragraph.style = "text-align: left; margin-left: 35px; margin-top: 10px;background:white"

            let btn_eliminar = document.createElement("button");
            btn_eliminar.className = "btn btn-danger fa fa-trash-o fa-lg";
            btn_eliminar.style = "border: none; color: white; padding: 12px 14px; font-size: 14px; cursor: pointer; margin-right: 10px"
            btn_eliminar.id = "btn_eliminar_" + j;

            if (String(titulo).length > 100) {
                titulo = String(titulo).slice(0, 100);
                titulo = String(titulo).concat("...")
            }

            paragraph.innerText = "" + titulo + " (";

            let a = document.createElement("a");
            a.innerText = "" + medio + ")";
            a.href = link;
            a.target = "_blank";

            paragraph.appendChild(a);
            paragraph.appendChild(btn_eliminar)
            contenedor_seleccion.appendChild(paragraph);
            contenedor_seleccion.id = "contenedor_seleccion";
            contenedor_seleccion.style = "direction: rtl; text-align: center; margin-bottom: 20px";


            //HAY QUE BUSCAR LA FORMA DE ELIMINARLO Y DESCHECKEAR CUANDO ESTÁ EN LA MISMA PAGINA
            btn_eliminar.addEventListener("click", function () {
                setTimeout(() => {
                    if (document.getElementsByClassName("paginate_button current")[0].innerText == objetoFinal[j].pagina && texto.value == objetoFinal[j].busqueda) {
                        document.getElementById(objetoFinal[j].checkbox).checked = false;
                    }

                    eliminarObjetos(j);

                    if (objetoFinal.length == 0 && document.getElementById("mail") != null) {
                        div_mail.remove();
                    }
                }, 300);

            });
        } else continue;
    }

    if (!esBusquedaAvanzada) {
        document.getElementsByTagName("div")[77].append(contenedor_seleccion);
        mostrarBtnMail();
    } else {
        document.getElementsByTagName("div")[77].append(contenedor_seleccion);
        mostrarBtnMail();
        //busqueda_avanzada.appendChild(document.getElementsByTagName("div")[87]);
        //busqueda_avanzada.appendChild(document.getElementsByTagName("div")[87]);
    }
}

function mostrarBtnMail() {
    if (document.getElementById("mail") == null) {
        div_mail.innerHTML = '<a id="mail" class="btn btn-default btn-sm"><i class="fa fa-paper-plane"></i> Generar mail </a>';
        div_mail.style.textAlign = "center";
        div_mail.style.marginBottom = "20px";
        document.getElementsByTagName("div")[77].append(div_mail);
        enviarMail();
    } else {
        document.getElementById("mail").remove();

        div_mail.innerHTML = '<a id="mail" class="btn btn-default btn-sm"><i class="fa fa-paper-plane"></i> Generar mail </a>';
        div_mail.style.textAlign = "center";
        div_mail.style.marginBottom = "20px";
        document.getElementsByTagName("div")[77].append(div_mail);
        enviarMail();
    }
}

function obtenerDatos() {
    var titulo, medio, showN, nuevo = {};
    var coleccion = document.querySelectorAll("tr");

    objetoTabla = [];

    for (let index = 1; index < coleccion.length; index++) {
        let element = coleccion[index];
        for (let j = 0; j < element.children.length; j++) {
            let element2 = element.children[j];
            if (j == 1) {
                titulo = element2.innerText;
                showN = element2.children[0].attributes[0].nodeValue;
                showN = showN.slice(7, showN.length - 2);
                $.ajax({
                    async: false,
                    type: 'GET',
                    url: 'showNota?notaKey=' + showN,
                    success: function (data) {
                        var posicion = String(data).indexOf("http://portal.nexnews.cl/showN?valor=")
                        link = "http://portal.nexnews.cl/showN?valor=" + String(data).slice(posicion + 37, posicion + 42);
                    }
                });
            }
            if (j == 2) {
                medio = element2.innerText;
            }
            if (j == 3) {
                nuevo = {
                    "titulo": titulo,
                    "medio": medio,
                    "link": link,
                    "busqueda": texto.value,
                    "pagina": document.getElementsByClassName("paginate_button current")[0].innerText,
                }
                objetoTabla.push(nuevo);
                objetoBusqueda.push(nuevo);
                break;
            }
        }
    }
}

function enviarMail() {
    document.getElementById("mail").addEventListener("click", function () {

        var titulo = document.createElement("p");
        titulo.style.fontSize = "20px";
        titulo.style.textAlign = "center";
        titulo.style.marginTop = "10px";
        titulo.style.fontWeight = "bold";
        titulo.style.textDecoration = "underline"
        titulo.innerText = "CLIPPING DE PRENSA";

        var texto_fecha = document.createElement("p");
        texto_fecha.style.fontSize = "20px";
        texto_fecha.style.textAlign = "center";
        texto_fecha.style.marginBottom = "10px";
        texto_fecha.style.fontWeight = "bold";
        texto_fecha.innerText = calcularFechaActual();

        var div_titulo = document.createElement("div");
        div_titulo.style.textAlign = "center";

        div_titulo.appendChild(titulo);
        div_titulo.appendChild(texto_fecha);

        var subtitulo1 = document.createElement("p");
        subtitulo1.style.fontSize = "16px";
        subtitulo1.style.marginTop = "10px";
        subtitulo1.style.marginBottom = "5px";
        subtitulo1.style.fontWeight = "bold";
        subtitulo1.style.textDecoration = "underline"
        subtitulo1.innerText = "NOTICIAS DE <NombreCliente>";

        var emlContent = "data:message/rfc822 eml;charset=utf-8,", emailTo = "";
        var emailSubject = "Clipping de prensa";
        var htmlDocument = "";

        let rubros = [];
        for (let index = 0; index < objetoFinal.length; index++) {
            const elemento = objetoFinal[index];
            if (rubros.length == 0) {
                rubros.push(elemento.busqueda);
            } else {
                if (!rubros.includes(elemento.busqueda)) {
                    rubros.push(elemento.busqueda)
                }
            }
        }

        for (let i = 0; i < rubros.length; i++) {
            const rubro_busqueda = rubros[i];
            htmlDocument += '<div style="margin-top: 10px; margin-bottom: 10px;">' + '\n'
            htmlDocument += '<p style="font-weight: bold; font-size: 13px; text-decoration: underline"> Búsuqeda: ' + rubro_busqueda + '</p>' + '\n'
            for (let j = 0; j < objetoFinal.length; j++) {
                const objeto_busqueda = objetoFinal[j];
                if (rubro_busqueda == objeto_busqueda.busqueda) {
                    htmlDocument += '<p>' + objeto_busqueda.titulo + ' (' + '<a href="' + objeto_busqueda.link + '">' + objeto_busqueda.medio + '</a>)</p>' + '\n';
                }
            }
            htmlDocument += "</div>" + '\n';
        }

        //htmlDocument += '<p>' + elemento.titulo + ' (' + '<a href="' + elemento.link + '">' + elemento.medio + '</a>)</p>' + '\n';

        emlContent += 'To: ' + emailTo + '\n';
        emlContent += 'Subject: ' + emailSubject + '\n';
        emlContent += 'X-Unsent: 1' + '\n';
        emlContent += 'Content-Type: multipart/mixed; boundary=--boundary_text_string' + '\n';
        emlContent += '' + '\n';
        emlContent += '----boundary_text_string' + '\n';
        emlContent += 'Content-Type: text/html; charset=UTF-8' + '\n';
        emlContent += '' + '\n';
        emlContent += '<html>' + '\n';
        emlContent += '<body>' + '\n';
        emlContent += div_titulo.outerHTML + '\n';
        emlContent += subtitulo1.outerHTML + '\n';
        emlContent += htmlDocument + '\n';
        emlContent += '</body>' + '\n';
        emlContent += '</html>' + '\n';
        emlContent += '' + '\n';

        var encodedUri = encodeURI(emlContent); //encode spaces etc like a url
        var a = document.createElement('a'); //make a link in document
        var linkText = document.createTextNode("fileLink");
        a.appendChild(linkText);
        a.href = encodedUri;
        a.id = 'fileLink';
        a.download = 'correo.eml';
        a.style = "display:none;"; //hidden link
        document.body.appendChild(a);
        document.getElementById('fileLink').click(); //click the link
    })
}

function calcularFechaActual() {
    var fecha = '(' + fecha_actual.getDate() + ' DE ';
    fecha += obtenerMes();
    fecha += ' DE ' + fecha_actual.getFullYear();
    fecha += ")";

    return fecha;
}

function obtenerMes() {
    let mes_numerico = fecha_actual.getMonth() + 1

    if (mes_numerico == 1) return "ENERO";
    if (mes_numerico == 2) return "FEBRERO";
    if (mes_numerico == 3) return "MARZO";
    if (mes_numerico == 4) return "ABRIL";
    if (mes_numerico == 5) return "MAYO";
    if (mes_numerico == 6) return "JUNIO";
    if (mes_numerico == 7) return "JULIO";
    if (mes_numerico == 8) return "AGOSTO";
    if (mes_numerico == 9) return "SEPTIEMBRE";
    if (mes_numerico == 10) return "OCTUBRE";
    if (mes_numerico == 11) return "NOVIEMBRE";
    if (mes_numerico == 12) return "DICIEMBRE";
}