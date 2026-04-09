import { useState, useCallback, useEffect, useRef } from "react";

const REDES = ["Instagram Feed","Instagram Stories","Instagram Reels","Facebook","Facebook Stories","TikTok","X","YouTube Shorts","YouTube"];
const PILARES = ["P1 – Curaduría","P2 – Planes","P3 – Experiencia","P4 – Servicio","P5 – Prueba social","P6 – Cultura"];
const FORMATOS = ["Post estático","Carrusel","Reel","Reel corto","Story interactiva","Story estática","Story","Video","YouTube Short","Live"];
const ESTADOS = ["Pendiente","En producción","Publicado"];
const MESES_ORDEN = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const ANO_ACTUAL = new Date().getFullYear();
// Mes actual (0-indexed) para filtrar meses pasados si se desea
const MES_ACTUAL_IDX = new Date().getMonth();
const DIAS_SEMANA = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];
const ADMIN_PASS = "Teatrando2026Amaya";
const LOGO_SRC = ""


const PILAR_COLOR = {"P1 – Curaduría":"#C40803","P2 – Planes":"#8B0000","P3 – Experiencia":"#B61220","P4 – Servicio":"#1a1a2e","P5 – Prueba social":"#0d2137","P6 – Cultura":"#700B15"};
const RED_ICON = {"Instagram Feed":"📸","Instagram Stories":"📲","Instagram Reels":"🎬","Facebook":"👍","Facebook Stories":"📘","TikTok":"🎵","X":"✖️","YouTube Shorts":"▶️","YouTube":"🎥"};
const RED_COLOR = {"Instagram Feed":"#E1306C","Instagram Stories":"#833AB4","Instagram Reels":"#405DE6","Facebook":"#1877F2","Facebook Stories":"#1877F2","TikTok":"#ff0050","X":"#ffffff","YouTube Shorts":"#FF0000","YouTube":"#FF0000"};
const TIPO_COLOR = {"RESENA":"#7c3aed","3 RAZONES":"#0891b2","5 RAZONES":"#0891b2","FRASE":"#b45309","RECOMENDACION":"#059669","ESTRENO":"#dc2626","SI TE GUSTO":"#be185d","ALERTA PROMO":"#C40803"};
const ESTADO_CFG = {"Pendiente":{color:"#f59e0b",bg:"#2a1f00"},"En producción":{color:"#3b82f6",bg:"#001a2a"},"Publicado":{color:"#22c55e",bg:"#002a10"}};

const OBRAS_REALES = [
  "Señora Presidenta","Tenorio Cómico","Mentiras","Mentidrags","Matilda","¿Cómo te va mi amor?",
  "Notre Dame de París el Musical","El Rey León","Sor-presas Amén","Diario de un Loco",
  "El Pelón en sus tiempos del Cólera","Lo que queda de nosotros","Busco al hombre de mi vida, marido ya tuve",
  "Qué desastre de función","Frida Kahlo el Musical","Ni con ellas ni sin ellas","Las Leonas",
  "La Obscenidad de la Carne","Prendeme","Así lo veo yo","Malinche el Musical","Wenses y Lala",
  "El amor es una mierda","12 Princesas en Pugna","Lo que callamos las suegras"
];

const mkId = (pfx) => `${pfx}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;

const buildPub = (o={}) => ({
  id:mkId("p"),fecha:"",dia:"",mes:"",semana:1,pub:1,
  redes:["Instagram Feed","Facebook"],pilar:"P1 – Curaduría",
  formato:"Post estático",tema:"Nuevo contenido",copy:"Escribe aquí el copy...",
  cta:"",estado:"Pendiente",notas:"",disenho:"",...o
});

const buildResena = (o={}) => ({
  id:mkId("r"),semana:1,obra:"",genero:"Comedia",redSocial:false,
  titulo:"",gancho:"",estado:"Pendiente",notas:"",...o
});

// ─── PARRILLA MARZO CON MIX 70/20/10 CORRECTO (reseñas FUERA del mix) ─────────
// Contenidos: 28 pubs (excluyendo reseñas)
// P1+P2+P3 = 70% = 20 pubs | P4 = 20% = 6 pubs | P5+P6 = 10% = 3 pubs (sin contar reseñas que son independientes)


const BRIEFINGS_INIT = {"Abril":"📌 LÍNEA EDITORIAL ABRIL 2026\n\n🎯 Objetivo: Vacaciones + Especial Día del Niño — convertir el tiempo libre en planes teatrales fáciles.\n👨‍👩‍👧 Audiencia principal: Papás jóvenes · Amigos · Parejas.\n📣 Mensajes clave: 'El mejor plan: teatro con peques' / 'Sal sin estrés: elige por mood/zona'\n📲 CTA dominante: Compra en Teatrando.com.mx + WhatsApp para dudas.\n\nSemana 1 (30 Mar–5 Abr): Vacaciones/puentes — Plan fácil sin complicarte.\nSemana 2 (6–12 Abr): Fin vacaciones + arranque Día del Niño.\nSemana 3 (13–19 Abr): Especial Día del Niño — familias primero.\nSemana 4 (20–26 Abr): Cierre del mes — todas las audiencias."};

let _historial = [];
const regCambio = (id,campo,ant,nuevo) => {
  _historial = [{ts:new Date().toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),id,campo,anterior:typeof ant==="object"?JSON.stringify(ant):String(ant),nuevo:typeof nuevo==="object"?JSON.stringify(nuevo):String(nuevo)},..._historial].slice(0,300);
  return [..._historial];
};


const buildResenas = () => [
  {id:"r_1775523073572_ec28",semana:1,obra:"Malinche el Musical",genero:"Musical",redSocial:false,titulo:"Malinche el Musical: cuando la historia se convierte en espectáculo",gancho:"Una producción que redefine lo que puede hacer el teatro mexicano",estado:"Pendiente",notas:""},
  {id:"r_1775523068268_4ws9",semana:1,obra:"Las Leonas",genero:"Comedia",redSocial:false,titulo:"Las Leonas: la comedia que dice lo que todas piensan pero nadie dice",gancho:"Humor inteligente con corazón — así se hace la comedia en CDMX",estado:"Pendiente",notas:""},
  {id:"r_1775523072893_7209",semana:1,obra:"Notre Dame de París",genero:"Musical",redSocial:false,titulo:"Notre Dame de París en CDMX: amor, tragedia y música que no se olvida",gancho:"Una de las producciones más esperadas llega al Teatro Rafael Solana",estado:"Pendiente",notas:""},
  {id:"r_1775523075445_wlij",semana:1,obra:"Señora Presidenta",genero:"Comedia",redSocial:false,titulo:"Señora Presidenta: por qué sigue llenando cada domingo",gancho:"Meses en cartelera y el público sigue llegando — esto es lo que pasa",estado:"Pendiente",notas:""},
  {id:"r_1775523074617_5111",semana:1,obra:"Editorial",genero:"Teatro General",redSocial:false,titulo:"Por qué el teatro en CDMX es el mejor entretenimiento que no estás aprovechando",gancho:"Una ciudad con más de 100 salas activas y el público aún no lo sabe",estado:"Pendiente",notas:""},
  {id:"r_1775523070393_qsps",semana:1,obra:"Editorial",genero:"Teatro General",redSocial:false,titulo:"10 palabras que solo entiendes si eres amante del teatro en México",gancho:"De 'butaca' a 'bambalinas': el vocabulario que te hace parte de la experiencia",estado:"Pendiente",notas:""},
  {id:"r_1775523067940_9c76",semana:1,obra:"Editorial",genero:"Teatro General",redSocial:false,titulo:"La diferencia entre ver teatro y vivir teatro — y cómo cruzar esa línea",gancho:"Hay un momento en que el teatro deja de ser un plan y se convierte en necesidad",estado:"Pendiente",notas:""},
  {id:"r_1775522611354_qiaq",semana:1,obra:"Frida Kahlo el Musical",genero:"Musical",redSocial:true,titulo:"Frida Kahlo el Musical: arte, dolor y resistencia en el escenario",gancho:"Más que una biopic — es un acto de amor al arte mexicano",estado:"Pendiente",notas:""},
  {id:"r_1775523069288_fy5k",semana:1,obra:"Editorial",genero:"Teatro Infantil",redSocial:false,titulo:"Cuándo y cómo llevar a tu hijo al teatro por primera vez — guía práctica",gancho:"La edad correcta, la obra correcta y lo que no te deben decir",estado:"Pendiente",notas:""},
  {id:"r_1775523067972_xrpy",semana:1,obra:"Editorial",genero:"Teatro General",redSocial:false,titulo:"5 razones por las que el teatro es mejor que el cine — aunque nadie lo admita",gancho:"No es competencia. Pero si lo fuera, el teatro ganaría en estas 5 cosas",estado:"Pendiente",notas:""},
  {id:"r_1775523067767_d9xd",semana:2,obra:"Matilda el Musical",genero:"Musical Familiar",redSocial:false,titulo:"Matilda el Musical: la obra que convierte a los niños en lectores",gancho:"No es magia — es teatro bien hecho con una historia que transforma",estado:"Pendiente",notas:""},
  {id:"r_1775523070184_f0ew",semana:2,obra:"Garfio",genero:"Teatro Infantil",redSocial:false,titulo:"Garfio: la historia de Peter Pan que los niños no esperaban",gancho:"Piratas, aventura y una puesta en escena que desafía la imaginación",estado:"Pendiente",notas:""},
  {id:"r_1775523073602_yyfm",semana:2,obra:"Las Princesas Monsters",genero:"Teatro Infantil",redSocial:false,titulo:"Las Princesas Monsters: cuando las princesas rompen todos los estereotipos",gancho:"Humor, diversidad y un mensaje que los peques entienden perfectamente",estado:"Pendiente",notas:""},
  {id:"r_1775522611356_eu8p",semana:2,obra:"Descubriendo a Cri Cri",genero:"Teatro Infantil",redSocial:true,titulo:"Descubriendo a Cri Cri: por qué Francisco Gabilondo sigue vigente en el escenario",gancho:"Un legado musical que cobra vida y emociona a varias generaciones a la vez",estado:"Pendiente",notas:""},
  {id:"r_1775523068431_ha8w",semana:2,obra:"Paw Patrol",genero:"Teatro Infantil",redSocial:false,titulo:"Paw Patrol en vivo: lo que pasa cuando tus personajes favoritos existen de verdad",gancho:"La reacción de los niños al ver a sus héroes en el escenario no tiene precio",estado:"Pendiente",notas:""},
  {id:"r_1775523070757_7q2i",semana:2,obra:"Editorial",genero:"Teatro Infantil",redSocial:false,titulo:"Por qué el teatro infantil es la mejor inversión cultural que puedes hacer como papá",gancho:"No es entretenimiento — es desarrollo cognitivo, emocional y social en vivo",estado:"Pendiente",notas:""},
  {id:"r_1775523075795_5sgn",semana:2,obra:"Editorial",genero:"Teatro General",redSocial:false,titulo:"El fenómeno de los musicales en México: de Broadway a las calles de CDMX",gancho:"Cómo los musicales pasaron de ser nicho a convertirse en el formato favorito del público",estado:"Pendiente",notas:""},
  {id:"r_1775523070228_x66n",semana:2,obra:"Sor-presas Amén",genero:"Comedia",redSocial:false,titulo:"Sor-presas Amén: la comedia religiosa que hace reír sin ofender — casi",gancho:"Un equilibrio difícil que esta obra logra con maestría y mucho humor",estado:"Pendiente",notas:""},
  {id:"r_1775523075244_jafz",semana:2,obra:"Editorial",genero:"Teatro General",redSocial:false,titulo:"Actores de teatro vs actores de televisión: ¿quién trabaja más duro?",gancho:"La respuesta te va a sorprender — y cambiar la forma en que ves una función",estado:"Pendiente",notas:""},
  {id:"r_1775523068190_z7h6",semana:2,obra:"Editorial",genero:"Teatro General",redSocial:false,titulo:"Guía para no perderte en la cartelera de CDMX: cómo elegir la obra perfecta",gancho:"Con más de 80 obras activas, elegir puede ser abrumador — hasta hoy",estado:"Pendiente",notas:""},
  {id:"r_1775522611142_v8st",semana:3,obra:"31 Minutos",genero:"Musical Infantil",redSocial:true,titulo:"31 Minutos en vivo: por qué Tulio Triviño sigue siendo el rey de la televisión infantil",gancho:"Una generación entera creció con ellos — y ahora los lleva a sus hijos al teatro",estado:"Pendiente",notas:""},
  {id:"r_1775523076093_3mvl",semana:3,obra:"Nuestro Mundo Maravilloso",genero:"Teatro Infantil",redSocial:false,titulo:"Nuestro Mundo Maravilloso: el teatro inmersivo que cambia la relación del niño con el arte",gancho:"No son espectadores — son parte de la historia desde que entran al teatro",estado:"Pendiente",notas:""},
  {id:"r_1775523068996_vsk3",semana:3,obra:"El Reino de los Desobedientes",genero:"Teatro Infantil",redSocial:false,titulo:"El Reino de los Desobedientes: un cuento sobre la rebeldía que vale la pena aplaudir",gancho:"Desobedecer tiene consecuencias — y en el teatro esas consecuencias son divertidísimas",estado:"Pendiente",notas:""},
  {id:"r_1775523071308_1zs2",semana:3,obra:"Gato con Botas Vaqueras",genero:"Teatro Infantil",redSocial:false,titulo:"Gato con Botas Vaqueras: el clásico con bota tejana y mucho humor",gancho:"La mezcla que nadie pidió pero todos necesitaban — y funciona perfectamente",estado:"Pendiente",notas:""},
  {id:"r_1775523073064_ccre",semana:3,obra:"K Pop",genero:"Musical Infantil",redSocial:false,titulo:"K-Pop en el teatro: cuando la cultura coreana conquista los escenarios de CDMX",gancho:"Baile, música y una energía que contagia desde el primer acto",estado:"Pendiente",notas:""},
  {id:"r_1775523072239_y9af",semana:3,obra:"Editorial",genero:"Teatro Infantil",redSocial:false,titulo:"Día del Niño: 8 obras de teatro en CDMX que van a superar cualquier regalo",gancho:"El 30 de abril regala algo que se lleva en el corazón, no en una caja",estado:"Pendiente",notas:""},
  {id:"r_1775523068405_vy32",semana:3,obra:"Editorial",genero:"Teatro Infantil",redSocial:false,titulo:"A qué edad llevar a los niños al teatro — la respuesta según los especialistas",gancho:"No hay una edad mínima, pero sí hay una obra correcta para cada etapa",estado:"Pendiente",notas:""},
  {id:"r_1775523070417_npx3",semana:3,obra:"Editorial",genero:"Teatro General",redSocial:false,titulo:"La magia del teatro infantil: qué pasa en el cerebro de un niño durante una función",gancho:"Neurociencia y narrativa — por qué el teatro es la mejor escuela que existe",estado:"Pendiente",notas:""},
  {id:"r_1775523068394_9i88",semana:3,obra:"Merlina en Transilvania",genero:"Teatro Infantil",redSocial:false,titulo:"Merlina en Transilvania: la oscuridad que los niños necesitan en el escenario",gancho:"No todo el teatro infantil tiene que ser luminoso — y esta obra lo demuestra",estado:"Pendiente",notas:""},
  {id:"r_1775523071332_599g",semana:3,obra:"Editorial",genero:"Teatro General",redSocial:false,titulo:"Si te gustó Matilda la película, así es la experiencia de ver el musical en vivo",gancho:"Una comparativa honesta entre dos formatos y por qué el teatro gana la partida",estado:"Pendiente",notas:""},
  {id:"r_1775523071954_fhkp",semana:4,obra:"Mentiras / Mentidrags",genero:"Comedia",redSocial:false,titulo:"Mentiras y Mentidrags: la misma comedia en dos versiones que no puedes perderte",gancho:"Una obra, dos públicos distintos y doble cantidad de carcajadas garantizadas",estado:"Pendiente",notas:""},
  {id:"r_1775523070229_2bm2",semana:4,obra:"Qué Desastre de Función",genero:"Comedia",redSocial:false,titulo:"Qué Desastre de Función: cuando todo sale mal en el escenario y eso es exactamente el plan",gancho:"El caos organizado como forma de arte — y el público como cómplice involuntario",estado:"Pendiente",notas:""},
  {id:"r_1775523068670_xlxz",semana:4,obra:"Crisis para Principiantes",genero:"Drama",redSocial:false,titulo:"Crisis para Principiantes: el drama de crecer que todos reconocemos pero nadie quiere ver",gancho:"Una obra que duele bien — y de esa incomodidad nace algo muy parecido a la catarsis",estado:"Pendiente",notas:""},
  {id:"r_1775522610604_ojej",semana:4,obra:"12 Princesas en Pugna",genero:"Comedia",redSocial:true,titulo:"12 Princesas en Pugna: el absurdo como lenguaje teatral que funciona mejor de lo que debería",gancho:"Humor surreal, ingenio desbordado y princesas que no se parecen a ningún cuento conocido",estado:"Pendiente",notas:""},
  {id:"r_1775523069498_7kme",semana:4,obra:"Alberto y el Sueño",genero:"Teatro Infantil",redSocial:false,titulo:"Alberto y el Sueño: la obra que enseña a los niños que soñar también es trabajar",gancho:"Un mensaje simple con una puesta en escena que lo convierte en algo extraordinario",estado:"Pendiente",notas:""},
  {id:"r_1775523068567_qlg3",semana:4,obra:"Editorial",genero:"Teatro General",redSocial:false,titulo:"Por qué la comedia teatral en México está viviendo su mejor momento — y no lo sabemos",gancho:"Nunca hubo tanta comedia de calidad en los escenarios de CDMX como ahora mismo",estado:"Pendiente",notas:""},
  {id:"r_1775523074474_tnd7",semana:4,obra:"Editorial",genero:"Teatro General",redSocial:false,titulo:"El teatro como cita perfecta: por qué funciona mejor que el cine para conectar en pareja",gancho:"Sin distracciones, sin pantallas, sin spoilers — solo dos personas y una historia en vivo",estado:"Pendiente",notas:""},
  {id:"r_1775523076107_0jtq",semana:4,obra:"Editorial",genero:"Teatro General",redSocial:false,titulo:"Cómo leer una reseña de teatro — y por qué la opinión del crítico no lo es todo",gancho:"La diferencia entre una crítica profesional y una recomendación honesta para el público general",estado:"Pendiente",notas:""},
  {id:"r_1775523074419_x5fk",semana:4,obra:"El Zorro y el Sabueso",genero:"Teatro Infantil",redSocial:false,titulo:"El Zorro y el Sabueso en el teatro: la amistad más improbable que más enseña",gancho:"Una historia sobre diferencias que los niños entienden mejor que los adultos",estado:"Pendiente",notas:""},
  {id:"r_1775523074397_j79e",semana:4,obra:"Editorial",genero:"Teatro General",redSocial:false,titulo:"Abril teatral en CDMX: el balance del mes que cambió cómo miles de familias viven el teatro",gancho:"Más de 20 obras infantiles, estrenos, musicales y un Día del Niño que se sintió en el escenario",estado:"Pendiente",notas:""},
  {id:"r_dama_negro_s5",semana:5,obra:"La Dama de Negro",genero:"Drama / Terror",redSocial:true,titulo:"La Dama de Negro: por qué el teatro de terror es una experiencia que el cine no puede replicar",gancho:"El miedo en vivo tiene otra dimensión — y esta obra lo sabe perfectamente",estado:"Pendiente",notas:""}
];

const buildAbril = () => [
  {id:"abr_s1_Mié_1_1",fecha:"Mié 1",dia:"Miércoles",mes:"Abril",semana:1,pub:1,redes:["Instagram Feed","Facebook"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"",resenaId:"",tema:"",copy:"",cta:"",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s1_Mié_1_2",fecha:"Mié 1",dia:"Miércoles",mes:"Abril",semana:1,pub:2,redes:["Instagram Feed","Facebook"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"",resenaId:"",tema:"",copy:"",cta:"",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s1_Jue_2_1",fecha:"Jue 2",dia:"Jueves",mes:"Abril",semana:1,pub:1,redes:["Instagram Feed","Facebook"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"",resenaId:"",tema:"",copy:"",cta:"",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s1_Jue_2_2",fecha:"Jue 2",dia:"Jueves",mes:"Abril",semana:1,pub:2,redes:["Instagram Feed","Facebook"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"",resenaId:"",tema:"",copy:"",cta:"",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s1_Vie_3_1",fecha:"Vie 3",dia:"Viernes",mes:"Abril",semana:1,pub:1,redes:["Instagram Feed","Facebook"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"",resenaId:"",tema:"",copy:"",cta:"",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s1_Vie_3_2",fecha:"Vie 3",dia:"Viernes",mes:"Abril",semana:1,pub:2,redes:["Instagram Feed","Facebook"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"",resenaId:"",tema:"",copy:"",cta:"",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s1_Sáb_4_1",fecha:"Sáb 4",dia:"Sábado",mes:"Abril",semana:1,pub:1,redes:["Instagram Feed","Facebook"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"",resenaId:"",tema:"",copy:"",cta:"",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s1_Sáb_4_2",fecha:"Sáb 4",dia:"Sábado",mes:"Abril",semana:1,pub:2,redes:["Instagram Feed","Facebook"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"",resenaId:"",tema:"",copy:"",cta:"",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s1_Dom_5_1",fecha:"Dom 5",dia:"Domingo",mes:"Abril",semana:1,pub:1,redes:["Instagram Feed","Facebook"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"",resenaId:"",tema:"",copy:"",cta:"",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s1_Dom_5_2",fecha:"Dom 5",dia:"Domingo",mes:"Abril",semana:1,pub:2,redes:["Instagram Feed","Facebook"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"",resenaId:"",tema:"",copy:"",cta:"",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s2_01",fecha:"Lun 6",dia:"Lunes",mes:"Abril",semana:2,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"RECOMENDACION",resenaId:"",tema:"Recomendación de la semana — Matilda el Musical",copy:"LA RECOMENDACIÓN TEATRANDO DE ESTA SEMANA:\nMATILDA EL MUSICAL\nLa obra que toda la familia necesita ver este mes.\nViernes 8pm / Sábados 5 y 8:30pm / Domingos 5pm\nCentro Cultural Teatro 1\nBoletos en Teatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s2_02",fecha:"Lun 6",dia:"Lunes",mes:"Abril",semana:2,pub:2,redes:["Instagram Feed", "Facebook"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"FRASE",resenaId:"",tema:"Frase de la semana",copy:"El teatro es el lugar donde los sueños de la humanidad se hacen visibles.\n— Federico García Lorca\nGuárdala y compártela con alguien que ama el teatro.",cta:"Guardar y compartir",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s2_03",fecha:"Mar 7",dia:"Martes",mes:"Abril",semana:2,pub:1,redes:["Instagram Reels", "TikTok", "YouTube Shorts"],pilar:"P1 – Curaduría",formato:"Reel",tipo:"RESENA",resenaId:"r_1775522611354_qiaq",tema:"Frida Kahlo el Musical — Reseña Teatrando",copy:"RESEÑA TEATRANDO: FRIDA KAHLO EL MUSICAL\nNo es solo la vida de Frida. Es su universo entero en el escenario.\nSu dolor convertido en música. Su arte en movimiento.\nSu historia en voz de actores que la hacen vivir de nuevo.\nSábados 6 y 8pm / Domingos 6pm · Teatro Centenario Coyoacán\nLee la reseña completa en Teatrando.com.mx",cta:"Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s2_04",fecha:"Mar 7",dia:"Martes",mes:"Abril",semana:2,pub:2,redes:["Instagram Stories", "Facebook"],pilar:"P4 – Servicio",formato:"Story estática",tipo:"",resenaId:"",tema:"Cómo reservar en Teatrando — 3 pasos",copy:"Reservar es facilísimo:\n1 Entra a Teatrando.com.mx\n2 Elige tu obra y función\n3 Paga y recibe tu boleto digital\n¿Dudas? Te ayudamos por WhatsApp en minutos.",cta:"WhatsApp para dudas",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s2_05",fecha:"Mié 8",dia:"Miércoles",mes:"Abril",semana:2,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P2 – Planes",formato:"Carrusel",tipo:"",resenaId:"",tema:"Plan familiar por zona — dónde llevar a los peques",copy:"¿En qué zona de CDMX vives?\nSur Coapa: Gato con Botas · Merlina · Caperucita · Los Tres Cerditos\nCoyoacán: Caperucita en Coyoacán · Frida Kahlo Musical\nCentro: Teatro Hidalgo · Cri Cri\nForo Shakespeare: El Molino Mágico\nDesliza y encuentra tu plan.\nWhatsApp para recomendación por zona",cta:"WhatsApp por zona",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s2_06",fecha:"Mié 8",dia:"Miércoles",mes:"Abril",semana:2,pub:2,redes:["Instagram Feed", "Facebook", "X"],pilar:"P3 – Experiencia",formato:"Carrusel",tipo:"5 RAZONES",resenaId:"",tema:"5 razones para ver Matilda el Musical este fin",copy:"5 RAZONES PARA VER MATILDA\n1 La música te queda en la cabeza por días\n2 Los niños salen queriendo leer más libros — en serio\n3 Actuación de otro nivel en cada función\n4 Viernes · Sábado · Domingo con múltiples horarios\n5 Centro Cultural Teatro 1 — accesible desde cualquier zona\nReserva en Teatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s2_07",fecha:"Jue 9",dia:"Jueves",mes:"Abril",semana:2,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"ESTRENO",resenaId:"",tema:"Estreno — Paw Patrol en CDMX",copy:"ESTRENO ESTA SEMANA\nPAW PATROL llega a CDMX\nSábados 16 y 23 a las 11 y 1:30pm\nDomingos 17 y 24 a las 11 y 1:30pm\nEl plan perfecto si en casa hay fans de la patrulla.\nReserva antes de que se agoten.\nBoletos en Teatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s2_08",fecha:"Jue 9",dia:"Jueves",mes:"Abril",semana:2,pub:2,redes:["Instagram Stories"],pilar:"P4 – Servicio",formato:"Story interactiva",tipo:"",resenaId:"",tema:"Teatrando Responde — dudas sobre teatro con niños",copy:"Las preguntas que más nos hacen los papás:\n¿Desde qué edad pueden ir los niños?\n¿Cuánto duran las obras infantiles?\n¿Hay que llevar algo especial?\n¿Se puede llevar comida?\nTodas las respuestas en Teatrando.com.mx\nO escríbenos por WhatsApp",cta:"WhatsApp para dudas",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s2_09",fecha:"Vie 10",dia:"Viernes",mes:"Abril",semana:2,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P1 – Curaduría",formato:"Carrusel",tipo:"",resenaId:"",tema:"Cartelera del fin — familiar y para todos",copy:"Viernes 10 y el plan está listo.\nPARA PEQUES: Matilda · Gato con Botas · Cri Cri · Caperucita\nPARA PAREJA: Las Leonas · Malinche · Señora Presidenta\nPARA AMIGOS: Mentidrags · Qué Desastre de Función\nDesliza y elige.\nReserva en Teatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s2_10",fecha:"Vie 10",dia:"Viernes",mes:"Abril",semana:2,pub:2,redes:["Instagram Reels", "TikTok"],pilar:"P2 – Planes",formato:"Reel",tipo:"SI TE GUSTO",resenaId:"",tema:"Si te gustó Matilda la película, vas a amar el musical en vivo",copy:"Si lloraste con Matilda en Netflix...\nEspera a ver lo que pasa cuando la misma historia cobra vida en el escenario.\nMúsica en vivo · actuación real · una magia que la pantalla no puede replicar.\nMatilda el Musical · Centro Cultural Teatro 1\nViernes 8pm · Sábados 5 y 8:30pm · Domingos 5pm",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s2_11",fecha:"Sáb 11",dia:"Sábado",mes:"Abril",semana:2,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"Notre Dame de París — hoy en Teatro Rafael Solana",copy:"NOTRE DAME DE PARÍS · Sábado 11 de abril · 6 y 8:30pm\nTeatro Rafael Solana\nUna obra que te quita el aliento.\nMúsica, drama y una puesta en escena que no olvidarás.\nQuedan lugares — reserva ya.\nTeatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s2_12",fecha:"Sáb 11",dia:"Sábado",mes:"Abril",semana:2,pub:2,redes:["Instagram Feed", "Facebook"],pilar:"P5 – Prueba social",formato:"Post estático",tipo:"",resenaId:"",tema:"Lo que dice el público — Señora Presidenta",copy:"\"La vi el domingo y me reí sin parar desde el principio.\"\nSEÑORA PRESIDENTA sigue siendo la comedia más recomendada de CDMX.\nDomingos 8:30pm · Centro Cultural Teatro 2\n¿Y tú cuándo vas?\nTeatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s2_13",fecha:"Dom 12",dia:"Domingo",mes:"Abril",semana:2,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P2 – Planes",formato:"Carrusel",tipo:"",resenaId:"",tema:"Domingo en familia — mejores opciones de hoy",copy:"Domingo de plan familiar.\nHOY EN CDMX:\nCaperucita en Coyoacán · Dom 2:30 y 4:30pm · Foro Ricardo Villareal\nEl Molino Mágico · Dom 1pm · Foro Shakespeare\nGarfio · Dom 5pm · Danzite\nGato con Botas Vaqueras · Dom 4pm · Foro Coapa\nElige y reserva.\nTeatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s2_14",fecha:"Dom 12",dia:"Domingo",mes:"Abril",semana:2,pub:2,redes:["Instagram Feed", "Facebook"],pilar:"P6 – Cultura",formato:"Post estático",tipo:"",resenaId:"",tema:"El teatro como primer regalo cultural de tu hijo",copy:"El teatro es el primer contacto de muchos niños con el arte en vivo.\nVerlo reírse, asombrarse o emocionarse en la butaca...\nEso no se olvida.\nEste mes hay más de 20 obras infantiles en CDMX.\nRegala algo que se recuerda para siempre.\nTeatrando.com.mx",cta:"Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s3_01",fecha:"Lun 13",dia:"Lunes",mes:"Abril",semana:3,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P1 – Curaduría",formato:"Carrusel",tipo:"RECOMENDACION",resenaId:"",tema:"Recomendación de la semana — Garfio",copy:"LA RECOMENDACIÓN TEATRANDO DE ESTA SEMANA:\nGARFIO\nAventura, piratas y magia en escena — la obra infantil que más emociona este mes.\nDomingos 5pm · Espacio Teatral Danzite\nBoletos en Teatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s3_02",fecha:"Lun 13",dia:"Lunes",mes:"Abril",semana:3,pub:2,redes:["Instagram Feed", "Facebook"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"FRASE",resenaId:"",tema:"Frase de la semana",copy:"El actor es un atleta del corazón.\n— Antonin Artaud\nGuárdala y compártela con alguien que ama el teatro.",cta:"Guardar y compartir",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s3_03",fecha:"Mar 14",dia:"Martes",mes:"Abril",semana:3,pub:1,redes:["Instagram Reels", "TikTok", "YouTube Shorts"],pilar:"P1 – Curaduría",formato:"Reel",tipo:"RESENA",resenaId:"r_1775522611356_eu8p",tema:"Descubriendo a Cri Cri — Reseña Teatrando",copy:"RESEÑA TEATRANDO: DESCUBRIENDO A CRI CRI\nHay artistas que no pasan de moda porque tocan algo eterno.\nFrancisco Gabilondo Soler es uno de ellos.\nEsta obra lleva sus canciones al escenario y hace algo increíble:\nconecta a los niños de hoy con el México de siempre.\nSábados y Domingos 1pm · Teatro Hidalgo\nLee la reseña completa en Teatrando.com.mx",cta:"Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s3_04",fecha:"Mar 14",dia:"Martes",mes:"Abril",semana:3,pub:2,redes:["Instagram Feed", "Facebook"],pilar:"P4 – Servicio",formato:"Post estático",tipo:"",resenaId:"",tema:"Cómo comprar tus boletos para el Día del Niño — paso a paso",copy:"RESERVA FÁCIL EN TEATRANDO\n1 Entra a Teatrando.com.mx\n2 Busca la obra por nombre o zona\n3 Elige la función y el número de boletos\n4 Paga de forma segura\n5 Recibe tu boleto digital al instante\nSin filas · sin complicaciones · sin sorpresas.\n¿Dudas? WhatsApp en minutos.",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s3_05",fecha:"Mié 15",dia:"Miércoles",mes:"Abril",semana:3,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P2 – Planes",formato:"Carrusel",tipo:"",resenaId:"",tema:"Guía primera vez en teatro con peques — paso a paso",copy:"¿Es la primera vez de tu peque en el teatro?\nTe guiamos:\n1 Elige obra corta y divertida\n2 Llega temprano — el ambiente es parte del show\n3 Explícale antes lo que verá\n4 Disfruten juntos\nDesliza para tips completos.\nWhatsApp si tienes dudas",cta:"WhatsApp para asesoría",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s3_06",fecha:"Mié 15",dia:"Miércoles",mes:"Abril",semana:3,pub:2,redes:["Instagram Feed", "Facebook", "X"],pilar:"P3 – Experiencia",formato:"Carrusel",tipo:"5 RAZONES",resenaId:"",tema:"5 razones para ver Garfio con los peques",copy:"5 RAZONES PARA VER GARFIO\n1 Piratas, aventura y magia en escena — sin efectos digitales\n2 Una versión de Peter Pan que los niños no conocían\n3 Domingos 5pm en Espacio Teatral Danzite — horario perfecto\n4 Duración ideal para niños: no los aburre, no los cansa\n5 Los niños salen queriendo ser piratas — o héroes\nReserva en Teatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s3_07",fecha:"Jue 16",dia:"Jueves",mes:"Abril",semana:3,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P2 – Planes",formato:"Post estático",tipo:"",resenaId:"",tema:"Obras por zona — dónde llevar a los peques este fin",copy:"GUÍA POR ZONA PARA EL DÍA DEL NIÑO\nSur Coapa: Gato con Botas · Merlina · Los Tres Cerditos · K-Pop · Caperucita\nCoyoacán: Teatro Centenario · Caperucita en Coyoacán\nCentro: Cri Cri · Teatro Hidalgo\nNorte: El Reino de los Desobedientes · Teatro Enrique Elizalde\nEscríbenos tu zona y te recomendamos la mejor opción\nWhatsApp",cta:"WhatsApp por zona",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s3_08",fecha:"Jue 16",dia:"Jueves",mes:"Abril",semana:3,pub:2,redes:["Instagram Stories"],pilar:"P4 – Servicio",formato:"Story interactiva",tipo:"",resenaId:"",tema:"Alerta — quedan pocos boletos para el Día del Niño",copy:"ALERTA BOLETOS\nLas obras del Día del Niño se están llenando.\nMatilda · Paw Patrol · Las Princesas Monsters ya tienen poca disponibilidad.\nNo dejes para mañana lo que puedes reservar hoy.\nTeatrando.com.mx — rápido, seguro y sin filas.",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s3_09",fecha:"Vie 17",dia:"Viernes",mes:"Abril",semana:3,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P1 – Curaduría",formato:"Carrusel",tipo:"",resenaId:"",tema:"Cartelera del fin — Semana del Día del Niño",copy:"Falta menos de 2 semanas para el Día del Niño — 30 de abril.\nEste fin de semana elige:\nMatilda el Musical · Centro Cultural Teatro 1\nPaw Patrol · Sáb y Dom con horarios especiales\nLas Princesas Monsters · Dom 1:30pm · Teatro Ismael Rdz\nGarfio · Dom 5pm · Danzite\nDescubriendo a Cri Cri · Sáb y Dom 1pm · Teatro Hidalgo\nReserva antes de que se llenen.\nTeatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s3_10",fecha:"Vie 17",dia:"Viernes",mes:"Abril",semana:3,pub:2,redes:["Instagram Feed", "Facebook"],pilar:"P2 – Planes",formato:"Post estático",tipo:"",resenaId:"",tema:"31 Minutos en CDMX — el Sábado 25 de abril",copy:"YA MERO\n31 MINUTOS en CDMX el SÁBADO 25 DE ABRIL\nTulio, Bodoque y todo el elenco en vivo.\nPerfecto para los que crecieron viéndolos — y para los que los descubren ahora.\nReserva antes de que se agoten los lugares.\nTeatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s3_11",fecha:"Sáb 18",dia:"Sábado",mes:"Abril",semana:3,pub:1,redes:["Instagram Reels", "TikTok"],pilar:"P3 – Experiencia",formato:"Reel",tipo:"",resenaId:"",tema:"Paw Patrol en vivo — la reacción de los peques lo dice todo",copy:"PAW PATROL en vivo en CDMX.\nLa patrulla canina que conocen de la tele ahora en el escenario.\nSábados 16 y 23 · 11 y 1:30pm\nDomingos 17 y 24 · 11 y 1:30pm\nLa cara de los niños al ver a sus personajes favoritos en vivo no tiene precio.\nReserva en Teatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s3_12",fecha:"Sáb 18",dia:"Sábado",mes:"Abril",semana:3,pub:2,redes:["Instagram Feed", "Facebook"],pilar:"P5 – Prueba social",formato:"Post estático",tipo:"",resenaId:"",tema:"Lo más guardado esta semana — obras infantiles",copy:"Las obras infantiles más guardadas esta semana en nuestras redes:\n1 Matilda el Musical\n2 Paw Patrol\n3 Las Princesas Monsters\n4 Garfio\n5 Descubriendo a Cri Cri\nEl público ya eligió. Ahora falta tu reserva.\nTeatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s3_13",fecha:"Dom 19",dia:"Domingo",mes:"Abril",semana:3,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P2 – Planes",formato:"Carrusel",tipo:"",resenaId:"",tema:"Domingo en familia — plan completo de hoy",copy:"Domingo de plan familiar.\nHOY EN CDMX:\nGarfio · 5pm · Espacio Teatral Danzite\nLas Princesas Monsters · 1:30pm · Teatro Ismael Rdz\nEl Reino de los Desobedientes · 1:30pm · Teatro Enrique Elizalde\nGato con Botas Vaqueras · 4pm · Foro Coapa\nDescubriendo a Cri Cri · 1pm · Teatro Hidalgo\nElige y reserva.\nTeatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s3_14",fecha:"Dom 19",dia:"Domingo",mes:"Abril",semana:3,pub:2,redes:["Instagram Feed", "Facebook"],pilar:"P6 – Cultura",formato:"Post estático",tipo:"",resenaId:"",tema:"El Día del Niño se acerca — ¿ya tienes el plan?",copy:"El 30 de abril es el Día del Niño y quedan pocos días para planear.\nCDMX tiene más de 20 obras infantiles en cartelera este mes.\nMatilda · Paw Patrol · Garfio · Las Princesas Monsters · Cri Cri\nNo dejes el plan para el último momento.\nReserva esta semana en Teatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s4_01",fecha:"Lun 20",dia:"Lunes",mes:"Abril",semana:4,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"RECOMENDACION",resenaId:"",tema:"Recomendación de la semana — Las Leonas",copy:"LA RECOMENDACIÓN TEATRANDO DE ESTA SEMANA:\nLAS LEONAS\nLa comedia que CDMX no para de recomendar.\nViernes 6:30 y 8:45pm / Sábados 6 y 8:30pm / Domingos 5 y 7pm\nTeatro México\nBoletos en Teatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s4_02",fecha:"Lun 20",dia:"Lunes",mes:"Abril",semana:4,pub:2,redes:["Instagram Feed", "Facebook"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"FRASE",resenaId:"",tema:"Frase de la semana",copy:"Todo el mundo tiene una historia que contar.\nEl teatro es el arte de contarla en vivo.\n— Alejandro Jodorowsky\nGuárdala y compártela con alguien que lo necesita hoy.",cta:"Guardar y compartir",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s4_03",fecha:"Mar 21",dia:"Martes",mes:"Abril",semana:4,pub:1,redes:["Instagram Reels", "TikTok", "YouTube Shorts"],pilar:"P1 – Curaduría",formato:"Reel",tipo:"RESENA",resenaId:"r_1775523069498_7kme",tema:"Alberto y el Sueño — Reseña Teatrando",copy:"RESEÑA TEATRANDO: ALBERTO Y EL SUEÑO\nHay obras que parecen simples y resultan ser profundas.\nAlberto y el Sueño es una de ellas.\nUn mensaje sobre soñar y trabajar que los niños entienden\n— y los adultos necesitan recordar.\nViernes · Sábados · Domingos · Por Línea\nLee la reseña completa en Teatrando.com.mx",cta:"Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s4_04",fecha:"Mar 21",dia:"Martes",mes:"Abril",semana:4,pub:2,redes:["Instagram Stories"],pilar:"P2 – Planes",formato:"Story interactiva",tipo:"",resenaId:"",tema:"Plan amigos — ¿cuál es la tuya este fin?",copy:"Plan de amigos este fin de semana.\n¿Cuál es la tuya?\nA) Las Leonas — comedia con mensaje\nB) Qué Desastre de Función — puro caos divertido\nC) Mentidrags — comedia y diversidad\nD) 12 Princesas en Pugna — absurdo genial\nMándalo al grupo y organicen el plan",cta:"WhatsApp para recomendación",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s4_05",fecha:"Mié 22",dia:"Miércoles",mes:"Abril",semana:4,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P3 – Experiencia",formato:"Carrusel",tipo:"3 RAZONES",resenaId:"",tema:"3 razones para ver Las Leonas antes de que termine abril",copy:"3 RAZONES PARA VER LAS LEONAS\nRazón 1: Actuación de otro nivel — cada función es diferente y eso se siente\nRazón 2: Comedia inteligente que hace reír y pensar al mismo tiempo\nRazón 3: Viernes 6:30 y 8:45pm / Sábados 6 y 8:30pm / Domingos 5 y 7pm en Teatro México\nSi no la has visto, abril es tu última oportunidad.\nReserva en Teatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s4_06",fecha:"Mié 22",dia:"Miércoles",mes:"Abril",semana:4,pub:2,redes:["Instagram Feed", "Facebook"],pilar:"P2 – Planes",formato:"Post estático",tipo:"",resenaId:"",tema:"Plan pareja — cita de teatro este fin de semana",copy:"Plan de cita diferente este fin.\nOpciones para una noche que no se olvida:\nLa Dama de Negro · Teatro 11 de Julio\n¿Cómo te va mi amor? · Nuevo Teatro Versalles · Sáb 8pm\nLas Leonas · Teatro México\nLa Obscenidad de la Carne · Teatro Renacimiento\nElige el mood y reserva.\nTeatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s4_07",fecha:"Jue 23",dia:"Jueves",mes:"Abril",semana:4,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"31 Minutos — este sábado 25, el día más esperado",copy:"YA ES EL DÍA\n31 MINUTOS en CDMX · Sábado 25 de abril · 12:30pm\nTeatro 11 de Julio\nTulio, Bodoque y todo el elenco en vivo.\nUna experiencia que une a niños y adultos en el mismo público.\nSi tienes tu boleto — disfruta cada segundo.\nSi no — corre a Teatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s4_08",fecha:"Jue 23",dia:"Jueves",mes:"Abril",semana:4,pub:2,redes:["Instagram Stories"],pilar:"P4 – Servicio",formato:"Story interactiva",tipo:"",resenaId:"",tema:"Teatrando Responde — últimas dudas de la semana",copy:"¿Tienes alguna duda antes de reservar?\nHorarios · zonas · precio · edad recomendada\nEstamos en WhatsApp y respondemos en minutos.\nNo te quedes sin tu plan de teatro este fin.",cta:"WhatsApp para dudas",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s4_09",fecha:"Vie 24",dia:"Viernes",mes:"Abril",semana:4,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P1 – Curaduría",formato:"Carrusel",tipo:"",resenaId:"",tema:"Cartelera curada — último fin de semana completo de abril",copy:"Último fin completo de abril.\n¿Qué vas a ver antes de que se acabe el mes?\nPARA PEQUES: Matilda · Gato con Botas · Merlina · K-Pop\nPARA PAREJA: Las Leonas · Malinche · ¿Cómo te va mi amor?\nPARA AMIGOS: Qué Desastre de Función · Mentidrags · Sor-presas Amén\nELECCIÓN ESPECIAL: 31 Minutos el Sábado 25\nDesliza y elige.\nTeatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s4_10",fecha:"Vie 24",dia:"Viernes",mes:"Abril",semana:4,pub:2,redes:["Instagram Stories", "Facebook"],pilar:"P4 – Servicio",formato:"Story estática",tipo:"",resenaId:"",tema:"Últimas funciones de abril — no te las pierdas",copy:"ÚLTIMAS FUNCIONES DE ABRIL\nEstas obras terminan pronto su temporada.\nMuchas no estarán en mayo.\nNo esperes al último momento.\nReserva antes de que se agoten los lugares.\nTeatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s4_11",fecha:"Sáb 25",dia:"Sábado",mes:"Abril",semana:4,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"31 Minutos — HOY en CDMX",copy:"HOY ES EL DÍA\n31 MINUTOS en CDMX\nSábado 25 de abril · 12:30pm · Teatro 11 de Julio\nTulio, Bodoque y todo el elenco en vivo.\nPara los que crecieron con ellos — y para los que los descubren hoy.\nSi tienes boleto: disfruta al máximo.",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s4_12",fecha:"Sáb 25",dia:"Sábado",mes:"Abril",semana:4,pub:2,redes:["Instagram Feed", "Facebook"],pilar:"P5 – Prueba social",formato:"Post estático",tipo:"",resenaId:"",tema:"Lo más visto de abril — el público ha hablado",copy:"Las obras más comentadas y recomendadas de abril:\n1 Matilda el Musical\n2 Las Leonas\n3 Malinche el Musical\n4 Paw Patrol\n5 Qué Desastre de Función\n¿Coincides con la lista? ¿Cuál fue tu favorita?\nCuéntanos en los comentarios.",cta:"Guardar y compartir",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s4_13",fecha:"Dom 26",dia:"Domingo",mes:"Abril",semana:4,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P1 – Curaduría",formato:"Carrusel",tipo:"",resenaId:"",tema:"Top 3 obras de Abril — cierre de mes",copy:"CERRAMOS ABRIL con el Top 3 del mes:\nMATILDA EL MUSICAL — la producción que enamoró a toda la familia\nLAS LEONAS — la comedia que CDMX no para de recomendar\nMALINCHE EL MUSICAL — la épica del mes en Frontón México\n¿Fuiste a alguna? ¿Cuál fue tu favorita?\nCuéntanos en comentarios.",cta:"Guardar y compartir",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s4_14",fecha:"Dom 26",dia:"Domingo",mes:"Abril",semana:4,pub:2,redes:["Instagram Feed", "Facebook"],pilar:"P6 – Cultura",formato:"Post estático",tipo:"",resenaId:"",tema:"Gracias por su confianza — resumen de abril",copy:"Cerramos abril con el corazón lleno.\nGracias a todos los que eligieron Teatrando para sus planes este mes.\nFamilias · parejas · amigos · peques\nCada boleto es una experiencia que se lleva para siempre.\nNos vemos en mayo con más cartelera y más planes.",cta:"Seguir en redes",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s5_01",fecha:"Lun 27",dia:"Lunes",mes:"Abril",semana:5,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"RECOMENDACION",resenaId:"",tema:"Recomendación de cierre — Qué Desastre de Función",copy:"LA RECOMENDACIÓN TEATRANDO DE CIERRE DE ABRIL:\nQUÉ DESASTRE DE FUNCIÓN\nSi aún no la has visto — esta es tu semana.\nViernes 8pm / Sábados 5 y 8:30pm / Domingos 5:30pm\nTeatro Jorge Negrete\nBoletos en Teatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s5_02",fecha:"Lun 27",dia:"Lunes",mes:"Abril",semana:5,pub:2,redes:["Instagram Stories"],pilar:"P4 – Servicio",formato:"Story interactiva",tipo:"",resenaId:"",tema:"Plan express entre semana — últimos días de abril",copy:"Quedan solo 4 días de abril.\nAún puedes ir al teatro esta semana.\nDinos tu zona y horario disponible y te mandamos opciones express.\nNada de filas · nada de complicaciones.\nWhatsApp — en minutos te respondemos.",cta:"WhatsApp por zona y horario",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s5_03",fecha:"Mar 28",dia:"Martes",mes:"Abril",semana:5,pub:1,redes:["Instagram Reels", "TikTok", "YouTube Shorts"],pilar:"P1 – Curaduría",formato:"Reel",tipo:"RESENA",resenaId:"r_dama_negro_s5",tema:"La Dama de Negro — Reseña Teatrando",copy:"RESEÑA TEATRANDO: LA DAMA DE NEGRO\nEl terror en el teatro tiene una dimensión que el cine no puede replicar.\nNo hay pantalla que te separe de lo que está pasando.\nLa Dama de Negro lo sabe — y lo usa perfectamente.\nViernes 8:30pm / Sábados 6 y 8:30pm / Domingos 6pm\nTeatro 11 de Julio\nLee la reseña completa en Teatrando.com.mx",cta:"Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s5_04",fecha:"Mar 28",dia:"Martes",mes:"Abril",semana:5,pub:2,redes:["Instagram Stories", "Facebook"],pilar:"P4 – Servicio",formato:"Story estática",tipo:"",resenaId:"",tema:"Teatrando Responde — últimas preguntas de abril",copy:"Última semana de abril y ¿aún tienes dudas sobre alguna obra?\nEstamos aquí para ayudarte.\nHorarios · zonas · disponibilidad · precio\nWhatsApp — respondemos en minutos.\nNo te quedes sin tu plan de teatro.",cta:"WhatsApp para dudas",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s5_05",fecha:"Mié 29",dia:"Miércoles",mes:"Abril",semana:5,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P1 – Curaduría",formato:"Carrusel",tipo:"",resenaId:"",tema:"Adelanto Mayo — obras que vienen el próximo mes",copy:"MAYO EN TEATRANDO\nYa confirmamos algunas de las obras que vienen en mayo:\n1 One Vision of Queen — 14 mayo · Pepsi Center WTC\n2 El Hombre en el Baúl — Danzite · Sábados y Domingos\n3 Siempre los Hombres las Prefieren Cabronas — Danzite\n4 Velocidad del Otoño — Foro Silvia Pinal\n5 Comedy Factory — Terraza Cozumel\nSíguenos para la cartelera completa de mayo.",cta:"Seguir en redes",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s5_06",fecha:"Mié 29",dia:"Miércoles",mes:"Abril",semana:5,pub:2,redes:["Instagram Feed", "Facebook"],pilar:"P5 – Prueba social",formato:"Post estático",tipo:"FRASE",resenaId:"",tema:"Frase de cierre de mes",copy:"El público es el último autor de toda obra de teatro.\n— Bertolt Brecht\nAbril cerró. Mayo viene con más historias.\nGracias por elegirnos.",cta:"Seguir en redes",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s5_07",fecha:"Jue 30",dia:"Jueves",mes:"Abril",semana:5,pub:1,redes:["Instagram Feed", "Facebook", "X"],pilar:"P2 – Planes",formato:"Carrusel",tipo:"",resenaId:"",tema:"FELIZ DÍA DEL NIÑO — 30 de abril celebra con teatro",copy:"FELIZ DÍA DEL NIÑO\nHoy 30 de abril es su día — y CDMX tiene el mejor plan para celebrarlo.\nLleva a tu peque al teatro hoy:\nMatilda el Musical · Centro Cultural Teatro 1\nGarfio · Espacio Teatral Danzite\nLas Princesas Monsters · Teatro Ismael Rdz\nDescubriendo a Cri Cri · Teatro Hidalgo\nGato con Botas Vaqueras · Foro Coapa\nReserva en Teatrando.com.mx",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},
  {id:"abr_s5_08",fecha:"Jue 30",dia:"Jueves",mes:"Abril",semana:5,pub:2,redes:["Instagram Feed", "Facebook"],pilar:"P6 – Cultura",formato:"Post estático",tipo:"",resenaId:"",tema:"Día del Niño y cierre de abril — gracias por un mes increíble",copy:"Hoy celebramos a los niños y cerramos un abril lleno de teatro en CDMX.\nGracias a todas las familias que eligieron Teatrando para celebrar con sus peques.\nGracias a las parejas, amigos y amantes del teatro que nos acompañaron este mes.\nAbril cerró. Mayo abre — y ya viene con todo.\nNos vemos el mes que entra.",cta:"Seguir en redes",estado:"Pendiente",notas:"",disenho:""}
];

// ─── STORAGE PERSISTENTE ──────────────────────────────────────────────────────
const STORAGE_KEY = "teatrando_parrilla_v18";
const POLL_INTERVAL = 4000; // refresco cliente cada 4 segundos

async function saveData(data) {
  try {
    await window.storage.set(STORAGE_KEY, JSON.stringify(data), true); // shared=true
  } catch(e) { console.warn("storage save error", e); }
}

async function loadData() {
  try {
    const res = await window.storage.get(STORAGE_KEY, true);
    if (res && res.value) return JSON.parse(res.value);
  } catch(e) { console.warn("storage load error", e); }
  return null;
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function TeatrandoApp(){
  // AUTH
  const [modoCliente,setModoCliente]=useState(true);
  const [passInput,setPassInput]=useState("");
  const [passError,setPassError]=useState(false);
  const [showAdminLogin,setShowAdminLogin]=useState(false);

  // DATA
  const [mesesDisp,setMesesDisp]=useState(["Abril"]);
  const [visitas,setVisitas]=useState([]);
  const [mesActivo,setMesActivo]=useState("Abril");
  const [mesExp,setMesExp]=useState("Abril");
  const [semanaActiva,setSemanaActiva]=useState(1);
  const [parrillas,setParrillas]=useState({"Abril":buildAbril()});
  const [resenas,setResenas]=useState({"Abril":buildResenas()});
  const [briefings,setBriefings]=useState(BRIEFINGS_INIT);
  const [editandoBriefing,setEditandoBriefing]=useState(false);

  // UI ADMIN
  const [vista,setVista]=useState("parrilla"); // parrilla | resenas | historial
  const [cardAbierta,setCardAbierta]=useState(null);
  const [filtros,setFiltros]=useState({pilar:"Todos",formato:"Todos",red:"Todas"});
  const [modalAgregarDia,setModalAgregarDia]=useState(false);
  const [nuevoDiaForm,setNuevoDiaForm]=useState({fecha:"",dia:"Lunes",semana:1,numPubs:2});
  const [notifMsg,setNotifMsg]=useState("");

  // UI CLIENTE
  const [vistaCliente,setVistaCliente]=useState("parrilla"); // parrilla | resenas | bitacora

  // SYNC
  const [syncStatus,setSyncStatus]=useState("idle"); // idle | saving | saved | error
  const [dataLoaded,setDataLoaded]=useState(false);
  const [lastRefresh,setLastRefresh]=useState(null);
  const isMounted=useRef(true);

  const parrilla=parrillas[mesActivo]||[];
  const resenasMes=resenas[mesActivo]||[];
  const briefingMes=briefings[mesActivo]||"";
  const semanasDelMes=mesActivo?[...new Set(parrilla.map(p=>p.semana))].sort((a,b)=>a-b):[];

  const notif=(msg)=>{setNotifMsg(msg);setTimeout(()=>setNotifMsg(""),2800);};

  // ── CARGA INICIAL desde storage ──
  useEffect(()=>{
    isMounted.current=true;
    (async()=>{
      const saved=await loadData();
      if(saved && isMounted.current){
        if(saved.parrillas) setParrillas(saved.parrillas);
        if(saved.resenas)   setResenas(saved.resenas);
        if(saved.briefings) setBriefings(saved.briefings);
        if(saved.mesesDisp) setMesesDisp(saved.mesesDisp);
          if(saved.visitas) setVisitas(saved.visitas);
      }
      if(isMounted.current) setDataLoaded(true);
    })();
    return()=>{ isMounted.current=false; };
  },[]);

  // ── GUARDADO AUTOMÁTICO cuando cambian los datos (solo admin) ──
  useEffect(()=>{
    if(!dataLoaded) return; // no guardar antes de cargar
    setSyncStatus("saving");
    const t=setTimeout(async()=>{
      try{
        await saveData({parrillas,resenas,briefings,mesesDisp,visitas});
        if(isMounted.current) setSyncStatus("saved");
        setTimeout(()=>{ if(isMounted.current) setSyncStatus("idle"); },2000);
      }catch(e){
        if(isMounted.current) setSyncStatus("error");
      }
    },800); // debounce 800ms
    return()=>clearTimeout(t);
  },[parrillas,resenas,briefings,mesesDisp,visitas,dataLoaded]);

  // ── POLLING: refresca datos desde storage cada 4s (siempre activo) ──
  // El cliente ve los cambios del admin en tiempo real
  useEffect(()=>{
    const interval=setInterval(async()=>{
      // No refrescar si admin está guardando — evita sobreescribir cambios locales
      if(!modoCliente && syncStatus==="saving") return;
      const saved=await loadData();
      if(saved && isMounted.current){
        if(saved.parrillas) setParrillas(saved.parrillas);
        if(saved.resenas)   setResenas(saved.resenas);
        if(saved.briefings) setBriefings(saved.briefings);
        if(saved.mesesDisp) setMesesDisp(saved.mesesDisp);
        if(saved.visitas)   setVisitas(saved.visitas);
        setLastRefresh(new Date().toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit",second:"2-digit"}));
      }
    },POLL_INTERVAL);
    return()=>clearInterval(interval);
  },[modoCliente,syncStatus]);

  // MIX — calcula solo sobre publicaciones (excluye reseñas programadas como pubs separadas)
  const mix=useCallback(()=>{
    const t=parrilla.length||1;
    const p123=parrilla.filter(p=>["P1 – Curaduría","P2 – Planes","P3 – Experiencia"].includes(p.pilar)).length;
    const p4=parrilla.filter(p=>p.pilar==="P4 – Servicio").length;
    const p56=parrilla.filter(p=>["P5 – Prueba social","P6 – Cultura"].includes(p.pilar)).length;
    return{p123:Math.round(p123/t*100),p4:Math.round(p4/t*100),p56:Math.round(p56/t*100)};
  },[parrilla])();

  const contadorRedes=useCallback(()=>{
    const c={};REDES.forEach(r=>c[r]=0);
    parrilla.forEach(p=>(p.redes||[]).forEach(r=>{if(c[r]!==undefined)c[r]++;}));
    return c;
  },[parrilla])();

  const alertasSemanas=useCallback(()=>{
    const a=[];
    semanasDelMes.forEach(s=>{const cnt=parrilla.filter(p=>p.semana===s).length;if(cnt<4)a.push({semana:s,cnt});});
    return a;
  },[parrilla,semanasDelMes]);

  const editarCampo=(id,campo,valor)=>{
    const item=parrilla.find(p=>p.id===id);if(!item)return;
    setParrillas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(p=>p.id===id?{...p,[campo]:valor}:p)}));
  };

  const toggleRed=(id,red)=>{
    const item=parrilla.find(p=>p.id===id);if(!item)return;
    const nv=item.redes.includes(red)?item.redes.filter(r=>r!==red):[...item.redes,red];
    setParrillas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(p=>p.id===id?{...p,redes:nv}:p)}));
  };


  const handleAgregarDia=()=>{
    if(!nuevoDiaForm.fecha){notif("⚠️ Escribe una fecha");return;}
    const pubs=[];
    for(let i=1;i<=nuevoDiaForm.numPubs;i++){
      pubs.push(buildPub({fecha:nuevoDiaForm.fecha,dia:nuevoDiaForm.dia,mes:mesActivo,semana:parseInt(nuevoDiaForm.semana),pub:i}));
    }
    setParrillas(prev=>{
      const merged=[...prev[mesActivo],...pubs];
      // Ordenar por semana primero, luego por fecha lexicográfica dentro de cada semana
      merged.sort((a,b)=>{
        if(a.semana!==b.semana) return a.semana-b.semana;
        // Comparar fecha como string (ej: "Lun 3", "Mar 4") usando número extraído
        const numA=parseInt((a.fecha||"").replace(/\D/g,"")||"0");
        const numB=parseInt((b.fecha||"").replace(/\D/g,"")||"0");
        if(numA!==numB) return numA-numB;
        return (a.fecha||"").localeCompare(b.fecha||"");
      });
      return {...prev,[mesActivo]:merged};
    });
    setModalAgregarDia(false);setNuevoDiaForm({fecha:"",dia:"Lunes",semana:1,numPubs:2});
    notif(`✅ Día "${nuevoDiaForm.fecha}" agregado`);
  };

  const handleAgregarSemana=()=>{
    const ns=Math.max(...semanasDelMes,0)+1;
    const pub=buildPub({mes:mesActivo,semana:ns,fecha:`Lun ${ns*7}`,dia:"Lunes",pub:1});
    setParrillas(prev=>({...prev,[mesActivo]:[...prev[mesActivo],pub]}));
    setSemanaActiva(ns);notif(`✅ Semana ${ns} agregada`);
  };

  const handleEliminarPub=(id)=>{
    setParrillas(prev=>({...prev,[mesActivo]:prev[mesActivo].filter(p=>p.id!==id)}));
    setCardAbierta(null);notif("🗑️ Publicación eliminada");
  };


  const handleAgregarResena=()=>{
    const nr=buildResena({semana:semanaActiva,obra:"Obra nueva",genero:"Teatro"});
    setResenas(prev=>({...prev,[mesActivo]:[...prev[mesActivo],nr]}));notif("✅ Reseña agregada");
  };

  // Filtrado parrilla
  const filtradas=parrilla.filter(p=>{
    if(p.semana!==semanaActiva)return false;
    if(filtros.pilar!=="Todos"&&p.pilar!==filtros.pilar)return false;
    if(filtros.formato!=="Todos"&&!p.formato.toLowerCase().includes(filtros.formato.toLowerCase().replace(" estático","").replace(" interactiva","")))return false;
    if(filtros.red!=="Todas"&&!(p.redes||[]).includes(filtros.red))return false;
    return true;
  });
  const byDate={};
  filtradas.forEach(p=>{if(!byDate[p.fecha])byDate[p.fecha]=[];byDate[p.fecha].push(p);});

  const sc=e=>ESTADO_CFG[e]||ESTADO_CFG["Pendiente"];

  // ── ESTILOS ──
  const inputStyle={width:"100%",background:"#0a0a0a",color:"#fff",border:"1px solid #1e1e1e",borderRadius:6,padding:"6px 9px",fontSize:11,boxSizing:"border-box",fontFamily:"inherit"};
  const selectStyle={...inputStyle};
  const BTN=({active,onClick,children,style={},danger=false,small=false,disabled=false})=>(
    <button onClick={onClick} disabled={disabled} style={{padding:small?"4px 10px":"6px 16px",borderRadius:20,border:danger?"1.5px solid #7f1d1d":(active?"2px solid #C40803":"1.5px solid #252525"),background:danger?"#2d0000":(active?"#C40803":"#111"),color:danger?"#ff6b6b":"#fff",fontWeight:700,cursor:disabled?"not-allowed":"pointer",fontSize:small?10:11,opacity:disabled?0.5:1,transition:"all 0.15s",...style}}>{children}</button>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // CARGA INICIAL
  if(!dataLoaded){
    return(
      <div style={{fontFamily:"Segoe UI,system-ui,sans-serif",background:"#0a0a0a",minHeight:"100vh",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
        <div style={{fontSize:14,fontWeight:900,color:"#fff",letterSpacing:3,textTransform:"uppercase"}}>TEATRANDO</div>
        <div style={{fontSize:12,color:"#666",letterSpacing:2,textTransform:"uppercase"}}>Cargando parrilla...</div>
        <div style={{width:120,height:3,background:"#1a1a1a",borderRadius:3,overflow:"hidden"}}>
          <div style={{width:"60%",height:"100%",background:"#C40803",borderRadius:3,animation:"slideIn 1.2s ease-in-out infinite"}}/>
        </div>
      </div>
    );
  }

  // VISTA CLIENTE — pantalla de login
  // ══════════════════════════════════════════════════════════════════════════
  if(showAdminLogin){
    return(
      <div style={{fontFamily:"Segoe UI,system-ui,sans-serif",background:"#0a0a0a",minHeight:"100vh",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{background:"#111",border:"1px solid #C40803",borderRadius:16,padding:36,width:340,maxWidth:"90vw",textAlign:"center"}}>
          <div style={{fontSize:32,marginBottom:6}}>🎭</div>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.4)",letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>Área de Administración</div>
          <div style={{fontSize:24,fontWeight:900,color:"#C40803",marginBottom:20}}>TEATRANDO</div>
          <div style={{fontSize:11,color:"#555",marginBottom:16}}>Acceso restringido — solo personal autorizado</div>
          <input
            type="password" value={passInput}
            onChange={e=>{setPassInput(e.target.value);setPassError(false);}}
            onKeyDown={e=>{if(e.key==="Enter"){if(passInput===ADMIN_PASS){setModoCliente(false);setShowAdminLogin(false);setPassInput("");}else setPassError(true);}}}
            placeholder="Contraseña..."
            style={{...inputStyle,marginBottom:8,textAlign:"center",fontSize:14,letterSpacing:4}}
            autoFocus
          />
          {passError&&<div style={{fontSize:10,color:"#C40803",marginBottom:8}}>Contraseña incorrecta. Intenta de nuevo.</div>}
          <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:8}}>
            <BTN onClick={()=>{if(passInput===ADMIN_PASS){setModoCliente(false);setShowAdminLogin(false);setPassInput("");}else setPassError(true);}}>Entrar</BTN>
            <BTN onClick={()=>{setShowAdminLogin(false);setPassInput("");setPassError(false);}} danger small>Cancelar</BTN>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // VISTA CLIENTE — contenido
  // ══════════════════════════════════════════════════════════════════════════
  if(modoCliente){
    // datos del mes activo para cliente
    const parrillaCliente=parrillas[mesActivo]||[];
    const semanasCliente=[...new Set(parrillaCliente.map(p=>p.semana))].sort((a,b)=>a-b);
    const byDateCliente={};
    parrillaCliente.filter(p=>p.semana===semanaActiva).forEach(p=>{if(!byDateCliente[p.fecha])byDateCliente[p.fecha]=[];byDateCliente[p.fecha].push(p);});
    const todasLasFechas=[...new Set(parrillaCliente.map(p=>p.fecha))];
    const resenasCliente=resenas[mesActivo]||[];

    return(
      <div style={{fontFamily:"Segoe UI,system-ui,sans-serif",background:"#0a0a0a",minHeight:"100vh",color:"#fff"}}>
        {/* HEADER CLIENTE */}
        <div style={{background:"#0a0a0a",padding:"12px 20px",borderBottom:"1px solid #1a1a1a"}}>
          <div style={{maxWidth:900,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,marginBottom:12}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:2}}>
                <div style={{fontSize:8,color:"rgba(255,255,255,0.5)",letterSpacing:3,textTransform:"uppercase",fontWeight:600}}>Propuesta de Contenido 2026</div>
                <div style={{fontSize:26,fontWeight:900,color:"#C40803",letterSpacing:-1,textShadow:"0 0 20px rgba(196,8,3,0.8)",lineHeight:1}}>Teatrando</div>
              </div>
              <BTN onClick={()=>setShowAdminLogin(true)} small style={{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.2)"}}>🔐 Admin</BTN>
            </div>
            {/* Indicador sincronización */}
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,flexWrap:"wrap"}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",display:"inline-block",boxShadow:"0 0 6px #22c55e",flexShrink:0}}/>
              <span style={{fontSize:8,color:"rgba(255,255,255,0.5)",letterSpacing:1}}>EN VIVO · refresca cada 4 seg</span>
              {lastRefresh&&<span style={{fontSize:8,color:"rgba(255,255,255,0.3)"}}>· último refresco: {lastRefresh}</span>}
            </div>
            {/* Tabs */}
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <BTN active={vistaCliente==="parrilla"} onClick={()=>setVistaCliente("parrilla")} small>📋 Parrilla</BTN>
              <BTN active={vistaCliente==="resenas"} onClick={()=>setVistaCliente("resenas")} small>📖 Reseñas</BTN>
              <BTN active={vistaCliente==="bitacora"} onClick={()=>setVistaCliente("bitacora")} small>📒 Bitácora</BTN>
              <BTN active={vistaCliente==="visitas"} onClick={()=>setVistaCliente("visitas")} small>🎭 Obras a visitar</BTN>
            </div>
          </div>
        </div>

        <div style={{maxWidth:900,margin:"0 auto",padding:"16px 14px"}}>

          {/* ── SELECTOR DE MES (igual que admin) ── */}
          <div style={{marginBottom:14,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
            {mesesDisp.map(mes=>(
              <div key={mes} style={{position:"relative"}}>
                <button onClick={()=>{setMesActivo(mes);setMesExp(mes===mesExp?null:mes);setSemanaActiva(1);}}
                  style={{padding:"5px 14px",borderRadius:18,display:"flex",alignItems:"center",gap:5,border:mesActivo===mes?"2px solid #C40803":"1.5px solid #222",background:mesActivo===mes?"#C40803":"#111",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:11}}>
                  {mes} <span style={{fontSize:9,opacity:0.7}}>{mesExp===mes?"▲":"▼"}</span>
                </button>
                {mesExp===mes&&(
                  <div style={{position:"absolute",top:"110%",left:0,background:"#111",border:"1px solid #C40803",borderRadius:10,padding:8,zIndex:200,minWidth:160,boxShadow:"0 8px 30px rgba(0,0,0,0.9)"}}>
                    <div style={{fontSize:8,color:"#444",textTransform:"uppercase",letterSpacing:1,marginBottom:5,fontWeight:700,paddingLeft:3}}>Semanas</div>
                    {[...new Set((parrillas[mes]||[]).map(p=>p.semana))].sort((a,b)=>a-b).map(s=>(
                      <button key={s} onClick={()=>{setSemanaActiva(s);setMesActivo(mes);setMesExp(null);}}
                        style={{display:"block",width:"100%",textAlign:"left",padding:"5px 8px",borderRadius:6,marginBottom:2,background:mesActivo===mes&&semanaActiva===s?"#C40803":"transparent",border:"none",color:"#fff",cursor:"pointer",fontSize:11,fontWeight:600}}>
                        Semana {s} <span style={{fontSize:9,opacity:0.5,marginLeft:4}}>({(parrillas[mes]||[]).filter(p=>p.semana===s).length} pubs)</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Briefing del mes */}
          {briefings[mesActivo]&&(
            <div style={{background:"#111",border:"1px solid #C40803",borderRadius:10,padding:"12px 16px",marginBottom:16}}>
              <div style={{fontSize:9,color:"#C40803",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>📋 Línea editorial — {mesActivo}</div>
              <pre style={{fontSize:11,color:"#ccc",lineHeight:1.7,whiteSpace:"pre-wrap",fontFamily:"inherit",margin:0}}>{briefings[mesActivo]}</pre>
            </div>
          )}

          {/* ── PARRILLA CLIENTE ── */}
          {vistaCliente==="parrilla"&&(
            <>
              <div style={{fontSize:10,color:"#444",marginBottom:12}}>
                {parrillaCliente.filter(p=>p.semana===semanaActiva).length} publicaciones planificadas
                · <span style={{color:"#22c55e"}}>{parrillaCliente.filter(p=>p.semana===semanaActiva&&p.estado==="Publicado").length} publicadas</span>
                · <span style={{color:"#3b82f6"}}>{parrillaCliente.filter(p=>p.semana===semanaActiva&&p.estado==="En producción").length} en producción</span>
              </div>
              {Object.entries(byDateCliente).map(([fecha,pubs])=>(
                <div key={fecha} style={{marginBottom:16}}>
                  <div style={{fontSize:10,color:"#C40803",fontWeight:700,marginBottom:8,display:"flex",alignItems:"center",gap:8}}>
                    <span style={{background:"#C40803",color:"#fff",padding:"2px 12px",borderRadius:5}}>{fecha}</span>
                    <div style={{flex:1,height:1,background:"#1a1a1a"}}/>
                  </div>
                  {pubs.map(p=>{
                    const ec=sc(p.estado);
                    return(
                      <div key={p.id} style={{background:p.disenho==="para_disenar"?"#0d0000":p.disenho==="disenho_realizado"?"#001a0a":"#0d0d0d",border:p.disenho==="para_disenar"?"2px solid #C40803":p.disenho==="disenho_realizado"?"2px solid #059669":"1px solid #161616",borderLeft:`3px solid ${PILAR_COLOR[p.pilar]||"#333"}`,borderRadius:8,padding:"12px 14px",marginBottom:8}}>
                        {p.disenho==="para_disenar"&&(
                          <div style={{background:"#C40803",color:"#fff",fontSize:9,fontWeight:900,padding:"4px 12px",borderRadius:4,marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between",letterSpacing:1}}>
                            <span>🎨 Para diseñar</span>
                            <button onClick={()=>editarCampo(p.id,"disenho","disenho_realizado")} style={{background:"#fff",color:"#C40803",border:"none",borderRadius:4,padding:"2px 10px",fontSize:8,fontWeight:900,cursor:"pointer"}}>✓ Marcar como realizado</button>
                          </div>
                        )}
                        {p.disenho==="disenho_realizado"&&(
                          <div style={{background:"#059669",color:"#fff",fontSize:9,fontWeight:900,padding:"4px 12px",borderRadius:4,marginBottom:8,display:"flex",alignItems:"center",gap:6,letterSpacing:1}}>
                            <span>✓ Diseño realizado</span>
                          </div>
                        )}
                        <div style={{display:"flex",gap:5,marginBottom:6,flexWrap:"wrap",alignItems:"center"}}>
                          <span style={{fontSize:8,color:"#fff",background:PILAR_COLOR[p.pilar]||"#333",padding:"2px 8px",borderRadius:6,fontWeight:700}}>{p.pilar}</span>
                          <span style={{fontSize:8,color:"#666"}}>{p.formato}</span>
                          <span style={{marginLeft:"auto",fontSize:10,color:ec.color,background:ec.bg,padding:"3px 12px",borderRadius:20,border:`1.5px solid ${ec.color}`,fontWeight:900,letterSpacing:0.5}}>{p.estado}</span>
                        </div>
                        {p.tipo&&<div style={{display:"inline-flex",alignItems:"center",background:TIPO_COLOR[p.tipo]||"#555",color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:8,fontWeight:900,letterSpacing:1,marginBottom:5,textTransform:"uppercase"}}>{p.tipo==="RESENA"?"RESEÑA":p.tipo==="RECOMENDACION"?"RECOMEND.":p.tipo}</div>}
                        <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:8}}>{p.tema}</div>
                        <pre style={{fontSize:11,color:"#bbb",lineHeight:1.7,whiteSpace:"pre-wrap",fontFamily:"inherit",margin:"0 0 10px"}}>{p.copy}</pre>
                        <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>
                          {(p.redes||[]).map(r=><span key={r} style={{fontSize:9,color:RED_COLOR[r]||"#aaa",background:"#1a1a1a",padding:"2px 7px",borderRadius:6}}>{RED_ICON[r]} {r}</span>)}
                          {p.cta&&p.cta!=="—"&&<span style={{fontSize:9,color:"#888",background:"#0a0a0a",padding:"2px 9px",borderRadius:6,border:"1px solid #1a1a1a",marginLeft:"auto"}}>→ {p.cta}</span>}
                        </div>
                        {p.linkDiseno&&<a href={p.linkDiseno} target="_blank" rel="noreferrer" style={{fontSize:9,color:"#3b82f6",marginTop:6,display:"block"}}>🎨 Ver diseño</a>}
                        {p.notas&&<div style={{fontSize:9,color:"#444",marginTop:4,fontStyle:"italic"}}>📌 {p.notas}</div>}
                      </div>
                    );
                  })}
                  {Object.keys(byDateCliente).length===0&&(
                    <div style={{textAlign:"center",padding:32,color:"#333",fontSize:12,border:"1px dashed #1a1a1a",borderRadius:10}}>🎭 Sin publicaciones en esta semana.</div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* ── CALENDARIO CLIENTE ── */}
          {vistaCliente==="resenas"&&(
            <div>
              <div style={{fontSize:11,color:"#555",marginBottom:16}}>
                {resenasCliente.length} reseñas planificadas para {mesActivo} · <span style={{color:"#C40803"}}>⭐ = también se publica en redes sociales</span>
              </div>
              {[1,2,3,4].map(s=>{
                const rs=resenasCliente.filter(r=>r.semana===s);
                if(rs.length===0)return null;
                const rsRedes=rs.filter(r=>r.redSocial);
                const rsSoloWeb=rs.filter(r=>!r.redSocial);
                return(
                  <div key={s} style={{marginBottom:28}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                      <span style={{fontSize:9,color:"#fff",background:"#C40803",fontWeight:700,textTransform:"uppercase",letterSpacing:2,padding:"3px 12px",borderRadius:6}}>Semana {s}</span>
                      <div style={{flex:1,height:1,background:"#1a1a1a"}}/>
                      <span style={{fontSize:9,color:"#C40803",fontWeight:700}}>⭐ {rsRedes.length} a redes</span>
                      <span style={{fontSize:9,color:"#444"}}>+ {rsSoloWeb.length} solo web</span>
                    </div>

                    {/* Reseñas a redes */}
                    {rsRedes.length>0&&(
                      <div style={{marginBottom:12}}>
                        <div style={{fontSize:8,color:"#C40803",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
                          <span style={{background:"#C40803",color:"#fff",padding:"1px 8px",borderRadius:4}}>⭐ Se publican en redes sociales</span>
                        </div>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:8}}>
                          {rsRedes.map(r=>{
                            const ec=sc(r.estado);
                            return(
                              <div key={r.id} style={{background:"#120000",border:"1.5px solid #C40803",borderRadius:10,padding:"12px 14px"}}>
                                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                                  <span style={{fontSize:8,color:"#C40803",fontWeight:700,background:"#2a0000",padding:"1px 7px",borderRadius:5}}>⭐ Web + Redes</span>
                                  <span style={{fontSize:8,color:ec.color,background:ec.bg,padding:"1px 7px",borderRadius:5,border:`1px solid ${ec.color}40`,fontWeight:700}}>{r.estado}</span>
                                </div>
                                <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:4}}>{r.obra}</div>
                                {r.titulo&&<div style={{fontSize:10,color:"#999",fontStyle:"italic",marginBottom:6}}>"{r.titulo}"</div>}
                                {r.resena&&<div style={{fontSize:10,color:"#777",lineHeight:1.6}}>{r.resena.substring(0,120)}{r.resena.length>120?"…":""}</div>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Reseñas solo web */}
                    {rsSoloWeb.length>0&&(
                      <div>
                        <div style={{fontSize:8,color:"#444",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Solo web (teatrando.com.mx)</div>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:6}}>
                          {rsSoloWeb.map(r=>{
                            const ec=sc(r.estado);
                            return(
                              <div key={r.id} style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:8,padding:"10px 12px"}}>
                                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                                  <span style={{fontSize:8,color:"#444",fontWeight:700}}>📄 Solo web</span>
                                  <span style={{fontSize:8,color:ec.color,background:ec.bg,padding:"1px 6px",borderRadius:5,border:`1px solid ${ec.color}40`,fontWeight:700}}>{r.estado}</span>
                                </div>
                                <div style={{fontSize:12,fontWeight:700,color:"#ddd",marginBottom:3}}>{r.obra}</div>
                                {r.titulo&&<div style={{fontSize:9,color:"#666",fontStyle:"italic"}}>{r.titulo}</div>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {resenasCliente.length===0&&(
                <div style={{textAlign:"center",padding:40,color:"#333",fontSize:12,border:"1px dashed #1a1a1a",borderRadius:10}}>📖 No hay reseñas cargadas para {mesActivo}.</div>
              )}
            </div>
          )}

          {/* ── BITÁCORA CLIENTE ── */}
          {vistaCliente==="visitas"&&(
            <div style={{padding:"4px 0"}}>
              <div style={{fontSize:11,fontWeight:700,color:"#fff",marginBottom:16,letterSpacing:1}}>OBRAS A VISITAR — ABRIL 2026</div>
              {visitas.filter(v=>v.mes===mesActivo).length===0
                ?<div style={{textAlign:"center",padding:40,color:"#333",fontSize:11,border:"1px dashed #1a1a1a",borderRadius:10}}>Aún no hay obras registradas para este mes.</div>
                :<div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {visitas.filter(v=>v.mes===mesActivo).sort((a,b)=>a.dia-b.dia).map(v=>(
                    <div key={v.id} style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:10,padding:"12px 16px",display:"flex",gap:14,alignItems:"flex-start"}}>
                      <div style={{minWidth:40,textAlign:"center",background:"#C40803",borderRadius:8,padding:"6px 4px"}}>
                        <div style={{fontSize:18,fontWeight:900,color:"#fff",lineHeight:1}}>{v.dia}</div>
                        <div style={{fontSize:7,color:"rgba(255,255,255,0.8)",textTransform:"uppercase",letterSpacing:1}}>abr</div>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:3}}>{v.obra}</div>
                        <div style={{fontSize:10,color:"#C40803",fontWeight:600,marginBottom:2}}>{v.teatro}</div>
                        <div style={{fontSize:10,color:"#555"}}>{v.hora}</div>
                        {v.notas&&<div style={{fontSize:9,color:"#444",marginTop:6,fontStyle:"italic"}}>{v.notas}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              }
            </div>
          )}

          {vistaCliente==="bitacora"&&(
            <div>
              {/* Tabs de meses */}
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:24}}>
                {mesesDisp.map(m=>(
                  <button key={m} onClick={()=>setMesActivo(m)}
                    style={{padding:"5px 16px",borderRadius:20,fontWeight:700,fontSize:11,cursor:"pointer",
                      background:mesActivo===m?"#C40803":"#0d0d0d",
                      color:mesActivo===m?"#fff":"#555",
                      border:mesActivo===m?"2px solid #C40803":"1.5px solid #1a1a1a",
                      transition:"all 0.15s"}}>
                    {m}
                  </button>
                ))}
              </div>

              {(()=>{
                const pubsMes=parrillas[mesActivo]||[];
                const semanasMes=[...new Set(pubsMes.map(p=>p.semana))].sort((a,b)=>a-b);
                const conMovimiento=pubsMes.some(p=>p.estado==="Publicado"||p.estado==="En producción");
                if(!conMovimiento) return(
                  <div style={{textAlign:"center",padding:40,color:"#333",fontSize:12,border:"1px dashed #1a1a1a",borderRadius:10}}>
                    📒 Aún no hay publicaciones registradas para {mesActivo}.
                  </div>
                );
                return(
                  <div>
                    {semanasMes.map(s=>{
                      const pubsSemana=pubsMes.filter(p=>p.semana===s);
                      const publicadas=pubsSemana.filter(p=>p.estado==="Publicado");
                      const enProd=pubsSemana.filter(p=>p.estado==="En producción");
                      if(publicadas.length===0&&enProd.length===0) return null;
                      return(
                        <div key={s} style={{marginBottom:28}}>
                          {/* Header semana — sin contadores */}
                          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                            <div style={{background:"#C40803",color:"#fff",fontWeight:900,fontSize:10,
                              padding:"4px 14px",borderRadius:6,letterSpacing:1,textTransform:"uppercase"}}>
                              Semana {s}
                            </div>
                            <div style={{flex:1,height:1,background:"#1a1a1a"}}/>
                          </div>

                          {/* Publicadas — solo día + tema */}
                          {publicadas.length>0&&(
                            <div style={{marginBottom:10}}>
                              <div style={{fontSize:8,color:"#22c55e",fontWeight:700,textTransform:"uppercase",
                                letterSpacing:1,marginBottom:8,paddingLeft:4}}>✅ Publicado</div>
                              <div style={{borderLeft:"2px solid #22c55e40",paddingLeft:12,display:"flex",flexDirection:"column",gap:6}}>
                                {publicadas.map(p=>(
                                  <div key={p.id} style={{display:"flex",alignItems:"baseline",gap:10}}>
                                    <span style={{fontSize:9,color:"#555",flexShrink:0,minWidth:44}}>{p.fecha}</span>
                                    <span style={{fontSize:12,color:"#ddd",fontWeight:500}}>{p.tema}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* En producción — solo día + tema */}
                          {enProd.length>0&&(
                            <div>
                              <div style={{fontSize:8,color:"#3b82f6",fontWeight:700,textTransform:"uppercase",
                                letterSpacing:1,marginBottom:8,paddingLeft:4}}>🔵 En producción</div>
                              <div style={{borderLeft:"2px solid #3b82f640",paddingLeft:12,display:"flex",flexDirection:"column",gap:6}}>
                                {enProd.map(p=>(
                                  <div key={p.id} style={{display:"flex",alignItems:"baseline",gap:10}}>
                                    <span style={{fontSize:9,color:"#555",flexShrink:0,minWidth:44}}>{p.fecha}</span>
                                    <span style={{fontSize:12,color:"#888",fontWeight:500}}>{p.tema}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}

          <div style={{textAlign:"center",marginTop:40,fontSize:9,color:"#1a1a1a",paddingBottom:20}}>Teatrando CDMX · @teatrandocdmx · teatrando.com.mx</div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // VISTA ADMIN
  // ══════════════════════════════════════════════════════════════════════════
  return(
    <div style={{fontFamily:"Segoe UI,system-ui,sans-serif",background:"#060606",minHeight:"100vh",color:"#fff",paddingBottom:60}}>

      {/* Notificación flotante */}
      {notifMsg&&<div style={{position:"fixed",top:16,right:16,background:"#C40803",color:"#fff",padding:"8px 18px",borderRadius:20,fontSize:11,fontWeight:700,zIndex:9999,boxShadow:"0 4px 16px rgba(196,8,3,0.5)"}}>{notifMsg}</div>}

      {/* Modal agregar día */}
      {modalAgregarDia&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
          <div style={{background:"#111",border:"1px solid #C40803",borderRadius:12,padding:24,width:340,maxWidth:"90vw"}}>
            <div style={{fontSize:14,fontWeight:700,marginBottom:14}}>➕ Agregar día — {mesActivo}</div>
            {[{l:"Fecha (ej: Mié 25)",k:"fecha",t:"text"},{l:"Día de la semana",k:"dia",t:"select",ops:DIAS_SEMANA},{l:"Semana #",k:"semana",t:"number"},{l:"# de publicaciones",k:"numPubs",t:"number"}].map(f=>(
              <div key={f.k} style={{marginBottom:10}}>
                <div style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:1,marginBottom:3,fontWeight:700}}>{f.l}</div>
                {f.t==="select"
                  ?<select value={nuevoDiaForm[f.k]} onChange={e=>setNuevoDiaForm(p=>({...p,[f.k]:e.target.value}))} style={selectStyle}>{f.ops.map(o=><option key={o} style={{background:"#111"}}>{o}</option>)}</select>
                  :<input type={f.t} value={nuevoDiaForm[f.k]} onChange={e=>setNuevoDiaForm(p=>({...p,[f.k]:e.target.value}))} style={inputStyle}/>
                }
              </div>
            ))}
            <div style={{display:"flex",gap:8,marginTop:14}}><BTN onClick={handleAgregarDia}>✅ Agregar</BTN><BTN onClick={()=>setModalAgregarDia(false)} danger>Cancelar</BTN></div>
          </div>
        </div>
      )}

      {/* Modal nuevo mes */}
      {/* ── MODAL GENERAR MES ── */}

      {/* HEADER ADMIN */}
      {/* HEADER ADMIN */}
      <div style={{background:"#0a0a0a",padding:"12px 20px",borderBottom:"1px solid #1a1a1a"}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{fontSize:13,fontWeight:900,color:"#fff",letterSpacing:2,textTransform:"uppercase"}}>TEATRANDO</div>
              <div style={{fontSize:8,color:"rgba(255,255,255,0.35)",letterSpacing:2,textTransform:"uppercase",fontWeight:600}}>Sistema de Contenido · Admin</div>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
              {/* Mix 70/20/10 */}
              {[{l:"Eng/Plan/Exp",v:mix.p123,t:70},{l:"Servicio",v:mix.p4,t:20},{l:"Cult/Social",v:mix.p56,t:10}].map(m=>(
                <div key={m.l} style={{background:"rgba(0,0,0,0.35)",borderRadius:7,padding:"3px 9px",border:`1px solid ${Math.abs(m.v-m.t)<=5?"#22c55e":"#C40803"}40`}}>
                  <div style={{fontSize:7,color:"rgba(255,255,255,0.5)"}}>{m.l}</div>
                  <div style={{fontSize:12,fontWeight:900,color:Math.abs(m.v-m.t)<=5?"#22c55e":"#f59e0b"}}>{m.v}%<span style={{fontSize:7,opacity:0.5,marginLeft:2}}>/{m.t}%</span></div>
                </div>
              ))}
              <BTN onClick={()=>setModoCliente(true)} style={{background:"rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.2)"}} small>👁️ Vista cliente</BTN>
              <div style={{fontSize:8,display:"flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:10,background:"rgba(0,0,0,0.3)",border:`1px solid ${syncStatus==="saved"?"#22c55e":syncStatus==="saving"?"#f59e0b":syncStatus==="error"?"#ef4444":"#222"}`}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:syncStatus==="saved"?"#22c55e":syncStatus==="saving"?"#f59e0b":syncStatus==="error"?"#ef4444":"#333",display:"inline-block",animation:syncStatus==="saving"?"pulse 1s infinite":"none"}}/>
                <span style={{color:syncStatus==="saved"?"#22c55e":syncStatus==="saving"?"#f59e0b":syncStatus==="error"?"#ef4444":"#555"}}>
                  {syncStatus==="saving"?"Guardando...":syncStatus==="saved"?"✓ Guardado":syncStatus==="error"?"⚠ Error sync":"En línea"}
                </span>
              </div>
            </div>
          </div>
          <div style={{fontSize:8,color:"rgba(255,255,255,0.4)",marginTop:4}}>⚠️ El mix 70/20/10 aplica solo sobre contenidos. Las reseñas son independientes y no afectan este indicador.</div>
          {alertasSemanas().length>0&&(
            <div style={{marginTop:8,display:"flex",gap:6,flexWrap:"wrap"}}>
              {alertasSemanas().map(a=><div key={a.semana} style={{fontSize:9,color:"#f59e0b",background:"#2a1f00",border:"1px solid #f59e0b30",padding:"2px 8px",borderRadius:8}}>⚠️ S{a.semana} solo tiene {a.cnt} pub(s)</div>)}
            </div>
          )}
          <div style={{display:"flex",gap:5,marginTop:12,flexWrap:"wrap"}}>
            {[{v:"parrilla",l:"📋 Parrilla"},{v:"resenas",l:"📝 Reseñas"},{v:"visitas",l:"🎭 Obras a visitar"}].map(t=>(
              <BTN key={t.v} active={vista===t.v} onClick={()=>setVista(t.v)} small>{t.l}</BTN>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:980,margin:"0 auto",padding:"0 14px"}}>

        {/* SELECTOR MES */}
        <div style={{marginTop:12,marginBottom:10,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
          {mesesDisp.map(mes=>(
            <div key={mes} style={{position:"relative"}}>
              <button onClick={()=>{setMesActivo(mes);setMesExp(mes===mesExp?null:mes);setSemanaActiva(1);setCardAbierta(null);}}
                style={{padding:"5px 14px",borderRadius:18,display:"flex",alignItems:"center",gap:5,border:mesActivo===mes?"2px solid #C40803":"1.5px solid #222",background:mesActivo===mes?"#C40803":"#111",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:11}}>
                {mes} <span style={{fontSize:9,opacity:0.7}}>{mesExp===mes?"▲":"▼"}</span>
              </button>
              {mesExp===mes&&(
                <div style={{position:"absolute",top:"110%",left:0,background:"#111",border:"1px solid #C40803",borderRadius:10,padding:8,zIndex:200,minWidth:170,boxShadow:"0 8px 30px rgba(0,0,0,0.9)"}}>
                  <div style={{fontSize:8,color:"#444",textTransform:"uppercase",letterSpacing:1,marginBottom:5,fontWeight:700,paddingLeft:3}}>Semanas</div>
                  {mesesDisp.length===0&&(
                <div style={{padding:"20px",color:"#444",fontSize:11,textAlign:"center",border:"1px dashed #222",borderRadius:8,marginBottom:12}}>
                  Sin parrilla cargada aún. El contenido aparecerá aquí cuando se genere desde el chat.
                </div>
              )}
              {semanasDelMes.map(s=>(
                    <button key={s} onClick={()=>{setSemanaActiva(s);setMesActivo(mes);setMesExp(null);setCardAbierta(null);}}
                      style={{display:"block",width:"100%",textAlign:"left",padding:"5px 8px",borderRadius:6,marginBottom:2,background:mesActivo===mes&&semanaActiva===s?"#C40803":"transparent",border:"none",color:"#fff",cursor:"pointer",fontSize:11,fontWeight:600}}>
                      Semana {s} <span style={{fontSize:9,opacity:0.5,marginLeft:4}}>({parrillas[mes]?.filter(p=>p.semana===s).length||0} pubs)</span>
                    </button>
                  ))}
                  <div style={{borderTop:"1px solid #1a1a1a",marginTop:6,paddingTop:6,display:"flex",flexDirection:"column",gap:4}}>
                    <button onClick={()=>{setMesExp(null);handleAgregarSemana();}} style={{width:"100%",textAlign:"left",padding:"5px 8px",borderRadius:6,background:"transparent",border:"1px dashed #333",color:"#666",cursor:"pointer",fontSize:10,fontWeight:600}}>+ Agregar semana</button>
                    {mesesDisp.length>1&&<button onClick={()=>{
                      if(window.confirm(`¿Eliminar el mes "${mes}" y todo su contenido? Esta acción no se puede deshacer.`)){
                        const nuevo=mesesDisp.filter(m=>m!==mes);
                        setMesesDisp(nuevo);
                        const primerMes=nuevo[0]||"Marzo";
                        setMesActivo(primerMes);
                        setMesExp(null);
                        setSemanaActiva(1);
                        setParrillas(prev=>{const n={...prev};delete n[mes];return n;});
                        setResenas(prev=>{const n={...prev};delete n[mes];return n;});
                        setBriefings(prev=>{const n={...prev};delete n[mes];return n;});
                        notif(`Mes "${mes}" eliminado`);
                      }
                    }} style={{width:"100%",textAlign:"left",padding:"5px 8px",borderRadius:6,background:"#2d0000",border:"1px solid #7f1d1d",color:"#ff6b6b",cursor:"pointer",fontSize:10,fontWeight:600}}>🗑️ Eliminar este mes</button>}
                  </div>
                </div>
              )}
            </div>
          ))}

        </div>

        {/* BRIEFING */}
        <div style={{background:"#0a0a12",border:"1px solid #1a1a3a",borderRadius:10,padding:"10px 14px",marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <div style={{fontSize:9,color:"#4455aa",textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>📋 Línea editorial — {mesActivo} 2026</div>
            <button onClick={()=>setEditandoBriefing(!editandoBriefing)} style={{fontSize:9,color:"#4455aa",background:"transparent",border:"1px solid #1a1a3a",borderRadius:6,padding:"2px 8px",cursor:"pointer"}}>{editandoBriefing?"✅ Guardar":"✏️ Editar"}</button>
          </div>
          {editandoBriefing
            ?<textarea value={briefingMes} onChange={e=>setBriefings(prev=>({...prev,[mesActivo]:e.target.value}))} rows={6}
                style={{width:"100%",background:"#060610",color:"#aaaadd",border:"1px solid #1a1a3a",borderRadius:7,padding:"8px 10px",fontSize:10,lineHeight:1.7,resize:"vertical",boxSizing:"border-box",fontFamily:"inherit"}}
                placeholder="Escribe la línea editorial del mes..."/>
            :<pre style={{fontSize:10,color:"#8888aa",lineHeight:1.7,whiteSpace:"pre-wrap",fontFamily:"inherit",margin:0}}>{briefingMes||"Sin briefing. Haz clic en Editar para agregar."}</pre>
          }
        </div>

        {/* ══ PARRILLA ══ */}
        {vista==="parrilla"&&(
          <>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:10}}>
              {[{l:"Pilar",ops:["Todos",...PILARES],v:filtros.pilar,k:"pilar"},{l:"Formato",ops:["Todos","Post","Carrusel","Reel","Story"],v:filtros.formato,k:"formato"},{l:"Red",ops:["Todas",...REDES],v:filtros.red,k:"red"}].map(f=>(
                <div key={f.k} style={{display:"flex",gap:3,alignItems:"center",flexWrap:"wrap"}}>
                  <span style={{fontSize:8,color:"#333",textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>{f.l}:</span>
                  {f.ops.slice(0,f.k==="pilar"?7:f.k==="red"?4:5).map(o=>(
                    <button key={o} onClick={()=>setFiltros(prev=>({...prev,[f.k]:o}))} style={{padding:"2px 7px",borderRadius:10,fontSize:8,border:f.v===o?"1.5px solid #C40803":"1px solid #1a1a1a",background:f.v===o?"#C40803":"#111",color:"#fff",cursor:"pointer",fontWeight:600}}>
                      {o==="Todos"||o==="Todas"?o:o.replace("P1 – ","P1·").replace("P2 – ","P2·").replace("P3 – ","P3·").replace("P4 – ","P4·").replace("P5 – ","P5·").replace("P6 – ","P6·").replace(" estático","").replace(" interactiva","")}
                    </button>
                  ))}
                </div>
              ))}
              <button onClick={()=>setModalAgregarDia(true)} style={{marginLeft:"auto",padding:"4px 12px",borderRadius:16,border:"1.5px dashed #333",background:"transparent",color:"#666",cursor:"pointer",fontSize:10,fontWeight:700}}>+ Agregar día</button>
            </div>

            <div style={{fontSize:9,color:"#333",marginBottom:8,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              <span><span style={{color:"#C40803",fontWeight:700}}>{filtradas.length}</span> publicaciones · {mesActivo} S{semanaActiva}</span>
              <span style={{color:"#555",fontSize:8}}>· reseñas en pestaña aparte</span>
            </div>

            {Object.entries(byDate).map(([fecha,pubs])=>(
              <div key={fecha} style={{marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <div style={{background:"#C40803",color:"#fff",fontWeight:900,fontSize:9,padding:"2px 9px",borderRadius:5}}>{fecha}</div>
                  <div style={{flex:1,height:1,background:"#141414"}}/>
                </div>
                {pubs.map(p=>{
                  const isOpen=cardAbierta===p.id;
                  const ec=sc(p.estado);
                  return(
                    <div key={p.id} style={{background:"#0b0b0b",border:isOpen?`1.5px solid ${PILAR_COLOR[p.pilar]||"#333"}`:"1px solid #141414",borderRadius:9,marginBottom:5,overflow:"hidden"}}>
                      <div onClick={()=>setCardAbierta(isOpen?null:p.id)} style={{padding:"8px 11px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                        <div style={{width:18,height:18,borderRadius:"50%",background:PILAR_COLOR[p.pilar]||"#333",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:900,flexShrink:0,color:"#fff"}}>{p.pub}</div>
                        <span style={{fontSize:7,background:PILAR_COLOR[p.pilar],color:"#fff",padding:"1px 5px",borderRadius:6,fontWeight:700}}>{p.pilar.split("–")[0].trim()}</span>
                        {p.tipo&&<span style={{fontSize:7,background:TIPO_COLOR[p.tipo]||"#555",color:"#fff",padding:"1px 5px",borderRadius:4,fontWeight:900,textTransform:"uppercase",letterSpacing:0.5}}>{p.tipo==="RESENA"?"RESEÑA":p.tipo==="RECOMENDACION"?"REC.":p.tipo}</span>}
                        <span style={{fontSize:11,fontWeight:700,color:"#fff",flex:1,minWidth:100}}>{p.tema}</span>
                        <div style={{display:"flex",gap:2,flexWrap:"wrap"}}>
                          {(p.redes||[]).slice(0,3).map(r=><span key={r} style={{fontSize:8,background:"#141414",color:RED_COLOR[r]||"#888",padding:"1px 4px",borderRadius:5}}>{RED_ICON[r]}</span>)}
                          {(p.redes||[]).length>3&&<span style={{fontSize:8,color:"#333"}}>+{(p.redes||[]).length-3}</span>}
                        </div>
                        <span style={{fontSize:7,background:ec.bg,color:ec.color,padding:"1px 5px",borderRadius:6,fontWeight:700,border:`1px solid ${ec.color}30`}}>{p.estado}</span>
                        <span style={{fontSize:9,color:isOpen?"#C40803":"#222"}}>{isOpen?"▲":"▼"}</span>
                      </div>
                      {isOpen&&(
                        <div style={{padding:"0 11px 11px",borderTop:"1px solid #141414"}}>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginTop:9}}>
                            {[{l:"Pilar",campo:"pilar",ops:PILARES},{l:"Formato",campo:"formato",ops:FORMATOS},{l:"Estado",campo:"estado",ops:ESTADOS}].map(f=>(
                              <div key={f.campo}>
                                <div style={{fontSize:7,color:"#333",textTransform:"uppercase",letterSpacing:1,marginBottom:2,fontWeight:700}}>{f.l}</div>
                                <select value={p[f.campo]} onChange={e=>editarCampo(p.id,f.campo,e.target.value)}
                                  style={{...selectStyle,background:f.campo==="estado"?ec.bg:"#0d0d0d",color:f.campo==="estado"?ec.color:"#fff",border:`1px solid ${f.campo==="estado"?ec.color+"40":"#1a1a1a"}`}}>
                                  {f.ops.map(o=><option key={o} style={{background:"#111",color:"#fff"}}>{o}</option>)}
                                </select>
                              </div>
                            ))}
                          </div>
                          <div style={{marginTop:7}}>
                            <div style={{fontSize:7,color:"#333",textTransform:"uppercase",letterSpacing:1,marginBottom:3,fontWeight:700}}>Redes sociales</div>
                            <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                              {REDES.map(r=>(
                                <button key={r} onClick={()=>toggleRed(p.id,r)} style={{padding:"2px 7px",borderRadius:8,fontSize:8,cursor:"pointer",fontWeight:600,background:(p.redes||[]).includes(r)?RED_COLOR[r]+"22":"#111",border:(p.redes||[]).includes(r)?`1.5px solid ${RED_COLOR[r]}`:"1px solid #222",color:(p.redes||[]).includes(r)?RED_COLOR[r]:"#555"}}>
                                  {RED_ICON[r]} {r}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div style={{marginTop:7,display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                            <div>
                              <div style={{fontSize:7,color:"#333",textTransform:"uppercase",letterSpacing:1,marginBottom:2,fontWeight:700}}>📅 Fecha</div>
                              <input value={p.fecha} placeholder="Ej: Lun 6" onChange={e=>{
                                const val=e.target.value;
                                const num=parseInt(val.replace(/\D/g,""))||0;
                                const sem=num<=5?1:num<=12?2:num<=19?3:num<=26?4:5;
                                editarCampo(p.id,"fecha",val);
                                if(num>0) editarCampo(p.id,"semana",sem);
                              }} style={inputStyle}/>
                            </div>
                            <div>
                              <div style={{fontSize:7,color:"#333",textTransform:"uppercase",letterSpacing:1,marginBottom:2,fontWeight:700}}>Tema</div>
                              <input value={p.tema} onChange={e=>editarCampo(p.id,"tema",e.target.value)} style={inputStyle}/>
                            </div>
                          </div>
                          <div style={{marginTop:7}}>
                            <div style={{marginBottom:3}}><div style={{fontSize:7,color:"#333",textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>📝 Copy</div></div>
                            <textarea value={p.copy} onChange={e=>editarCampo(p.id,"copy",e.target.value)} rows={4}
                              style={{...inputStyle,background:"#060606",lineHeight:1.65,resize:"vertical"}}/>
                          </div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginTop:7}}>
                            {[{l:"🗒️ Notas",k:"notas",ph:"Pendiente..."}].map(f=>(
                              <div key={f.k}>
                                <div style={{fontSize:7,color:"#333",textTransform:"uppercase",letterSpacing:1,marginBottom:2,fontWeight:700}}>{f.l}</div>
                                <input value={p[f.k]||""} placeholder={f.ph||""} onChange={e=>editarCampo(p.id,f.k,e.target.value)} style={{...inputStyle,background:"#060606",border:"1px dashed #1a1a1a",color:"#666"}}/>
                              </div>
                            ))}
                            <div>
                              <div style={{fontSize:7,color:"#333",textTransform:"uppercase",letterSpacing:1,marginBottom:2,fontWeight:700}}>🎨 Diseño</div>
                              <button onClick={()=>{const cur=p.disenho||"";const next=cur===""?"para_disenar":cur==="para_disenar"?"disenho_realizado":"";editarCampo(p.id,"disenho",next);}}
                                style={{width:"100%",padding:"4px 8px",borderRadius:6,fontSize:9,fontWeight:700,cursor:"pointer",
                                  background:p.disenho==="para_disenar"?"#C40803":p.disenho==="disenho_realizado"?"#059669":"#0a0a0a",
                                  color:p.disenho?"#fff":"#444",
                                  border:p.disenho==="para_disenar"?"2px solid #C40803":p.disenho==="disenho_realizado"?"2px solid #059669":"1.5px solid #333"}}>
                                {p.disenho==="para_disenar"?"🎨 Para diseñar":p.disenho==="disenho_realizado"?"✓ Diseño realizado":"Enviar a diseñar"}
                              </button>
                            </div>
                          </div>
                          <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
                            <button onClick={()=>handleEliminarPub(p.id)} style={{fontSize:9,color:"#7f1d1d",background:"transparent",border:"none",cursor:"pointer"}}>🗑️ Eliminar</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {filtradas.length===0&&(
                  <div style={{textAlign:"center",padding:32,color:"#222",fontSize:12,border:"1px dashed #141414",borderRadius:10}}>
                    🎭 Sin publicaciones.
                    <button onClick={()=>setModalAgregarDia(true)} style={{marginTop:10,display:"block",margin:"10px auto 0",padding:"5px 16px",borderRadius:16,border:"1px dashed #333",background:"transparent",color:"#555",cursor:"pointer",fontSize:10}}>+ Agregar día</button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* ══ CALENDARIO ══ */}
        {vista==="resenas"&&(
          <div style={{marginTop:12}}>
            <div style={{background:"#0d0d0d",border:"1px solid #1a0000",borderRadius:10,padding:"10px 14px",marginBottom:14}}>
              <div style={{fontSize:10,color:"#C40803",fontWeight:700,marginBottom:4}}>📖 Reseñas — independientes del mix 70/20/10</div>
              <div style={{fontSize:9,color:"#555"}}>Las reseñas son un tipo de contenido propio. No afectan ni forman parte del indicador de distribución de contenidos (70/20/10). Se gestionan y planifican por separado.</div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div>
                <div style={{fontSize:12,fontWeight:700}}>Reseñas — {mesActivo}</div>
                <div style={{fontSize:9,color:"#444",marginTop:2}}>{resenasMes.length} reseñas · {resenasMes.filter(r=>r.redSocial).length} programadas a redes</div>
              </div>
              <div style={{display:"flex",gap:6}}>
                
                <button onClick={handleAgregarResena} style={{padding:"4px 12px",borderRadius:14,border:"1px solid #22c55e",background:"#002a10",color:"#22c55e",cursor:"pointer",fontSize:9,fontWeight:700}}>+ Nueva reseña</button>
              </div>
            </div>
            {[1,2,3,4].map(s=>{
              const rs=resenasMes.filter(r=>r.semana===s);
              if(rs.length===0)return(
                <div key={s} style={{marginBottom:10}}>
                  <div style={{fontSize:9,color:"#C40803",fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:6}}>Semana {s}</div>
                  <div style={{border:"1px dashed #1a1a1a",borderRadius:8,padding:"10px",textAlign:"center",color:"#333",fontSize:10}}>Sin reseñas. <button onClick={handleAgregarResena} style={{fontSize:9,color:"#555",background:"transparent",border:"none",cursor:"pointer",textDecoration:"underline"}}>Agregar</button></div>
                </div>
              );
              return(
                <div key={s} style={{marginBottom:16}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                    <span style={{fontSize:8,color:"#C40803",fontWeight:700,textTransform:"uppercase",letterSpacing:2}}>Semana {s}</span>
                    <div style={{flex:1,height:1,background:"#141414"}}/>
                    <span style={{fontSize:8,color:"#444"}}>{rs.filter(r=>r.redSocial).length}/3 a redes</span>
                  </div>
                  {rs.map(r=>(
                    <div key={r.id} style={{background:"#0b0b0b",border:r.redSocial?"1.5px solid #C40803":"1px solid #141414",borderRadius:9,padding:"9px 12px",marginBottom:6,display:"flex",gap:9}}>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,flexShrink:0}}>
                        <button onClick={()=>setResenas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(x=>x.id===r.id?{...x,redSocial:!x.redSocial}:x)}))}
                          style={{width:28,height:28,borderRadius:7,background:r.redSocial?"#C40803":"#141414",border:r.redSocial?"none":"1px solid #222",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}} title="Marcar para redes">
                          {r.redSocial?"⭐":"○"}
                        </button>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",gap:5,marginBottom:5,flexWrap:"wrap",alignItems:"center"}}>
                          <span style={{fontSize:8,color:"#C40803",background:"#1a0000",padding:"1px 5px",borderRadius:6,fontWeight:700}}>{r.genero}</span>
                          {r.redSocial&&<span style={{fontSize:7,color:"#C40803",background:"#1a0000",padding:"1px 5px",borderRadius:6,border:"1px solid #C40803",fontWeight:700}}>📱 A redes</span>}
                          <select value={r.estado} onChange={e=>setResenas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(x=>x.id===r.id?{...x,estado:e.target.value}:x)}))}
                            style={{marginLeft:"auto",background:sc(r.estado).bg,color:sc(r.estado).color,border:`1px solid ${sc(r.estado).color}40`,borderRadius:5,padding:"2px 6px",fontSize:8,fontWeight:700}}>
                            {ESTADOS.map(e=><option key={e} style={{background:"#111",color:"#fff"}}>{e}</option>)}
                          </select>
                        </div>
                        {[{l:"Obra",k:"obra"},{l:"Género",k:"genero"},{l:"Título de la reseña",k:"titulo"},{l:"Gancho",k:"gancho"}].map(f=>(
                          <div key={f.k} style={{marginBottom:4}}>
                            <div style={{fontSize:7,color:"#333",textTransform:"uppercase",letterSpacing:1,marginBottom:1,fontWeight:700}}>{f.l}</div>
                            <input value={r[f.k]||""} onChange={e=>setResenas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(x=>x.id===r.id?{...x,[f.k]:e.target.value}:x)}))} style={{...inputStyle,fontSize:f.k==="titulo"?11:10}}/>
                          </div>
                        ))}
                        <input value={r.notas||""} placeholder="Notas internas..." onChange={e=>setResenas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(x=>x.id===r.id?{...x,notas:e.target.value}:x)}))}
                          style={{...inputStyle,background:"#060606",border:"1px dashed #141414",color:"#555",fontSize:9,marginTop:4}}/>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* ══ POR RED ══ */}
        {vista==="visitas"&&(
          <div style={{marginTop:12}}>
            <div style={{fontSize:11,fontWeight:700,color:"#fff",marginBottom:16,letterSpacing:1}}>OBRAS A VISITAR — {mesActivo.toUpperCase()} 2026</div>
            <div style={{background:"#0d0d0d",border:"1.5px dashed #C40803",borderRadius:10,padding:"14px 16px",marginBottom:20}}>
              <div style={{fontSize:9,color:"#C40803",fontWeight:700,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>+ Agregar obra</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                <div><div style={{fontSize:8,color:"#555",marginBottom:3}}>Obra</div><input id="v_obra" placeholder="Nombre de la obra" style={{width:"100%",background:"#111",border:"1px solid #1e1e1e",color:"#fff",borderRadius:6,padding:"5px 8px",fontSize:10,boxSizing:"border-box"}}/></div>
                <div><div style={{fontSize:8,color:"#555",marginBottom:3}}>Teatro / Venue</div><input id="v_teatro" placeholder="Teatro o foro" style={{width:"100%",background:"#111",border:"1px solid #1e1e1e",color:"#fff",borderRadius:6,padding:"5px 8px",fontSize:10,boxSizing:"border-box"}}/></div>
                <div><div style={{fontSize:8,color:"#555",marginBottom:3}}>Día del mes</div><input id="v_dia" type="number" min="1" max="31" placeholder="Ej: 15" style={{width:"100%",background:"#111",border:"1px solid #1e1e1e",color:"#fff",borderRadius:6,padding:"5px 8px",fontSize:10,boxSizing:"border-box"}}/></div>
                <div><div style={{fontSize:8,color:"#555",marginBottom:3}}>Hora</div><input id="v_hora" placeholder="Ej: 8:00 PM" style={{width:"100%",background:"#111",border:"1px solid #1e1e1e",color:"#fff",borderRadius:6,padding:"5px 8px",fontSize:10,boxSizing:"border-box"}}/></div>
              </div>
              <div style={{marginBottom:8}}><div style={{fontSize:8,color:"#555",marginBottom:3}}>Notas (opcional)</div><input id="v_notas" placeholder="Ej: Invitación de prensa..." style={{width:"100%",background:"#111",border:"1px solid #1e1e1e",color:"#fff",borderRadius:6,padding:"5px 8px",fontSize:10,boxSizing:"border-box"}}/></div>
              <button onClick={()=>{
                const obra=document.getElementById("v_obra").value.trim();
                const teatro=document.getElementById("v_teatro").value.trim();
                const dia=parseInt(document.getElementById("v_dia").value)||0;
                const hora=document.getElementById("v_hora").value.trim();
                const notas=document.getElementById("v_notas").value.trim();
                if(!obra||!dia){notif("⚠ Escribe al menos obra y día");return;}
                setVisitas(prev=>[...prev,{id:"v_"+Date.now(),mes:mesActivo,obra,teatro,dia,hora,notas}]);
                ["v_obra","v_teatro","v_dia","v_hora","v_notas"].forEach(id=>document.getElementById(id).value="");
                notif("✅ Obra agregada");
              }} style={{padding:"5px 16px",background:"#C40803",color:"#fff",border:"none",borderRadius:8,fontSize:10,fontWeight:700,cursor:"pointer"}}>Agregar</button>
            </div>
            {visitas.filter(v=>v.mes===mesActivo).length===0
              ?<div style={{textAlign:"center",padding:32,color:"#222",fontSize:11,border:"1px dashed #141414",borderRadius:10}}>No hay obras registradas aún.</div>
              :<div style={{display:"flex",flexDirection:"column",gap:8}}>
                {visitas.filter(v=>v.mes===mesActivo).sort((a,b)=>a.dia-b.dia).map(v=>(
                  <div key={v.id} style={{background:"#0b0b0b",border:"1px solid #141414",borderRadius:8,padding:"10px 14px",display:"flex",gap:12,alignItems:"center"}}>
                    <div style={{minWidth:36,textAlign:"center",background:"#C40803",borderRadius:6,padding:"4px"}}>
                      <div style={{fontSize:16,fontWeight:900,color:"#fff",lineHeight:1}}>{v.dia}</div>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:11,fontWeight:700,color:"#fff"}}>{v.obra}</div>
                      <div style={{fontSize:9,color:"#C40803"}}>{v.teatro}</div>
                      <div style={{fontSize:9,color:"#444"}}>{v.hora}{v.notas?" · "+v.notas:""}</div>
                    </div>
                    <button onClick={()=>{setVisitas(prev=>prev.filter(x=>x.id!==v.id));notif("🗑 Eliminada");}}
                      style={{background:"transparent",border:"1px solid #2d0000",color:"#ff4444",borderRadius:6,padding:"2px 8px",fontSize:9,cursor:"pointer"}}>✕</button>
                  </div>
                ))}
              </div>
            }
          </div>
        )}


        <div style={{textAlign:"center",marginTop:28,fontSize:8,color:"#141414"}}>Teatrando CDMX · Sistema de Contenido 2026 · @teatrandocdmx</div>
      </div>
    </div>
  );
}
