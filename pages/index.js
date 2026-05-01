import { useState, useCallback, useEffect, useRef } from "react";

const REDES = ["Instagram Feed","Instagram Stories","Instagram Reels","Facebook","TikTok","X","YouTube Shorts","YouTube"];
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


const TIPO_COLOR = {"RESENA":"#7c3aed","3 RAZONES":"#0891b2","5 RAZONES":"#0891b2","FRASE":"#b45309","RECOMENDACION":"#059669","ESTRENO":"#dc2626","SI TE GUSTO":"#be185d"};
const PILAR_COLOR = {"P1 – Curaduría":"#C40803","P2 – Planes":"#8B0000","P3 – Experiencia":"#B61220","P4 – Servicio":"#1a1a2e","P5 – Prueba social":"#0d2137","P6 – Cultura":"#700B15"};
const RED_ICON = {"Instagram Feed":"📸","Instagram Stories":"📲","Instagram Reels":"🎬","Facebook":"👍","TikTok":"🎵","X":"✖","YouTube Shorts":"▶","YouTube":"🎥"};
const RED_COLOR = {"Instagram Feed":"#E1306C","Instagram Stories":"#833AB4","Instagram Reels":"#405DE6","Facebook":"#1877F2","TikTok":"#ff0050","X":"#ffffff","YouTube Shorts":"#FF0000","YouTube":"#FF0000"};
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
  cta:"Link en bio",estado:"Pendiente",notas:"",linkDiseno:"",disenho:"",...o
});

const buildResena = (o={}) => ({
  id:mkId("r"),semana:1,obra:"",titulo:"",...o
});

// ─── PARRILLA MARZO CON MIX 70/20/10 CORRECTO (reseñas FUERA del mix) ─────────
// Contenidos: 28 pubs (excluyendo reseñas)
// P1+P2+P3 = 70% = 20 pubs | P4 = 20% = 6 pubs | P5+P6 = 10% = 3 pubs (sin contar reseñas que son independientes)


const buildMayo = () => [
// ═══════════════════════════════════════════════════════
// SEMANA 1: Vie 1 – Dom 3
// ═══════════════════════════════════════════════════════
  {id:"may_s1_01",fecha:"Vie 1",dia:"Viernes",mes:"Mayo",semana:1,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P6 – Cultura",formato:"Carrusel",tipo:"",resenaId:"",tema:"¿Sabías que el teatro nació hace más de 2,500 años?",copy:"¿Sabías que el teatro nació hace más de 2,500 años?\n\nTodo empezó en Grecia, en las fiestas en honor a Dioniso.\nEsquilo, Sófocles y Eurípides escribieron las primeras historias que se representaron al aire libre.\n\nDesde entonces, el teatro no ha parado.\nSigue vivo. Sigue presente. Sigue emocionando.\n\nY en CDMX, cada fin de semana hay una historia esperándote en el escenario.\n\nEncuéntrala en teatrando.com.mx\n\n#Teatrando #TeatroCDMX #CulturaTeatro #HistoriaDelTeatro #CarteleraCDMX",cta:"teatrando.com.mx",estado:"Pendiente",notas:"POST CULTURAL - El primero del mes. Imagen tipo infografía teatral. Ya existe diseño de referencia.",disenho:"para_disenar"},

  {id:"may_s1_02",fecha:"Vie 1",dia:"Viernes",mes:"Mayo",semana:1,pub:2,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P2 – Planes",formato:"Carrusel",tipo:"",resenaId:"",tema:"Cartelera de este fin de semana — arranca mayo con todo",copy:"Arranca mayo y el teatro te espera 🎭\n\nESTE FIN DE SEMANA:\nPARA PAREJA: Tripas Corazón · La Dama de Negro\nPARA AMIGOS: Sor-presas Amén · Qué Desastre de Función\nPARA FAMILIA: Cri Cri · Los Clowns · Caperucita\n\nDesliza y elige. Reserva en teatrando.com.mx\n\n#Teatrando #TeatroCDMX #PlanFinDeSemana #CarteleraCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s1_03",fecha:"Sáb 2",dia:"Sábado",mes:"Mayo",semana:1,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Reels","TikTok"],pilar:"P3 – Experiencia",formato:"Reel",tipo:"",resenaId:"",tema:"Tripas Corazón — la comedia que abre mayo con carcajadas",copy:"Chelis y Lupe lo volvieron a hacer. 😂\n\nDos amigas. Un trabajo imposible. Situaciones que ya no puedes más.\nPero en lugar de rendirse… eligieron reírse de todo.\n\nTripas Corazón es la comedia que CDMX necesita este mayo.\nSin filtros. Sin pretextos. Con todo el corazón.\n\n📍 Foro Cultural Coyoacanense\n🗓️ Viernes y Sábado 8pm · Domingo 7pm\n🎟️ Reserva ya en teatrando.com.mx\n\nCon Libertad Palomo y Alejandra Toussaint.\n\n#Teatrando #TripasCorazon #ObrasDeCDMX #TeatroCDMX #PlanAmigos",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s1_04",fecha:"Sáb 2",dia:"Sábado",mes:"Mayo",semana:1,pub:2,redes:["Instagram Feed","Facebook","Instagram Stories","Facebook Stories"],pilar:"P2 – Planes",formato:"Carrusel",tipo:"",resenaId:"",tema:"Plan familiar este fin — Los Clowns y Cri Cri",copy:"Plan familiar este fin 🎭\n\n🤡 LOS CLOWNS — Circo Atayde\nSáb 2 mayo · 11am y 1:30pm · Centro Cultural Teatro 2\nDom 3 mayo · 11am\n\n🎵 DESCUBRIENDO A CRI CRI\nSáb y Dom · 1pm · Teatro Hidalgo\n\n🎟️ Reserva en teatrando.com.mx\n\n#Teatrando #TeatroFamiliar #ObrasDeCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s1_05",fecha:"Dom 3",dia:"Domingo",mes:"Mayo",semana:1,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"Meme — Antes vs durante el teatro",copy:"Yo antes de ir al teatro:\n\"A ver si no me aburro…\" 😐\n\nYo en la obra:\n😭🤯👏\n*Parado aplaudiendo como si conociera al elenco*\n\nTodo el que ha ido al teatro entiende exactamente esto.\n\n¿A quién se lo mandas? 👇\n\nEncuentra tu próxima obra en teatrando.com.mx\n\n#Teatrando #TeatroCDMX #MemeTeatro #ObrasDeCDMX #QueHacerEnCDMX",cta:"teatrando.com.mx",estado:"Pendiente",notas:"MEME — Adaptación del meme 5. Lolita tiene el diseño de referencia.",disenho:"para_disenar"},

  {id:"may_s1_06",fecha:"Dom 3",dia:"Domingo",mes:"Mayo",semana:1,pub:2,redes:["Instagram Feed","Facebook","Instagram Stories","Facebook Stories"],pilar:"P5 – Prueba social",formato:"Post estático",tipo:"",resenaId:"",tema:"Interacción — ¿Qué tipo de obra eres?",copy:"¿Qué tipo de obra eres? 🎭\n\na) 😂 Comedia — porque la vida ya tiene suficiente drama\nb) 💔 Drama — porque necesitas sentir algo de verdad\nc) 🎵 Musical — porque todo mejora con buena música\nd) 🔪 Suspenso — porque te gusta no saber qué viene\n\nResponde en los comentarios y etiqueta a alguien que vaya contigo al teatro 👇\n\n#Teatrando #TeatroCDMX #ObrasDeCDMX #PlanesCDMX #QueHacerEnCDMX",cta:"teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

// ═══════════════════════════════════════════════════════
// SEMANA 2: Lun 4 – Dom 10 (Día de las Madres Sáb 10)
// ═══════════════════════════════════════════════════════
  {id:"may_s2_01",fecha:"Lun 4",dia:"Lunes",mes:"Mayo",semana:2,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P1 – Curaduría",formato:"Carrusel",tipo:"RECOMENDACION",resenaId:"",tema:"Recomendación de la semana — El amor es una mierda",copy:"LA RECOMENDACIÓN TEATRANDO DE ESTA SEMANA:\nEL AMOR ES UNA MIERDA\n\nLa obra que dice en voz alta lo que todos hemos pensado alguna vez.\n\nHumor inteligente, situaciones reconocibles y una honestidad brutal que te hace reír y pensar al mismo tiempo.\n\nPerfecta para ir con pareja, con ex-amigos o solo.\n\n📍 La Teatrería\n🗓️ Martes 8pm\n🎟️ Boletos en Teatrando.com.mx\n\n#Teatrando #TeatroCDMX #ElAmorEsUnaMierda #ObrasDeCDMX #CarteleraCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s2_02",fecha:"Lun 4",dia:"Lunes",mes:"Mayo",semana:2,pub:2,redes:["Instagram Feed","Facebook"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"FRASE",resenaId:"",tema:"Frase de la semana — Einstein",copy:"El arte supremo del maestro consiste en despertar el goce de la expresión creativa y del conocimiento. ✨\n— Albert Einstein\n\nGuárdala y compártela con alguien que necesita esta frase hoy.\n\n#Teatrando #FraseDeTeatro #TeatroCDMX #Einstein #ObrasDeCDMX",cta:"Guardar y compartir",estado:"Pendiente",notas:"",disenho:"para_disenar"},

  {id:"may_s2_03",fecha:"Mar 5",dia:"Martes",mes:"Mayo",semana:2,pub:1,redes:["Instagram Reels","TikTok","YouTube Shorts"],pilar:"P1 – Curaduría",formato:"Reel",tipo:"RESENA",resenaId:"",tema:"El amor es una mierda — Reseña Teatrando",copy:"RESEÑA TEATRANDO: EL AMOR ES UNA MIERDA\n\n¿El amor duele? ¿El amor confunde? ¿El amor ya no sabe como antes?\n\nEsta obra no da respuestas — da algo mejor:\nuna hora de comedia honesta que te hace sentir que no eres el único.\n\nHumor sin filtros sobre lo más humano que existe.\n\n📍 La Teatrería\n🗓️ Martes 8pm\n🎟️ Lee la reseña completa en Teatrando.com.mx\n\n#Teatrando #ElAmorEsUnaMierda #TeatroCDMX #ReseñaTeatro #ObrasDeCDMX",cta:"Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s2_04",fecha:"Mar 5",dia:"Martes",mes:"Mayo",semana:2,pub:2,redes:["Instagram Feed","Facebook","X"],pilar:"P3 – Experiencia",formato:"Carrusel",tipo:"3 RAZONES",resenaId:"",tema:"3 razones para ver Crisis para principiantes",copy:"3 RAZONES PARA VER CRISIS PARA PRINCIPIANTES\n\n1. Porque ser adulto es improvisar — y esta obra lo entiende perfectamente\n\n2. Drama que te hace sentir acompañado en lo que no sabes cómo nombrar\n\n3. Viernes 8:30pm en Teatro Rafael Solana — el espacio perfecto para dejarse llevar\n\nDesliza y reserva.\n🎟️ Teatrando.com.mx\n\n#Teatrando #CrisisParaPrincipiantes #TeatroCDMX #ObrasDeCDMX #PlanCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s2_05",fecha:"Mié 6",dia:"Miércoles",mes:"Mayo",semana:2,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P6 – Cultura",formato:"Post estático",tipo:"",resenaId:"",tema:"Post cultural — La primera obra musical en CDMX",copy:"¿Sabías que la primera obra musical en la Ciudad de México\nse presentó el 4 de noviembre de 1866?\n\nSe llamó \"La Hija del Batallón\"\ny se estrenó en el Teatro Nacional — hoy el Palacio de Bellas Artes.\n\nMéxico siempre ha tenido el telón levantado. 🎭\n\nAnd la historia sigue. Este mes hay más de 40 obras en cartelera esperándote.\nEncuéntralas en teatrando.com.mx\n\n#Teatrando #TeatroCDMX #CulturaTeatro #HistoriaDelTeatro #CDMX",cta:"teatrando.com.mx",estado:"Pendiente",notas:"POST CULTURAL — primera obra musical CDMX. Diseño de referencia disponible.",disenho:"para_disenar"},

  {id:"may_s2_06",fecha:"Mié 6",dia:"Miércoles",mes:"Mayo",semana:2,pub:2,redes:["Instagram Feed","Facebook","X"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"Meme — Cine vs Teatro",copy:"EL CINE CADA AÑO:\n✓ 3D · ✓ 4K · ✓ Dolby · ✓ VR\n\nEL TEATRO DESDE SIEMPRE:\n\"Hola, estoy vivo frente a ti\" ❤️\n\nNo es competencia. Pero si lo fuera...\n\n¿A quién le mandas esto? 👇\n\n#Teatrando #TeatroCDMX #MemeTeatro #CineVsTeatro #ObrasDeCDMX",cta:"teatrando.com.mx",estado:"Pendiente",notas:"MEME — Adaptación del meme 3. Diseño de referencia disponible.",disenho:"para_disenar"},

  {id:"may_s2_07",fecha:"Jue 7",dia:"Jueves",mes:"Mayo",semana:2,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"ESTRENO",resenaId:"",tema:"ESTRENO — El que se enamora pierde arranca este jueves",copy:"ESTRENO ESTA SEMANA\nEL QUE SE ENAMORA PIERDE\n\nArranca este jueves 7 de mayo en el escenario.\n\n¿Es posible querer sin perder? ¿Amar sin rendirse?\nEsta obra no da respuestas fáciles — da una noche de teatro que no olvidarás.\n\n📍 Nuevo Teatro Versalles\n🗓️ Jueves 8:30pm\n🎟️ Reserva ya en teatrando.com.mx\n\n#Teatrando #ElQueSeEnamoraPierde #EstrenoTeatro #TeatroCDMX #ObrasDeCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"ESTRENO — arranca 7 de mayo",disenho:""},

  {id:"may_s2_08",fecha:"Jue 7",dia:"Jueves",mes:"Mayo",semana:2,pub:2,redes:["Instagram Feed","Facebook","X"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"",resenaId:"",tema:"La última paciente — suspenso que no te suelta",copy:"Una sala de terapia. Un paciente difícil. Una verdad que alguien quiere callar. 🔍\n\nLA ÚLTIMA PACIENTE tiene todo lo que el suspenso promete:\ntensión, giros y una actuación que te mantiene al borde de la butaca.\n\nPerfecta para los que quieren algo diferente este fin.\n\n📍 Foro Shakespeare\n🗓️ Sábados 8:30pm\n🎟️ Reserva en teatrando.com.mx\n\n#Teatrando #LaUltimaPaciente #TeatroCDMX #ObrasDeCDMX #TeatroSuspenso",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s2_09",fecha:"Vie 8",dia:"Viernes",mes:"Mayo",semana:2,pub:1,redes:["Instagram Feed","Facebook","X"],pilar:"P2 – Planes",formato:"Carrusel",tipo:"",resenaId:"",tema:"Cartelera de fin de semana — plan para mamá",copy:"Lleva a mamá al teatro este fin 💐🎭\n\nPLAN PARA EL 10 DE MAYO:\n🎭 Madre Mía · Teatro Varsovia · Jue-Sáb\n🎵 Frida Kahlo el Musical · Sáb-Dom · Coyoacán\n🎵 Malinche el Musical · Frontón México\n😂 Tripas Corazón · Foro Coyoacanense\n\n🎟️ Reserva en teatrando.com.mx\n\n#Teatrando #DiaDeLasMadres #TeatroCDMX #PlanParaMama",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"Anticipa el 10 de mayo",disenho:""},

  {id:"may_s2_10",fecha:"Vie 8",dia:"Viernes",mes:"Mayo",semana:2,pub:2,redes:["Instagram Feed","Facebook","X"],pilar:"P4 – Servicio",formato:"Post estático",tipo:"",resenaId:"",tema:"Guía por zona — dónde encontrar tu obra en CDMX",copy:"¿En qué zona de CDMX vives? 🗺️\n\nCOYOACÁN: Frida Kahlo Musical · Tripas Corazón\nCENTRO: Malinche · Cri Cri · Sor-presas Amén\nINSURGENTES: Crisis para principiantes · Notre Dame\nSUR: Princesas Monster · Merlina · El reino\n\nEscríbenos tu zona por WhatsApp y te ayudamos.\n\n#Teatrando #TeatroCDMX #GuiaPorZona #ObrasDeCDMX",cta:"WhatsApp por zona",estado:"Pendiente",notas:"",disenho:"para_disenar"},

  {id:"may_s2_11",fecha:"Sáb 9",dia:"Sábado",mes:"Mayo",semana:2,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P6 – Cultura",formato:"Carrusel",tipo:"",resenaId:"",tema:"10 de mayo — Mamás que también son actrices y son leyenda",copy:"Mañana es su día. Hoy las celebramos. 💐\n\nMAMÁS LEYENDA EN EL ESCENARIO:\n🌟 Laura Zapata · 🌟 Lourdes Munguía\n🌟 Ana Martín · 🌟 Ofelia Medina\n\nEl mejor regalo: llevarla al teatro.\nTeatrando.com.mx\n\n#Teatrando #DiaDeLasMadres #TeatroCDMX #10DeMayo",cta:"teatrando.com.mx",estado:"Pendiente",notas:"POST ESPECIAL 10 de mayo. Diseño de referencia disponible — mamás actrices.",disenho:"para_disenar"},

  {id:"may_s2_12",fecha:"Sáb 9",dia:"Sábado",mes:"Mayo",semana:2,pub:2,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"Maduras solteras y desesperadas — única función este sábado",copy:"SOLO HOY\nMADURAS, SOLTERAS Y DESESPERADAS\nSábado 9 de mayo · 8:30pm\nTeatro Rodolfo Usigli\n\nLa comedia que conecta, incomoda y hace reír de principio a fin.\nSituaciones que reconocerás. Personajes que no olvidarás.\n\nSi tienes tu boleto — disfruta cada segundo.\nSi no — corre a Teatrando.com.mx 🎟️\n\n#Teatrando #MadurasSolterasYDesesperadas #TeatroCDMX #ObrasDeCDMX #ComediaCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"ÚNICA FUNCIÓN: sábado 9 de mayo",disenho:""},

  {id:"may_s2_13",fecha:"Dom 10",dia:"Domingo",mes:"Mayo",semana:2,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P2 – Planes",formato:"Carrusel",tipo:"",resenaId:"",tema:"Feliz Día de las Madres — llévala al teatro hoy",copy:"Mañana es su día. Hoy las celebramos. 💐\n\nMAMÁS QUE SON LEYENDA EN EL ESCENARIO:\n🌟 Laura Zapata · 🌟 Lourdes Munguía\n🌟 Ana Martín · 🌟 Ofelia Medina\n\nMamás en la vida. Grandes en el escenario. ❤️\nEl mejor regalo: llevarla al teatro.\nTeatrando.com.mx\n\n#Teatrando #DiaDeLasMadres #TeatroCDMX #10DeMayo",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"POST ESPECIAL DÍA DE LAS MADRES",disenho:"para_disenar"},

  {id:"may_s2_14",fecha:"Dom 10",dia:"Domingo",mes:"Mayo",semana:2,pub:2,redes:["Instagram Feed","Facebook","Instagram Stories","Facebook Stories"],pilar:"P2 – Planes",formato:"Carrusel",tipo:"",resenaId:"",tema:"Último domingo de Los Clowns — plan familiar hoy",copy:"Feliz Día de las Madres 💐🎭\n\nHOY EN CDMX:\n🎵 Frida Kahlo el Musical · Dom 6pm · Coyoacán\n🎭 Malinche el Musical · Dom 1 y 5pm · Frontón México\n😂 Tripas Corazón · Dom 7pm · Foro Coyoacanense\n\n🎟️ Reserva en teatrando.com.mx\n\n#Teatrando #DiaDeLasMadres #TeatroCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"Última función de Los Clowns",disenho:""},

// ═══════════════════════════════════════════════════════
// SEMANA 3: Lun 11 – Dom 17 (Día del Maestro Vie 15, One Vision Jue 14, La Cantadera Vie 15)
// ═══════════════════════════════════════════════════════
  {id:"may_s3_01",fecha:"Lun 11",dia:"Lunes",mes:"Mayo",semana:3,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P1 – Curaduría",formato:"Carrusel",tipo:"RECOMENDACION",resenaId:"",tema:"Recomendación de la semana — El hubiera no existe",copy:"LA RECOMENDACIÓN TEATRANDO DE ESTA SEMANA:\nEL HUBIERA NO EXISTE\n\nTodas las decisiones que no tomaste. Todas las palabras que no dijiste.\nTodos los caminos que se quedaron sin recorrer.\n\nEsta obra te confronta con eso — y lo hace con un humor que duele de lo honesto que es.\n\n📍 Foro Sylvia Pasquel\n🗓️ Miércoles 8:30pm\n🎟️ Boletos en Teatrando.com.mx\n\n#Teatrando #ElHuberaNoExiste #TeatroCDMX #ObrasDeCDMX #CarteleraCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s3_02",fecha:"Lun 11",dia:"Lunes",mes:"Mayo",semana:3,pub:2,redes:["Instagram Feed","Facebook","X"],pilar:"P1 – Curaduría",formato:"Carrusel",tipo:"5 RAZONES",resenaId:"",tema:"5 razones para ver Siempre los hombres las prefieren cabronas",copy:"5 RAZONES PARA VER SIEMPRE LOS HOMBRES LAS PREFIEREN CABRONAS\n\n1. El título ya dice todo — y la obra lo cumple con creces\n\n2. Comedia que se ríe de los estereotipos con inteligencia y sin filtros\n\n3. Actuación que te hace reír de principio a fin sin un solo segundo de pausa\n\n4. Sábados 5:30pm en Espacio Teatral Danzite — horario perfecto para el plan\n\n5. Porque hay obras que te cambian la perspectiva riéndote — esta es una de ellas\n\n🎟️ Reserva en Teatrando.com.mx\n\n#Teatrando #SiempreLasPrefierenCabronas #TeatroCDMX #ObrasDeCDMX #ComediaCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s3_03",fecha:"Mar 12",dia:"Martes",mes:"Mayo",semana:3,pub:1,redes:["Instagram Reels","TikTok","YouTube Shorts"],pilar:"P1 – Curaduría",formato:"Reel",tipo:"RESENA",resenaId:"",tema:"Las heridas del viento — Reseña Teatrando",copy:"RESEÑA TEATRANDO: LAS HERIDAS DEL VIENTO\n\nHay obras que no entretienen — transforman.\n\nLas heridas del viento es una de ellas.\nUna historia que habla de lo que no se dice, de lo que duele sin nombre,\nde esas cicatrices que solo el tiempo — y el teatro — pueden iluminar.\n\nTeatro que se queda contigo mucho después de que cae el telón.\n\n📍 Teatro Milán\n🗓️ Martes 8:45pm\n🎟️ Lee la reseña completa en Teatrando.com.mx\n\n#Teatrando #LasHeridasDelViento #TeatroCDMX #ReseñaTeatro #ObrasDeCDMX",cta:"Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s3_04",fecha:"Mar 12",dia:"Martes",mes:"Mayo",semana:3,pub:2,redes:["Instagram Feed","Facebook","X"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"Nos amábamos tanto — cuando el amor tiene otra dimensión",copy:"¿Y si el amor que más duele es el que sigue ahí? 💔\n\nNOS AMÁBAMOS TANTO\n\nUna historia de amor que no termina donde crees que termina.\nÍntima. Honesta. Imposible de olvidar.\n\n📍 Casa Fuerte de Emilio el Indio Fernández\n🗓️ Viernes · Sábados · Domingos · Por línea — múltiples horarios\n🎟️ Reserva en teatrando.com.mx\n\n#Teatrando #NosAmábamosTanto #TeatroCDMX #ObrasDeCDMX #TeatroDeDrama",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s3_05",fecha:"Mié 13",dia:"Miércoles",mes:"Mayo",semana:3,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"Meme — Chisme premium desde bambalinas",copy:"Director: Traten de no distraerse detrás del telón 🎭\n\nYo viendo la obra desde bambalinas: 👀🐕\n\nCHISME PREMIUM desde el escenario. 😂\n\n¿Le ha pasado a alguien más? Cuéntanos en los comentarios 👇\n\n#Teatrando #TeatroCDMX #MemeTeatro #ObrasDeCDMX #BastidoresDeCDMX",cta:"teatrando.com.mx",estado:"Pendiente",notas:"MEME — Diseño de referencia disponible.",disenho:"para_disenar"},

  {id:"may_s3_06",fecha:"Mié 13",dia:"Miércoles",mes:"Mayo",semana:3,pub:2,redes:["Instagram Feed","Facebook","X"],pilar:"P4 – Servicio",formato:"Carrusel",tipo:"",resenaId:"",tema:"Cómo reservar en Teatrando — 3 pasos y listo",copy:"Reservar en Teatrando es facilísimo. 🎟️\n\n1️⃣ Entra a teatrando.com.mx\nO escríbenos directamente por WhatsApp\n\n2️⃣ Elige tu obra y función\nTe ayudamos a encontrar la mejor opción según tu zona, presupuesto y con quién vas\n\n3️⃣ Paga de forma segura y recibe tus boletos\nEn oficina o directo en el teatro — sin filas, sin complicaciones\n\n¿Dudas? WhatsApp en minutos 📲\n\n#Teatrando #TeatroCDMX #ReservaTusBoletos #ObrasDeCDMX #CarteleraCDMX",cta:"WhatsApp para dudas",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s3_07",fecha:"Jue 14",dia:"Jueves",mes:"Mayo",semana:3,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"ESTRENO",resenaId:"",tema:"ESTA NOCHE — One Vision of Queen en Pepsi Center WTC",copy:"HOY ES EL DÍA 🎸\nONE VISION OF QUEEN\n\nJueves 14 de mayo · 8pm\nPepsi Center WTC\n\nQueen en vivo — o lo más cercano que puedes estar a esa experiencia.\nMúsica que trasciende generaciones.\nUna noche que no se olvida.\n\nSi tienes tu boleto: disfruta cada segundo.\nSi no — hay otras experiencias únicas esperándote en teatrando.com.mx 🎟️\n\n#Teatrando #OneVisionOfQueen #PepsiCenterWTC #TeatroCDMX #MusicaEnVivo",cta:"teatrando.com.mx",estado:"Pendiente",notas:"EVENTO ESPECIAL — 14 de mayo",disenho:""},

  {id:"may_s3_08",fecha:"Jue 14",dia:"Jueves",mes:"Mayo",semana:3,pub:2,redes:["Instagram Feed","Facebook","X"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"El sanador — cuando el escenario sana de verdad",copy:"Hay obras que no entretienen — sanan. 🌿\n\nEL SANADOR\n\nUna historia sobre lo que no se ve, sobre lo que cargamos sin saberlo,\nsobre el poder de soltar y seguir.\n\nTeatro que llega a lugares donde pocas cosas llegan.\n\n📍 La Teatrería\n🗓️ Sábados 6 y 8:30pm\n🎟️ Reserva en teatrando.com.mx\n\n#Teatrando #ElSanador #TeatroCDMX #ObrasDeCDMX #TeatroDeDrama",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s3_09",fecha:"Vie 15",dia:"Viernes",mes:"Mayo",semana:3,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P6 – Cultura",formato:"Carrusel",tipo:"",resenaId:"",tema:"Día del Maestro — Maestros del teatro que formaron generaciones",copy:"Hoy, Día del Maestro, los celebramos. 🎭\n\nMAESTROS DEL TEATRO QUE FORMARON GENERACIONES:\n🎭 Luis de Tavira — disciplina y amor por el escenario\n🎭 Sargenti — el maestro de los maestros\n🎭 Héctor Mendoza — teatro es verdad y presencia\n\nSu legado vive en cada función. ✨\n\n#Teatrando #DiadelMaestro #TeatroCDMX #15DeMayo",cta:"teatrando.com.mx",estado:"Pendiente",notas:"POST ESPECIAL DÍA DEL MAESTRO. Diseño de referencia disponible.",disenho:"para_disenar"},

  {id:"may_s3_10",fecha:"Vie 15",dia:"Viernes",mes:"Mayo",semana:3,pub:2,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"ESTRENO",resenaId:"",tema:"ESTA NOCHE — La Cantadera en Foro Stelaris",copy:"ESTA NOCHE 🎶\nLA CANTADERA\n\nViernes 15 de mayo\n🕙 Puertas: 9:30pm · Show: 10:30pm\n📍 Foro Stelaris\n\nUna experiencia musical que te va a mover por dentro.\nArte en vivo en uno de los foros más únicos de CDMX.\n\nSi vas esta noche — cuéntanos todo después 🙌\n🎟️ teatrando.com.mx\n\n#Teatrando #LaCantadera #ForoStelaris #TeatroCDMX #MusicaEnVivo",cta:"teatrando.com.mx",estado:"Pendiente",notas:"EVENTO ESPECIAL — 15 de mayo (Foro Stelaris)",disenho:""},

  {id:"may_s3_11",fecha:"Sáb 16",dia:"Sábado",mes:"Mayo",semana:3,pub:1,redes:["Instagram Reels","TikTok","YouTube Shorts"],pilar:"P1 – Curaduría",formato:"Reel",tipo:"RESENA",resenaId:"",tema:"El enfermo imaginario — Reseña Teatrando (últimas funciones)",copy:"ESTA NOCHE 🎸\nONE VISION OF QUEEN\n\nJueves 14 de mayo · 8pm · Pepsi Center WTC\n\nQueen en vivo. Una noche que no se olvida.\n\n🎟️ teatrando.com.mx\n\n#Teatrando #OneVisionOfQueen #TeatroCDMX",cta:"Teatrando.com.mx",estado:"Pendiente",notas:"ÚLTIMAS FUNCIONES — termina 16 de mayo",disenho:""},

  {id:"may_s3_12",fecha:"Sáb 16",dia:"Sábado",mes:"Mayo",semana:3,pub:2,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"ESTRENO",resenaId:"",tema:"ESTRENO — Penelogías arranca este sábado",copy:"ESTRENO ESTA SEMANA\nPENELOGÍAS\n\nArranca este sábado 16 de mayo en el escenario.\n\nUna propuesta fresca que llega para quedarse.\nTeatro que cuestiona, divierte y sorprende.\n\n📍 Foro Sylvia Pasquel\n🗓️ Sábados 8:30pm · A partir del 16 de mayo\n🎟️ Reserva ya en teatrando.com.mx\n\n#Teatrando #Penelogias #EstrenoTeatro #TeatroCDMX #ObrasDeCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"ESTRENO — arranca 16 de mayo",disenho:""},

  {id:"may_s3_13",fecha:"Dom 17",dia:"Domingo",mes:"Mayo",semana:3,pub:1,redes:["Instagram Feed","Facebook","X"],pilar:"P2 – Planes",formato:"Carrusel",tipo:"",resenaId:"",tema:"Cartelera de domingo — elige tu plan de hoy",copy:"¿Ya tienes tu plan de domingo? 🎭\n\nPARA ADULTOS:\n😂 Tripas Corazón · 7pm · Foro Coyoacanense\n🎵 Frida Kahlo el Musical · 6pm · Coyoacán\n🔍 Un muerto en el baúl · 6:30pm · Danzite\n\nPARA FAMILIA:\n👸 Princesas Monster · 1:30pm\n🌳 El reino · 1:30pm · T. Enrique Elizalde\n🎵 Cri Cri · 1pm · Teatro Hidalgo\n\n🎟️ teatrando.com.mx\n\n#Teatrando #TeatroCDMX #PlanDomingo",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s3_14",fecha:"Dom 17",dia:"Domingo",mes:"Mayo",semana:3,pub:2,redes:["Instagram Feed","Facebook","Instagram Stories","Facebook Stories"],pilar:"P3 – Experiencia",formato:"Carrusel",tipo:"",resenaId:"",tema:"Teatro inmersivo — Nuestro mundo maravilloso y Alberto y el sueño",copy:"Teatro inmersivo en CDMX ✨\n\n🌍 NUESTRO MUNDO MARAVILLOSO\nNo son espectadores — son parte de la historia.\n\n🌙 ALBERTO Y EL SUEÑO\n45 minutos que te dejan pensando mucho más.\n\n📍 Casa Fuerte · Vie-Sáb-Dom por línea\n🎟️ teatrando.com.mx\n\n#Teatrando #TeatroInmersivo #TeatroCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

// ═══════════════════════════════════════════════════════
// SEMANA 4: Lun 18 – Dom 24
// ═══════════════════════════════════════════════════════
  {id:"may_s4_01",fecha:"Lun 18",dia:"Lunes",mes:"Mayo",semana:4,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P1 – Curaduría",formato:"Carrusel",tipo:"RECOMENDACION",resenaId:"",tema:"Recomendación de la semana — El que se enamora pierde",copy:"LA RECOMENDACIÓN TEATRANDO DE ESTA SEMANA:\nEL QUE SE ENAMORA PIERDE\n\nYa lleva semanas en el escenario y el público no para de recomendarla.\n\nUna obra sobre lo que pasa cuando das todo por alguien\n— y lo que queda cuando ya no queda nada.\n\nComedia y drama en el balance exacto.\n\n📍 Nuevo Teatro Versalles\n🗓️ Jueves 8:30pm\n🎟️ Boletos en Teatrando.com.mx\n\n#Teatrando #ElQueSeEnamoraPierde #TeatroCDMX #ObrasDeCDMX #CarteleraCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s4_02",fecha:"Lun 18",dia:"Lunes",mes:"Mayo",semana:4,pub:2,redes:["Instagram Feed","Facebook"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"FRASE",resenaId:"",tema:"Frase de la semana — Peter Brook",copy:"El teatro es el único lugar donde puedes vivir diez vidas en una sola noche. 🎭✨\n— Peter Brook\n\nGuárdala y compártela con alguien que todavía no ha descubierto el teatro.\n\n#Teatrando #FraseDeTeatro #TeatroCDMX #ObrasDeCDMX",cta:"Guardar y compartir",estado:"Pendiente",notas:"",disenho:"para_disenar"},

  {id:"may_s4_03",fecha:"Mar 19",dia:"Martes",mes:"Mayo",semana:4,pub:1,redes:["Instagram Reels","TikTok","YouTube Shorts"],pilar:"P1 – Curaduría",formato:"Reel",tipo:"RESENA",resenaId:"",tema:"Oh Karen — Reseña Teatrando",copy:"RESEÑA TEATRANDO: OH KAREN, LA HISTORIA DE UNA GATA\n\n¿Qué pasaría si tu gata pudiera contarte todo lo que ha visto?\n\nOh Karen lleva la comedia a un territorio inesperado:\nuna gata con opiniones muy claras sobre los humanos que la rodean.\n\nOriginal. Divertida. Imposible de adivinar hacia dónde va.\n\n📍 Teatro Xola\n🗓️ Miércoles 8:30pm y Domingo 1pm\n🎟️ Lee la reseña completa en Teatrando.com.mx\n\n#Teatrando #OhKaren #TeatroCDMX #ReseñaTeatro #ObrasDeCDMX",cta:"Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s4_04",fecha:"Mar 19",dia:"Martes",mes:"Mayo",semana:4,pub:2,redes:["Instagram Feed","Facebook","X"],pilar:"P6 – Cultura",formato:"Carrusel",tipo:"",resenaId:"",tema:"Post cultural — Grandes productores que hicieron historia",copy:"Hoy, Día del Maestro, los celebramos. 🎭\n\nMAESTROS DEL TEATRO:\n🎭 Luis de Tavira — disciplina y amor por el escenario\n🎭 Sargenti — el maestro de los maestros\n🎭 Héctor Mendoza — teatro es verdad y presencia\n\nSu legado vive en cada función. ✨\n\n#Teatrando #DiadelMaestro #TeatroCDMX #15DeMayo",cta:"teatrando.com.mx",estado:"Pendiente",notas:"POST CULTURAL — Grandes productores. Diseño de referencia disponible.",disenho:"para_disenar"},

  {id:"may_s4_05",fecha:"Mié 20",dia:"Miércoles",mes:"Mayo",semana:4,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"Meme — Cuando mañana es función y tu cerebro a las 3am",copy:"Cuando mañana es función… 🎭\n\nY tu cerebro decide hacer esto a las 3am: 🐱\n\n\"REPASAR TODA LA OBRA\"\n\"¿Y si olvido el texto?\"\n\"¿Qué cara pongo en la escena 4?\"\n\"Debí haberme dormido hace 3 horas\"\n\nTodo el que ha estado en un escenario entiende esto perfectamente.\n\n¿Se lo mandas a alguien del elenco? 😂\n\n#Teatrando #TeatroCDMX #MemeTeatro #Actores #ObrasDeCDMX",cta:"teatrando.com.mx",estado:"Pendiente",notas:"MEME — Adaptación del meme 2 (gato 3am). Diseño de referencia disponible.",disenho:"para_disenar"},

  {id:"may_s4_06",fecha:"Mié 20",dia:"Miércoles",mes:"Mayo",semana:4,pub:2,redes:["Instagram Feed","Facebook","X"],pilar:"P2 – Planes",formato:"Post estático",tipo:"",resenaId:"",tema:"Hasta que la mafia nos separe — domingo de comedia",copy:"¿A quién no le ha tocado una familia que parece de película? 😂\n\nHASTA QUE LA MAFIA NOS SEPARE\n\nComedia absurda, situaciones imposibles y un elenco que da todo en escena.\nEl plan perfecto para reírse con quien más quieras.\n\n📍 Teatro Xola\n🗓️ Domingos 6pm\n🎟️ Reserva en teatrando.com.mx\n\n#Teatrando #HastaQueLaMafiaNosSepare #TeatroCDMX #ObrasDeCDMX #ComediaCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s4_07",fecha:"Jue 21",dia:"Jueves",mes:"Mayo",semana:4,pub:1,redes:["Instagram Reels","TikTok","YouTube Shorts"],pilar:"P1 – Curaduría",formato:"Reel",tipo:"RESENA",resenaId:"",tema:"Dani y el profundo mar azul — Reseña Teatrando (últimas funciones)",copy:"RESEÑA TEATRANDO: DANI Y EL PROFUNDO MAR AZUL\n\nHay obras que llegan cuando las necesitas.\nDani y el profundo mar azul es una de esas.\n\nUna historia sobre lo que nos hunde y lo que nos salva.\nSobre encontrar algo a lo que aferrarse cuando todo parece perdido.\n\nÚltimas funciones. No la dejes ir.\n\n📍 La Teatrería\n🗓️ Miércoles 8:30pm · HASTA EL 15 DE MAYO (ya terminó en teatro pero puede haber funciones especiales)\n🎟️ Consulta disponibilidad en Teatrando.com.mx\n\n#Teatrando #DaniYElProfundoMarAzul #TeatroCDMX #ReseñaTeatro #ObrasDeCDMX",cta:"Teatrando.com.mx",estado:"Pendiente",notas:"Termina 15 de mayo — verificar si hay funciones especiales",disenho:""},

  {id:"may_s4_08",fecha:"Jue 21",dia:"Jueves",mes:"Mayo",semana:4,pub:2,redes:["Instagram Feed","Facebook","X"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"Un muerto en el baúl — suspenso en Danzite",copy:"GRANDES PRODUCTORES QUE HICIERON HISTORIA 🎭\n\n🎭 Morris Gilbert — creyó en el talento mexicano\n🎭 Alejandro Gou — teatro con visión y riesgo\n🎭 Juan Torres Delgado — fundó los proyectos más importantes\n\nSu pasión, nuestro escenario. ✨\n\n#Teatrando #TeatroCDMX #CulturaTeatro",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s4_09",fecha:"Vie 22",dia:"Viernes",mes:"Mayo",semana:4,pub:1,redes:["Instagram Feed","Facebook","X"],pilar:"P2 – Planes",formato:"Carrusel",tipo:"",resenaId:"",tema:"Cartelera del fin — semana 4 de mayo",copy:"¿Ya tienes tu plan? 🎭\n\nPARA PAREJA:\n🎵 Malinche · Frontón México · Sáb-Dom\n🎵 Notre Dame · Teatro Rafael Solana · Sáb\n💔 Nos amábamos tanto · Casa Fuerte\n\nPARA AMIGOS:\n😂 Siempre las prefieren cabronas · Sáb 5:30pm\n🔍 Un muerto en el baúl · Sáb 8:45pm\n😂 Tripas Corazón · Vie-Sáb 8pm\n\nPARA FAMILIA:\n👸 Princesas Monster · Dom 1:30pm\n🌳 El reino · Dom 1:30pm\n\n🎟️ teatrando.com.mx\n\n#Teatrando #TeatroCDMX #PlanFinDeSemana",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s4_10",fecha:"Vie 22",dia:"Viernes",mes:"Mayo",semana:4,pub:2,redes:["Instagram Stories","Facebook Stories"],pilar:"P4 – Servicio",formato:"Story interactiva",tipo:"ALERTA PROMO",resenaId:"",tema:"Alerta — obras con pocas fechas en mayo",copy:"ALERTA BOLETOS 🚨\n\nEstas obras tienen pocas fechas restantes en mayo:\n\n⏰ El enfermo imaginario → ya terminó\n⏰ Dani y el profundo mar azul → consulta disponibilidad\n⏰ Maduras solteras y desesperadas → función única ya pasó\n\nNo dejes para después lo que puedes reservar hoy.\nEscríbenos por WhatsApp y te ayudamos.\n\n#Teatrando #TeatroCDMX #ObrasDeCDMX",cta:"WhatsApp para dudas",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s4_11",fecha:"Sáb 23",dia:"Sábado",mes:"Mayo",semana:4,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P3 – Experiencia",formato:"Carrusel",tipo:"5 RAZONES",resenaId:"",tema:"5 razones para ver Malinche el Musical",copy:"5 RAZONES PARA VER MALINCHE EL MUSICAL\n\n1. La historia de México recontada desde adentro — sin los clichés de siempre\n\n2. Producción de nivel internacional en el escenario más imponente de la ciudad: Frontón México\n\n3. Música, danza y teatro integrados en una experiencia que no se divide en partes\n\n4. Miércoles 8pm · Jue-Vie 8pm · Sáb-Dom 1pm y 5pm — múltiples horarios para armar tu plan\n\n5. Una obra que divide opiniones, genera conversación y hace exactamente lo que el teatro tiene que hacer\n\n🎟️ Reserva en Teatrando.com.mx\n\n#Teatrando #MalinchElMusical #TeatroCDMX #ObrasDeCDMX #FrontonMexico",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s4_12",fecha:"Sáb 23",dia:"Sábado",mes:"Mayo",semana:4,pub:2,redes:["Instagram Feed","Facebook","X"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"Lo que callamos las suegras — comedia en Foro Coapa",copy:"Lo que las suegras nunca dicen en voz alta… 👀\n\nLO QUE CALLAMOS LAS SUEGRAS\n\nComedia que te hará reír de lo que normalmente no puedes decir.\nPersonajes reconocibles, situaciones reales y actuaciones que no dan tregua.\n\nPerfecta para ir en familia — o no.\n\n📍 Foro Coapa\n🗓️ Sábados 6pm · Domingos 7pm\n🎟️ Reserva en teatrando.com.mx\n\n#Teatrando #LoQueCallamosLasSuegras #TeatroCDMX #ObrasDeCDMX #ComediaCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s4_13",fecha:"Dom 24",dia:"Domingo",mes:"Mayo",semana:4,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"Meme — Las máscaras del teatro",copy:"Las máscaras del teatro:\n\n😊 Esta obra me hizo reír\n💔 No estaba listo para esto\n\nA veces no sabes cuál vas a necesitar hasta que se levanta el telón.\n\n¿Cuál te tocó la última vez? 👇\n\nEncuentra tu próxima obra en teatrando.com.mx\n\n#Teatrando #TeatroCDMX #MemeTeatro #ObrasDeCDMX #MascarasDelTeatro",cta:"teatrando.com.mx",estado:"Pendiente",notas:"MEME — Adaptación del meme 4 (máscaras). Diseño de referencia disponible.",disenho:"para_disenar"},

  {id:"may_s4_14",fecha:"Dom 24",dia:"Domingo",mes:"Mayo",semana:4,pub:2,redes:["Instagram Feed","Facebook","Instagram Stories","Facebook Stories"],pilar:"P5 – Prueba social",formato:"Post estático",tipo:"",resenaId:"",tema:"Interacción — ¿Con quién irías al teatro?",copy:"Una pregunta importante para este domingo: 🎭\n\n¿Con quién irías al teatro esta semana?\n\na) 💑 Con mi pareja — plan romántico garantizado\nb) 👯 Con mis amigos — la mejor noche del mes\nc) 🎭 Solo — porque el teatro también es para uno\nd) 👨‍👩‍👧 En familia — recuerdos que duran para siempre\n\nResponde en los comentarios y organiza el plan 👇\nTeatrando.com.mx tiene la obra perfecta para cada opción.\n\n#Teatrando #TeatroCDMX #ObrasDeCDMX #PlanesCDMX #QueHacerEnCDMX",cta:"teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

// ═══════════════════════════════════════════════════════
// SEMANA 5: Lun 25 – Dom 31
// ═══════════════════════════════════════════════════════
  {id:"may_s5_01",fecha:"Lun 25",dia:"Lunes",mes:"Mayo",semana:5,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P1 – Curaduría",formato:"Carrusel",tipo:"RECOMENDACION",resenaId:"",tema:"Recomendación de cierre — Nos amábamos tanto",copy:"LA RECOMENDACIÓN TEATRANDO DE CIERRE DE MAYO:\nNOS AMÁBAMOS TANTO\n\nSi aún no la has visto — esta última semana es tu oportunidad.\n\nUna de las obras más comentadas del mes.\nÍntima, honesta y con una actuación que no se olvida.\n\n📍 Casa Fuerte de Emilio el Indio Fernández\n🗓️ Viernes · Sábados · Domingos por línea\n🎟️ Boletos en Teatrando.com.mx\n\n#Teatrando #NosAmábamosTanto #TeatroCDMX #ObrasDeCDMX #CarteleraCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s5_02",fecha:"Lun 25",dia:"Lunes",mes:"Mayo",semana:5,pub:2,redes:["Instagram Reels","TikTok","YouTube Shorts"],pilar:"P1 – Curaduría",formato:"Reel",tipo:"RESENA",resenaId:"",tema:"Penelogías — Reseña Teatrando",copy:"RESEÑA TEATRANDO: PENELOGÍAS 🎭\n\nPenélope esperó. Tejió. Calló.\nPero ¿qué pensaba mientras esperaba?\n\nPenelogías reimagina un clásico desde una mirada completamente nueva.\n\n📍 Foro Sylvia Pasquel · Sáb 8:30pm\n🎟️ Teatrando.com.mx\n\n#Teatrando #Penelogias #TeatroCDMX",cta:"Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s5_03",fecha:"Mar 26",dia:"Martes",mes:"Mayo",semana:5,pub:1,redes:["Instagram Reels","TikTok","YouTube Shorts"],pilar:"P1 – Curaduría",formato:"Reel",tipo:"RESENA",resenaId:"",tema:"Santas y perversas — Reseña Teatrando",copy:"RESEÑA TEATRANDO: SANTAS Y PERVERSAS\n\nHay mujeres que parecen santas. Hay mujeres que parecen perversas.\nY luego están las que son ambas cosas — y lo saben perfectamente.\n\nSantas y perversas es una comedia que celebra la complejidad femenina sin disculparse por ello.\n\nDivertida, provocadora y completamente honesta.\n\n📍 Teatro Enrique Lizalde\n🗓️ Domingos 6:30pm\n🎟️ Lee la reseña completa en Teatrando.com.mx\n\n#Teatrando #SantasYPerversas #TeatroCDMX #ReseñaTeatro #ObrasDeCDMX",cta:"Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s5_04",fecha:"Mar 26",dia:"Martes",mes:"Mayo",semana:5,pub:2,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"Notre Dame de París — la épica musical del mes",copy:"Hay obras que no se ven — se viven. 🎵\n\nNOTRE DAME DE PARÍS\n\nAmor, tragedia y una música que se te queda para siempre.\nUna producción que demuestra que el teatro musical puede quitar el aliento.\n\n📍 Teatro Rafael Solana\n🗓️ Sábados 6 y 8:30pm\n🎟️ Reserva en teatrando.com.mx\n\n#Teatrando #NotreDameDeParis #TeatroCDMX #MusicalCDMX #ObrasDeCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s5_05",fecha:"Mié 27",dia:"Miércoles",mes:"Mayo",semana:5,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"Meme — Haz el teatro, no la guerra",copy:"HAZ EL TEATRO ❤️\nNO LA GUERRA\n\nEl escenario tiene espacio para todos. 🎭\n\nEste fin de semana, elige una butaca y déjate llevar.\nToda la cartelera en teatrando.com.mx\n\n#Teatrando #TeatroCDMX #ObrasDeCDMX #QueHacerEnCDMX",cta:"teatrando.com.mx",estado:"Pendiente",notas:"",disenho:"para_disenar"},

  {id:"may_s5_06",fecha:"Mié 27",dia:"Miércoles",mes:"Mayo",semana:5,pub:2,redes:["Instagram Feed","Facebook","X"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"Frida Kahlo el Musical — icono en el escenario",copy:"Pies, ¿para qué los quiero si tengo alas para volar? ✨\n— Frida Kahlo\n\n🎵 FRIDA KAHLO EL MUSICAL\n\nNo es solo la historia de Frida — es su universo en el escenario.\nSu dolor convertido en música. Su arte en movimiento. 🎨\n\n📍 Teatro Centenario Coyoacán\n🗓️ Sábados 5 y 7:30pm · Domingos 6pm\n🎟️ Reserva en teatrando.com.mx\n\n#Teatrando #FridaKahloElMusical #TeatroCDMX #ObrasDeCDMX #MusicalCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s5_07",fecha:"Jue 28",dia:"Jueves",mes:"Mayo",semana:5,pub:1,redes:["Instagram Reels","TikTok","YouTube Shorts"],pilar:"P1 – Curaduría",formato:"Reel",tipo:"RESENA",resenaId:"",tema:"Madre mía — Reseña Teatrando",copy:"RESEÑA TEATRANDO: MADRE MÍA\n\nHay una relación que no se puede explicar — solo se puede sentir.\n\nMadre Mía lleva al escenario algo que todos hemos vivido:\nla complejidad de querer a alguien que es perfectamente imperfecto.\n\nComedia y ternura en el balance exacto.\nUna obra para ir con mamá — o para entenderla un poco mejor.\n\n📍 Teatro Varsovia\n🗓️ Jueves 8pm · Viernes 7 y 9pm · Sábados 6 y 8pm\n🎟️ Lee la reseña completa en Teatrando.com.mx\n\n#Teatrando #MadreMia #TeatroCDMX #ReseñaTeatro #ObrasDeCDMX",cta:"Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s5_08",fecha:"Jue 28",dia:"Jueves",mes:"Mayo",semana:5,pub:2,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"",resenaId:"",tema:"Sor-presas Amén — comedia que llena el teatro semana a semana",copy:"Semanas en cartelera y el teatro sigue lleno. 🎭\n\nSOR-PRESAS AMÉN\n\nLa comedia que logra lo más difícil: hacer reír a todos,\nsin importar de dónde vengas ni qué tan fácil o difícil te caigan las bromas.\n\nHumor con corazón. Y mucho, mucho teatro.\n\n📍 Teatro Hidalgo\n🗓️ Viernes 8:30pm · Sábados 6 y 8:30pm · Domingos 6pm\n🎟️ Reserva en teatrando.com.mx\n\n#Teatrando #SorpresasAmen #TeatroCDMX #ObrasDeCDMX #ComediaCDMX",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s5_09",fecha:"Vie 29",dia:"Viernes",mes:"Mayo",semana:5,pub:1,redes:["Instagram Feed","Facebook","X"],pilar:"P2 – Planes",formato:"Carrusel",tipo:"",resenaId:"",tema:"Cartelera de cierre — último fin de semana de mayo",copy:"Último fin de semana de mayo. ¿Qué vas a ver? 🎭\n\nPARA PAREJA:\n🎵 Malinche · Frontón México · Sáb-Dom\n🎵 Notre Dame · Teatro Rafael Solana · Sáb\n🎵 Frida Kahlo · Coyoacán · Sáb-Dom\n\nPARA AMIGOS:\n😂 Sor-presas Amén · Teatro Hidalgo\n😂 Tripas Corazón · Foro Coyoacanense\n\nPARA FAMILIA:\n👸 Princesas Monster · Dom 1:30pm\n🎵 Cri Cri · Sáb-Dom 1pm\n\n🎟️ teatrando.com.mx\n\n#Teatrando #TeatroCDMX #CierreMayo",cta:"Compra en Teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s5_10",fecha:"Vie 29",dia:"Viernes",mes:"Mayo",semana:5,pub:2,redes:["Instagram Feed","Facebook","X"],pilar:"P5 – Prueba social",formato:"Post estático",tipo:"",resenaId:"",tema:"Lo que dice el público — las más recomendadas de mayo",copy:"El público ha hablado este mayo. 🎭\n\nLAS MÁS RECOMENDADAS DEL MES:\n\n⭐ \"Nos amábamos tanto me dejó sin palabras. Teatro de verdad.\"\n⭐ \"Fui a Siempre los hombres las prefieren cabronas y no paré de reír.\"\n⭐ \"Malinche es la producción del año. Punto.\"\n⭐ \"La Cantadera fue una experiencia que no esperaba — completamente diferente.\"\n⭐ \"El que se enamora pierde me llegó exactamente donde tenía que llegar.\"\n\n¿Fuiste a alguna? Cuéntanos en los comentarios 👇\nY si no — el fin de semana todavía está disponible.\n🎟️ teatrando.com.mx\n\n#Teatrando #TeatroCDMX #LoDiceElPublico #ObrasDeCDMX #RecomendacionesTeatro",cta:"teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s5_11",fecha:"Sáb 30",dia:"Sábado",mes:"Mayo",semana:5,pub:1,redes:["Instagram Feed","Facebook"],pilar:"P3 – Experiencia",formato:"Post estático",tipo:"FRASE",resenaId:"",tema:"Frase de cierre de mayo",copy:"El teatro existe porque la vida no es suficiente. 🎭✨\n— Fernando Arrabal\n\nMayo cerró el telón con el corazón lleno.\nGracias por elegirnos. Junio ya viene. 🙌\n\n#Teatrando #TeatroCDMX #FraseDeTeatro #CierreDeMayo #ObrasDeCDMX",cta:"Seguir en redes",estado:"Pendiente",notas:"",disenho:"para_disenar"},

  {id:"may_s5_12",fecha:"Sáb 30",dia:"Sábado",mes:"Mayo",semana:5,pub:2,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P2 – Planes",formato:"Carrusel",tipo:"",resenaId:"",tema:"Adelanto junio — esto viene el próximo mes",copy:"JUNIO EN TEATRANDO 🎭\n\nMayo cerró. Junio ya se asoma con obras que vienen con todo:\n\n🎭 La Dama de Negro continúa · Teatro 11 de Julio\n🎭 Malinche el Musical continúa · Frontón México\n🎭 Notre Dame de París continúa · Teatro Rafael Solana\n🎭 Las heridas del viento continúa · Teatro Milán\n🎭 Solamente una vez continúa · Casa Fuerte\n🎭 Y más estrenos por confirmar…\n\nSíguenos para la cartelera completa de junio.\n🎟️ teatrando.com.mx\n\n#Teatrando #TeatroCDMX #AdelantoJunio #CarteleraCDMX #ObrasDeCDMX",cta:"Seguir en redes",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s5_13",fecha:"Dom 31",dia:"Domingo",mes:"Mayo",semana:5,pub:1,redes:["Instagram Feed","Facebook","X","Instagram Stories","Facebook Stories"],pilar:"P1 – Curaduría",formato:"Post estático",tipo:"",resenaId:"",tema:"Cierre de mayo — gracias por un mes de teatro",copy:"Mayo cerró el telón. 🎭\n\nFue un mes de comedias que dolieron de tanto reír,\nde dramas que tocaron donde nadie esperaba,\nde musicales que quitaron el aliento\ny de familias, parejas y amigos que eligieron el teatro como su plan.\n\nGracias por elegirnos.\nGracias por confiarle sus noches y domingos a Teatrando.\n\nJunio ya viene — y viene con más. ✨\n\nteatrando.com.mx\n\n#Teatrando #TeatroCDMX #CierreMayo #ObrasDeCDMX #CarteleraCDMX",cta:"Seguir en redes",estado:"Pendiente",notas:"",disenho:""},

  {id:"may_s5_14",fecha:"Dom 31",dia:"Domingo",mes:"Mayo",semana:5,pub:2,redes:["Instagram Feed","Facebook","Instagram Stories","Facebook Stories"],pilar:"P5 – Prueba social",formato:"Post estático",tipo:"",resenaId:"",tema:"Interacción final — ¿Cuál fue tu obra de mayo?",copy:"Mayo se va y nos lleva los mejores recuerdos. 🎭\n\n¿Cuál fue la obra que más te marcó este mes?\n\na) Una comedia que todavía me hace reír\nb) Un drama que no esperaba y me sorprendió\nc) Un musical que no puedo sacarme de la cabeza\nd) Aún no fui — pero junio ya está en el calendario\n\nCuéntanos en los comentarios 👇\nY si tienes foto de tu visita al teatro este mes — etiquétanos.\n\n#Teatrando #TeatroCDMX #Mayo2026 #ObrasDeCDMX #TeatroEnCDMX",cta:"teatrando.com.mx",estado:"Pendiente",notas:"",disenho:""}
];


const POLL_INTERVAL = 4000;

async function saveData(data) {
  try {
    await fetch('/api/data', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({data: JSON.stringify(data)})
    });
  } catch(e) { console.warn("save error", e); }
}

async function loadData() {
  try {
    const res = await fetch('/api/data');
    const json = await res.json();
    if (json.data) return JSON.parse(json.data);
  } catch(e) { console.warn("load error", e); }
  return null;
}

const BRIEFINGS_INIT = {"Mayo":"📌 LÍNEA EDITORIAL MAYO 2026\n\n🎯 OBJETIVO\n• Generar engagement orgánico\n• Posicionar marca como referente teatral\n• Convertir a WhatsApp (ventas) 👉 alineado al modelo de negocio\n\n📅 ENFOQUE POR SEMANA\nS1 (1–3 may): Arranque cultural + cartelera fin de semana.\nS2 (4–10 may): Día de las Madres.\nS3 (11–17 may): Día del Maestro + One Vision of Queen.\nS4 (18–24 may): Venta fuerte + curaduría + memes.\nS5 (25–31 may): Cierre de mes + adelanto junio."}

let _historial = [];
const regCambio = (id,campo,ant,nuevo) => {
  _historial = [{ts:new Date().toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),id,campo,anterior:typeof ant==="object"?JSON.stringify(ant):String(ant),nuevo:typeof nuevo==="object"?JSON.stringify(nuevo):String(nuevo)},..._historial].slice(0,300);
  return [..._historial];
};

async function callClaude(prompt,maxTokens=1200){
  const r=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:maxTokens,messages:[{role:"user",content:prompt}]})
  });
  const d=await r.json();
  return d.content?.[0]?.text||"";
}

async function generarCopyIA(item,obras=[]){
  const ctx=obras.length>0?`\nObras en cartelera (${obras.length} totales): ${obras.map(o=>o.titulo+(o.teatro?` — ${o.teatro}`:"")+(o.dia?` (${o.dia})`:"")).join(", ")}`:"";
  const prompt="Eres el community manager de Teatrando CDMX. Voz: cercana, entusiasta, confiable."+ctx+"\nGenera un copy DIFERENTE y CREATIVO para:\n- Pilar: "+item.pilar+"\n- Tema: "+item.tema+"\n- Formato: "+item.formato+"\n- Redes: "+(item.redes||[]).join(", ")+"\nREGLAS: Hook potente primera linea, beneficio en 2 segundos, frases cortas, emojis relevantes, maximo 6 lineas, cierre con urgencia suave.\nDevuelve SOLO el copy.";
  return await callClaude(prompt);
}

async function generarResenaIA(r,obrasCtx=[]){
  const od=obrasCtx.find(o=>o.titulo===r.obra)||{};
  const prompt="Eres critico teatral de Teatrando CDMX. Genera una resena breve para redes sociales.\nObra: "+r.obra+"\nGenero: "+(r.genero||od.genero||"Teatro")+(od.descripcion?"\nDescripcion: "+od.descripcion:"")+"\nDevuelve SOLO un JSON (sin markdown): {\"titulo\":\"max 8 palabras\",\"gancho\":\"max 15 palabras\",\"copy\":\"max 6 lineas con emojis\"}";
  const txt=await callClaude(prompt,600);
  try{const c=txt.replace(/```json|```/g,"").trim();return JSON.parse(c);}
  catch(e){return{titulo:`Reseña: ${r.obra}`,gancho:"Una obra que no te puedes perder.",copy:`📖 ${r.obra}\n\nUna propuesta que vale la pena ver este mes en CDMX.\nLee la reseña completa en Teatrando.com.mx`};}
}

export default function App() {
  const isMounted = useRef(true);
  const [parrillas, setParrillas] = useState({"Mayo": buildMayo()});
  const [resenas, setResenas] = useState({"Mayo": []});
  const [briefings, setBriefings] = useState(BRIEFINGS_INIT);
  const [mesesDisp, setMesesDisp] = useState(["Mayo"]);
  const [mesActivo, setMesActivo] = useState("Mayo");
  const [mesExp, setMesExp] = useState(null);
  const [semanaActiva, setSemanaActiva] = useState(1);
  const [cardAbierta, setCardAbierta] = useState(null);
  const [filtros, setFiltros] = useState({pilar:"Todos",formato:"Todos",red:"Todas"});
  const [vista, setVista] = useState("parrilla");
  const [vistaCliente, setVistaCliente] = useState("parrilla");
  const [notifMsg, setNotifMsg] = useState("");
  const [historial, setHistorial] = useState([]);
  const [generando, setGenerando] = useState({});
  const [restaurando, setRestaurando] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState("idle");
  const [lastRefresh, setLastRefresh] = useState("");
  const [modoCliente, setModoCliente] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState(false);
  const [modalAgregarDia, setModalAgregarDia] = useState(false);
  const [nuevoDiaForm, setNuevoDiaForm] = useState({fecha:"",dia:"Lunes",semana:1,numPubs:2,tipo:""});
  const [editandoBriefing, setEditandoBriefing] = useState(false);
  const [guiaTab, setGuiaTab] = useState("flujo");
  const [guiaEditando, setGuiaEditando] = useState(null);
  const [guiaEditVal, setGuiaEditVal] = useState({});
  const [guiaNuevoVal, setGuiaNuevoVal] = useState({});
  const [guiaAgregando, setGuiaAgregando] = useState(null);
  const [guia, setGuia] = useState({
    flujo:[
      {paso:"Semana 1",descripcion:"Apertura del mes",responsable:"Admin",cuando:"Lun-Mié",porque:"Establecer tono editorial",contenidos:[]},
      {paso:"Semana 2",descripcion:"Construcción de cartelera familiar",responsable:"Admin",cuando:"Lun-Mié",porque:"Foco Día del Niño",contenidos:[]},
      {paso:"Semana 3",descripcion:"Especial Día del Niño",responsable:"Admin",cuando:"Lun-Mié",porque:"Pico de demanda familiar",contenidos:[]},
      {paso:"Semana 4",descripcion:"Cierre y conversión",responsable:"Admin",cuando:"Lun-Mié",porque:"Urgencia de cierre de mes",contenidos:[]},
      {paso:"Semana 5",descripcion:"Últimos días y adelanto Mayo",responsable:"Admin",cuando:"Lun-Jue",porque:"Transición y retención",contenidos:[]}
    ],
    timing:[
      {cuando:"Lunes–Martes",porque:"Planificación y reseñas",formatos:["Reel","Post estático"]},
      {cuando:"Miércoles–Jueves",porque:"Cartelera y planes",formatos:["Carrusel","Story interactiva"]},
      {cuando:"Viernes",porque:"Cartelera de fin",formatos:["Carrusel","Reel"]},
      {cuando:"Sábado–Domingo",porque:"Experiencia y prueba social",formatos:["Post estático","Story"]}
    ],
    arcoNarrativo:[
      {semana:1,contenido:"Apertura: Malinche + Frida + cartelera general"},
      {semana:2,contenido:"Escalada: Matilda + especial infantil + Paw Patrol"},
      {semana:3,contenido:"Clímax: Día del Niño + 31 Minutos + urgencia"},
      {semana:4,contenido:"Resolución: cierre + Las Leonas + balance del mes"},
      {semana:5,contenido:"Transición: últimas funciones + adelanto Mayo"}
    ],
    seriesPrioritarias:[
      {nombre:"Recomendación de la semana",color:"#059669",desc:"1 obra destacada por semana, lunes. Carrusel o post estático."},
      {nombre:"Reseña Teatrando",color:"#7c3aed",desc:"Martes. Reel o post. Vincula a resena web en Teatrando.com.mx."},
      {nombre:"3/5 Razones para verla",color:"#0891b2",desc:"Miércoles o jueves. Carrusel. Hook potente en portada."},
      {nombre:"Domingo en familia",color:"#C40803",desc:"Domingo. Carrusel con opciones del día por zona."},
      {nombre:"Frase de la semana",color:"#b45309",desc:"Lunes. Post estático. Siempre con 'guárdala y compártela'."}
    ],
    ejemplosFormato:[
      {tipo:"RECOMENDACION",nota:"Empieza con 'LA RECOMENDACIÓN TEATRANDO DE ESTA SEMANA:' en mayúsculas. Nombre de obra, descripción corta, horarios, teatro, CTA."},
      {tipo:"RESENA",nota:"Empieza con 'RESEÑA TEATRANDO: NOMBRE OBRA'. Máx 6 líneas. Cierra con 'Lee la reseña completa en Teatrando.com.mx'."},
      {tipo:"3 RAZONES",nota:"Portada: '3 RAZONES PARA VER [OBRA]'. Cada razón en slide. Cierre con CTA de reserva."},
      {tipo:"FRASE",nota:"Cita + autor. Siempre cierra con 'Guárdala y compártela'."},
      {tipo:"ESTRENO",nota:"'ESTRENO ESTA SEMANA' en mayúsculas. Nombre, fechas específicas, teatro, urgencia de reserva."}
    ],
    reglas:[
      {num:1,texto:"Hook potente en primera línea",detalle:"La primera línea debe capturar atención en 2 segundos. Sin preámbulos."},
      {num:2,texto:"Beneficio antes que información",detalle:"Primero el 'por qué te conviene', luego los detalles de horario/lugar."},
      {num:3,texto:"Un solo CTA por publicación",detalle:"Elige entre Teatrando.com.mx O WhatsApp. Nunca los dos en el mismo copy."},
      {num:4,texto:"Máximo 5 hashtags",detalle:"Siempre incluir #Teatrando. Resto según contexto: zona, género, audiencia."},
      {num:5,texto:"Frases cortas y escaneo visual",detalle:"Saltos de línea frecuentes. Evitar párrafos densos. Bullets cuando aplica."},
      {num:6,texto:"Urgencia suave al cierre",detalle:"'Hoy', 'este fin', 'últimas funciones', 'no te lo pierdas'. Sin presión agresiva."}
    ]
  });


  const parrilla = parrillas[mesActivo] || [];
  const resenasMes = resenas[mesActivo] || [];
  const briefingMes = briefings[mesActivo] || "";
  const semanasDelMes = [...new Set(parrilla.map(p=>p.semana))].sort((a,b)=>a-b);

  const notif=(msg)=>{setNotifMsg(msg);setTimeout(()=>setNotifMsg(""),2800);};

  // ── CARGA INICIAL desde storage ──
  useEffect(()=>{
    isMounted.current=true;
    (async()=>{
      const saved=await loadData();
      if(saved && isMounted.current){
        // Solo cargar si los datos son de Mayo
        const mesSaved = saved.mesesDisp?.[0];
        if(mesSaved === "Mayo" || !mesSaved){
          if(saved.parrillas) setParrillas(saved.parrillas);
          if(saved.resenas)   setResenas(saved.resenas);
          if(saved.briefings) setBriefings(saved.briefings);
          if(saved.mesesDisp) setMesesDisp(saved.mesesDisp);
          }
        // Si datos son de otro mes, ignorar y usar buildMayo()
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
        await saveData({parrillas,resenas,briefings,mesesDisp});
        if(isMounted.current) setSyncStatus("saved");
        setTimeout(()=>{ if(isMounted.current) setSyncStatus("idle"); },2000);
      }catch(e){
        if(isMounted.current) setSyncStatus("error");
      }
    },800); // debounce 800ms
    return()=>clearTimeout(t);
  },[parrillas,resenas,briefings,mesesDisp,dataLoaded]);

  // ── POLLING: refresca datos desde storage cada 4s (siempre activo) ──
  // El cliente ve los cambios del admin en tiempo real
  useEffect(()=>{
    const interval=setInterval(async()=>{
      // En modo admin no sobreescribir con datos viejos del storage
      // solo refrescar si no hay cambios locales recientes (syncStatus idle)
      if(modoCliente){
        // CLIENTE (modoCliente=true): siempre refresca desde storage
        const saved=await loadData();
        if(saved && isMounted.current){
          if(saved.parrillas) setParrillas(saved.parrillas);
          if(saved.resenas)   setResenas(saved.resenas);
          if(saved.briefings) setBriefings(saved.briefings);
          if(saved.mesesDisp) setMesesDisp(saved.mesesDisp);
          setLastRefresh(new Date().toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit",second:"2-digit"}));
        }
      }
      // ADMIN (modoCliente=false): no refresca, el guardado automático tiene prioridad
    },POLL_INTERVAL);
    return()=>clearInterval(interval);
  },[modoCliente]);

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
    const h=regCambio(id,campo,item[campo],valor);
    setHistorial(h);
    setParrillas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(p=>p.id===id?{...p,[campo]:valor}:p)}));
  };

  const toggleRed=(id,red)=>{
    const item=parrilla.find(p=>p.id===id);if(!item)return;
    const nv=item.redes.includes(red)?item.redes.filter(r=>r!==red):[...item.redes,red];
    const h=regCambio(id,"redes",item.redes,nv);setHistorial(h);
    setParrillas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(p=>p.id===id?{...p,redes:nv}:p)}));
  };

  const restaurarCambio=(entrada)=>{
    setParrillas(prev=>{
      const mes=Object.keys(prev).find(m=>prev[m].some(p=>p.id===entrada.id))||mesActivo;
      let val=entrada.anterior;try{val=JSON.parse(entrada.anterior);}catch(e){}
      return{...prev,[mes]:prev[mes].map(p=>p.id===entrada.id?{...p,[entrada.campo]:val}:p)};
    });
    setRestaurando(entrada.ts+"_"+entrada.id);setTimeout(()=>setRestaurando(null),1200);
    notif("↩ Cambio restaurado");
  };


  const handleGenerarCopy=async(item)=>{
    setGenerando(prev=>({...prev,[item.id]:true}));
    try{const nc=await generarCopyIA(item,[]);editarCampo(item.id,"copy",nc);notif("✨ Copy actualizado");}
    catch(e){notif("⚠ Error al generar copy");}
    setGenerando(prev=>({...prev,[item.id]:false}));
  };

  const handleGenerarResena=async(r)=>{
    setGenerando(prev=>({...prev,[r.id]:true}));
    try{
      const res=await generarResenaIA(r,[]);
      setResenas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(x=>x.id===r.id?{...x,...res}:x)}));
      notif(`✅ Reseña actualizada: ${r.obra}`);
    }catch(e){notif("⚠ Error al generar reseña");}
    setGenerando(prev=>({...prev,[r.id]:false}));
  };

  const handleAgregarDia=()=>{
    if(!nuevoDiaForm.fecha){notif("⚠ Escribe una fecha");return;}
    const pubs=[];
    for(let i=1;i<=nuevoDiaForm.numPubs;i++){
      pubs.push(buildPub({fecha:nuevoDiaForm.fecha,dia:nuevoDiaForm.dia,mes:mesActivo,semana:parseInt(nuevoDiaForm.semana),pub:i,...(nuevoDiaForm.tipo?{tipo:nuevoDiaForm.tipo}:{})}));
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
    setModalAgregarDia(false);setNuevoDiaForm({fecha:"",dia:"Lunes",semana:1,numPubs:2,tipo:""});
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
    setCardAbierta(null);notif("🗑 Publicación eliminada");
  };


  const handleAgregarResena=()=>{
    const nr=buildResena({semana:semanaActiva,obra:"Obra nueva"});
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
        <div style={{fontSize:36,fontWeight:900,color:"#C40803",letterSpacing:-1,textShadow:"0 0 24px rgba(196,8,3,0.9)"}}>🎭 Teatrando</div>
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
        <div style={{background:"linear-gradient(135deg,#C40803 0%,#8B0000 60%,#0a0a0a 100%)",padding:"16px 20px",borderBottom:"2px solid #C40803"}}>
          <div style={{maxWidth:900,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{fontSize:28,fontWeight:900,color:"#C40803",letterSpacing:-1,textShadow:"0 0 20px rgba(196,8,3,0.8)",marginRight:4}}>🎭 Teatrando</div>
                <div>
                  <div style={{fontSize:8,color:"rgba(255,255,255,0.6)",letterSpacing:3,textTransform:"uppercase",fontWeight:700}}>Propuesta de Contenido 2026</div>
                  <div style={{fontSize:22,fontWeight:900,letterSpacing:-0.5}}>TEATRANDO</div>
                </div>
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
            </div>
          </div>
        </div>

        <div style={{maxWidth:900,margin:"0 auto",padding:"16px 14px"}}>

          {/* ── SELECTOR DE MES (igual que admin) ── */}
          <div style={{marginBottom:14,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
            {mesesDisp.map(mes=>(
              <div key={mes} style={{position:"relative"}}>
                <button onClick={()=>{setMesActivo(mes);setMesExp(mes===mesExp?null:mes);if(mes!==mesActivo)setSemanaActiva(1);}}
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
                      <div key={p.id} style={{background:"#0d0d0d",border:p.disenho==="para_disenar"?"2px solid #C40803":p.disenho==="disenho_realizado"?"2px solid #059669":"1px solid #161616",borderLeft:`3px solid ${PILAR_COLOR[p.pilar]||"#333"}`,borderRadius:8,padding:"12px 14px",marginBottom:8}}>
                        {p.disenho==="para_disenar"&&(
                          <div style={{background:"#C40803",color:"#fff",fontSize:9,fontWeight:900,padding:"4px 12px",borderRadius:4,marginBottom:8,display:"flex",alignItems:"center",gap:6,letterSpacing:1,justifyContent:"space-between"}}>
                            <div style={{display:"flex",alignItems:"center",gap:6}}>
                              <span>Para disenar</span>
                            </div>
                            <button onClick={()=>editarCampo(p.id,"disenho","disenho_realizado")}
                              style={{background:"#fff",color:"#C40803",border:"none",borderRadius:4,padding:"2px 10px",fontSize:8,fontWeight:900,cursor:"pointer",letterSpacing:0.5}}>
                              Marcar como realizado
                            </button>
                          </div>
                        )}
                        {p.disenho==="disenho_realizado"&&(
                          <div style={{background:"#059669",color:"#fff",fontSize:9,fontWeight:900,padding:"4px 12px",borderRadius:4,marginBottom:8,display:"flex",alignItems:"center",gap:6,letterSpacing:1}}>
                            <span>Diseno realizado</span>
                          </div>
                        )}
                        <div style={{display:"flex",gap:5,marginBottom:6,flexWrap:"wrap",alignItems:"center"}}>
                          {p.tipo&&<div style={{display:"inline-flex",alignItems:"center",gap:4,background:TIPO_COLOR[p.tipo]||"#555",color:"#fff",padding:"3px 10px",borderRadius:4,fontSize:9,fontWeight:900,letterSpacing:1,marginBottom:6,textTransform:"uppercase"}}><span>{"RESENA"===p.tipo?"RESENA":"RECOMENDACION"===p.tipo?"RECOMEND.":p.tipo}</span></div>}
                          <span style={{fontSize:8,color:"#fff",background:PILAR_COLOR[p.pilar]||"#333",padding:"2px 8px",borderRadius:6,fontWeight:700}}>{p.pilar}</span>
                          <span style={{fontSize:8,color:"#666"}}>{p.formato}</span>
                          <span style={{marginLeft:"auto",fontSize:10,color:ec.color,background:ec.bg,padding:"3px 12px",borderRadius:20,border:`1.5px solid ${ec.color}`,fontWeight:900,letterSpacing:0.5}}>{p.estado}</span>
                        </div>
                        <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:p.resenaId?4:8}}>
                          {p.tipo==="RESENA"&&p.resenaId&&(resenas[mesActivo]||[]).find(x=>x.id===p.resenaId)
                            ?(resenas[mesActivo].find(x=>x.id===p.resenaId).titulo||p.tema)
                            :p.tema}
                        </div>
                        {p.tipo==="RESENA"&&p.resenaId&&(()=>{const r=(resenas[mesActivo]||[]).find(x=>x.id===p.resenaId);return null;})()}
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
                {resenasCliente.length} reseñas planificadas para {mesActivo} 
              </div>
              {[1,2,3,4].map(s=>{
                const rs=resenasCliente.filter(r=>r.semana===s);
                if(rs.length===0)return null;
                
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
  const handleEditPub = useCallback((id,campo,valor)=>{
    setParrillas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(p=>p.id===id?{...p,[campo]:valor}:p)}));
  },[mesActivo]);

  const handleEditRedes = useCallback((id,nv)=>{
    setParrillas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(p=>p.id===id?{...p,redes:nv}:p)}));
  },[mesActivo]);

  const filtrarPubs = useCallback((pubs)=>{
    return pubs.filter(p=>{
      if(p.semana!==semanaActiva)return false;
      if(filtros.pilar!=="Todos"&&p.pilar!==filtros.pilar)return false;
      if(filtros.formato!=="Todos"&&!p.formato.toLowerCase().includes(filtros.formato.toLowerCase().replace(" estático","").replace(" interactiva","")))return false;
      if(filtros.red!=="Todas"&&!(p.redes||[]).includes(filtros.red))return false;
      return true;
    });
  },[semanaActiva,filtros]);


  const editarCampo = useCallback((id,campo,valor)=>{
    setParrillas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(p=>p.id===id?{...p,[campo]:valor}:p)}));
  },[mesActivo]);

  const handleEliminarPub = useCallback((id)=>{
    setParrillas(prev=>({...prev,[mesActivo]:prev[mesActivo].filter(p=>p.id!==id)}));
    notif("Publicación eliminada");
  },[mesActivo,notif]);

  const toggleRed = useCallback((id,red)=>{
    setParrillas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(p=>{
      if(p.id!==id)return p;
      const redes=p.redes||[];
      return {...p,redes:redes.includes(red)?redes.filter(r=>r!==red):[...redes,red]};
    })}));
  },[mesActivo]);

  const handleGenerarResena = useCallback(async(r)=>{
    notif("Generando reseña...");
  },[notif]);

  const handleGenerarCopy = useCallback(async(p)=>{
    notif("Generando copy...");
  },[notif]);

  const handleAgregarSemana = useCallback(()=>{
    const maxSemana = Math.max(...(parrillas[mesActivo]||[]).map(p=>p.semana),0);
    notif(`Semana ${maxSemana+1} disponible`);
  },[mesActivo,parrillas,notif]);

  const handleAgregarDia = useCallback(()=>{
    notif("Agrega el día desde el formulario");
  },[notif]);

  const handleAgregarResena = useCallback(()=>{
    const nr={id:mkId("r"),semana:semanaActiva,obra:"Obra nueva",titulo:""};
    setResenas(prev=>({...prev,[mesActivo]:[...prev[mesActivo],nr]}));
    notif("✅ Reseña agregada");
  },[mesActivo,semanaActiva,notif]);


  return(
    <div style={{fontFamily:"Segoe UI,system-ui,sans-serif",background:"#060606",minHeight:"100vh",color:"#fff",paddingBottom:60}}>

      {/* Notificación flotante */}
      {notifMsg&&<div style={{position:"fixed",top:16,right:16,background:"#C40803",color:"#fff",padding:"8px 18px",borderRadius:20,fontSize:11,fontWeight:700,zIndex:9999,boxShadow:"0 4px 16px rgba(196,8,3,0.5)"}}>{notifMsg}</div>}

      {/* Modal agregar día */}
      {modalAgregarDia&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
          <div style={{background:"#111",border:"1px solid #C40803",borderRadius:12,padding:24,width:360,maxWidth:"90vw"}}>
            <div style={{fontSize:14,fontWeight:700,marginBottom:14}}>➕ Agregar publicación — {mesActivo}</div>

            {/* Tipo de contenido — selector visual */}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:1,marginBottom:6,fontWeight:700}}>Tipo de contenido</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {[{v:"",l:"General"},{v:"RESENA",l:"Reseña"},{v:"3 RAZONES",l:"3 Razones"},{v:"5 RAZONES",l:"5 Razones"},{v:"FRASE",l:"Frase semana"},{v:"RECOMENDACION",l:"Recomendación"},{v:"ESTRENO",l:"Estreno"},{v:"SI TE GUSTO",l:"Si te gusto X..."}].map(t=>(
                  <button key={t.v} onClick={()=>setNuevoDiaForm(p=>({...p,tipo:t.v}))}
                    style={{padding:"4px 10px",borderRadius:16,fontSize:9,fontWeight:700,cursor:"pointer",
                      background:nuevoDiaForm.tipo===t.v?(TIPO_COLOR[t.v]||"#C40803"):"#0d0d0d",
                      color:"#fff",
                      border:nuevoDiaForm.tipo===t.v?`2px solid ${TIPO_COLOR[t.v]||"#C40803"}`:"1.5px solid #222"}}>
                    {t.l}
                  </button>
                ))}
              </div>
              {nuevoDiaForm.tipo&&(
                <div style={{marginTop:6,fontSize:8,color:TIPO_COLOR[nuevoDiaForm.tipo]||"#C40803",fontWeight:700}}>
                  Tipo seleccionado: {nuevoDiaForm.tipo}
                </div>
              )}
            </div>

            {/* Campos del día */}
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
      <div style={{background:"linear-gradient(135deg,#C40803 0%,#7f0000 50%,#0a0a0a 100%)",padding:"18px 20px 14px",borderBottom:"2px solid #C40803"}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{fontSize:28,fontWeight:900,color:"#C40803",letterSpacing:-1,textShadow:"0 0 20px rgba(196,8,3,0.8)",marginRight:4}}>🎭 Teatrando</div>
              <div>
                <div style={{fontSize:8,color:"rgba(255,255,255,0.6)",letterSpacing:3,textTransform:"uppercase",fontWeight:700}}>Sistema de Contenido · Admin</div>
                <div style={{fontSize:22,fontWeight:900,letterSpacing:-0.5}}>TEATRANDO</div>
              </div>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
              {/* Mix 70/20/10 */}
              {[{l:"Eng/Plan/Exp",v:mix.p123,t:70},{l:"Servicio",v:mix.p4,t:20},{l:"Cult/Social",v:mix.p56,t:10}].map(m=>(
                <div key={m.l} style={{background:"rgba(0,0,0,0.35)",borderRadius:7,padding:"3px 9px",border:`1px solid ${Math.abs(m.v-m.t)<=5?"#22c55e":"#C40803"}40`}}>
                  <div style={{fontSize:7,color:"rgba(255,255,255,0.5)"}}>{m.l}</div>
                  <div style={{fontSize:12,fontWeight:900,color:Math.abs(m.v-m.t)<=5?"#22c55e":"#f59e0b"}}>{m.v}%<span style={{fontSize:7,opacity:0.5,marginLeft:2}}>/{m.t}%</span></div>
                </div>
              ))}
              <BTN onClick={()=>setModoCliente(true)} style={{background:"rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.2)"}} small>👁 Vista cliente</BTN>
              <div style={{fontSize:8,display:"flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:10,background:"rgba(0,0,0,0.3)",border:`1px solid ${syncStatus==="saved"?"#22c55e":syncStatus==="saving"?"#f59e0b":syncStatus==="error"?"#ef4444":"#222"}`}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:syncStatus==="saved"?"#22c55e":syncStatus==="saving"?"#f59e0b":syncStatus==="error"?"#ef4444":"#333",display:"inline-block",animation:syncStatus==="saving"?"pulse 1s infinite":"none"}}/>
                <span style={{color:syncStatus==="saved"?"#22c55e":syncStatus==="saving"?"#f59e0b":syncStatus==="error"?"#ef4444":"#555"}}>
                  {syncStatus==="saving"?"Guardando...":syncStatus==="saved"?"✓ Guardado":syncStatus==="error"?"⚠ Error sync":"En línea"}
                </span>
              </div>
            </div>
          </div>
          <div style={{fontSize:8,color:"rgba(255,255,255,0.4)",marginTop:4}}>⚠ El mix 70/20/10 aplica solo sobre contenidos. Las reseñas son independientes y no afectan este indicador.</div>
          {alertasSemanas().length>0&&(
            <div style={{marginTop:8,display:"flex",gap:6,flexWrap:"wrap"}}>
              {alertasSemanas().map(a=><div key={a.semana} style={{fontSize:9,color:"#f59e0b",background:"#2a1f00",border:"1px solid #f59e0b30",padding:"2px 8px",borderRadius:8}}>⚠ S{a.semana} solo tiene {a.cnt} pub(s)</div>)}
            </div>
          )}
          <div style={{display:"flex",gap:5,marginTop:12,flexWrap:"wrap"}}>
            {[{v:"parrilla",l:"📋 Parrilla"},{v:"resenas",l:"📝 Reseñas"},{v:"bitacora",l:"📒 Bitácora"},{v:"historial",l:`🕐 Historial${historial.length>0?` (${historial.length})`:""}`},{v:"guia",l:"📖 Guia Editorial"}].map(t=>(
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
              <button onClick={()=>{setMesActivo(mes);setMesExp(mes===mesExp?null:mes);if(mes!==mesActivo)setSemanaActiva(1);setCardAbierta(null);}}
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
                    }} style={{width:"100%",textAlign:"left",padding:"5px 8px",borderRadius:6,background:"#2d0000",border:"1px solid #7f1d1d",color:"#ff6b6b",cursor:"pointer",fontSize:10,fontWeight:600}}>🗑 Eliminar este mes</button>}
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
            <button onClick={()=>setEditandoBriefing(!editandoBriefing)} style={{fontSize:9,color:"#4455aa",background:"transparent",border:"1px solid #1a1a3a",borderRadius:6,padding:"2px 8px",cursor:"pointer"}}>{editandoBriefing?"✅ Guardar":"✏ Editar"}</button>
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
              <div style={{marginLeft:"auto",display:"flex",gap:6}}>
                <button onClick={()=>{
                  setParrillas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(p=>
                    p.semana===semanaActiva?{...p,estado:"Publicado"}:p
                  )}));
                  notif(`✅ Semana ${semanaActiva} marcada como Publicada`);
                }} style={{padding:"3px 10px",borderRadius:12,border:"1.5px solid #22c55e50",background:"#0a1a0a",color:"#22c55e",cursor:"pointer",fontSize:9,fontWeight:700}}>
                  ✅ Marcar semana como Publicada
                </button>
                <button onClick={()=>{
                  setParrillas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(p=>
                    p.semana===semanaActiva?{...p,estado:"En producción"}:p
                  )}));
                  notif(`🔵 Semana ${semanaActiva} marcada En producción`);
                }} style={{padding:"3px 10px",borderRadius:12,border:"1.5px solid #3b82f650",background:"#0a0d1a",color:"#3b82f6",cursor:"pointer",fontSize:9,fontWeight:700}}>
                  🔵 En producción
                </button>
                <button onClick={()=>{
                  setParrillas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(p=>
                    p.semana===semanaActiva?{...p,estado:"Pendiente"}:p
                  )}));
                  notif(`Semana ${semanaActiva} regresada a Pendiente`);
                }} style={{padding:"3px 10px",borderRadius:12,border:"1.5px solid #33333350",background:"#0a0a0a",color:"#555",cursor:"pointer",fontSize:9,fontWeight:700}}>
                  ⬜ Pendiente
                </button>
              </div>
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
                    <div key={p.id} style={{background:p.disenho==="para_disenar"?"#120000":p.disenho==="disenho_realizado"?"#001a0a":"#0b0b0b",border:isOpen?`1.5px solid ${PILAR_COLOR[p.pilar]||"#333"}`:(p.disenho==="para_disenar"?"1.5px solid #C4080350":p.disenho==="disenho_realizado"?"1.5px solid #05966950":"1px solid #141414"),borderRadius:9,marginBottom:5,overflow:"hidden"}}>
                      <div onClick={()=>setCardAbierta(isOpen?null:p.id)} style={{padding:"8px 11px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                        <div style={{width:18,height:18,borderRadius:"50%",background:PILAR_COLOR[p.pilar]||"#333",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:900,flexShrink:0,color:"#fff"}}>{p.pub}</div>
                        {p.tipo&&<span style={{fontSize:8,background:TIPO_COLOR[p.tipo]||"#555",color:"#fff",padding:"2px 8px",borderRadius:4,fontWeight:900,letterSpacing:0.5,textTransform:"uppercase"}}>{p.tipo==="RESENA"?"RESENA":p.tipo==="RECOMENDACION"?"RECOMEND.":p.tipo}</span>}
                        <span style={{fontSize:7,background:PILAR_COLOR[p.pilar],color:"#fff",padding:"1px 5px",borderRadius:6,fontWeight:700}}>{p.pilar.split("–")[0].trim()}</span>
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
                            {[{l:"Tipo",campo:"tipo",ops:["General","RESENA","3 RAZONES","5 RAZONES","FRASE","RECOMENDACION","ESTRENO","SI TE GUSTO"]},{l:"Pilar",campo:"pilar",ops:PILARES},{l:"Formato",campo:"formato",ops:FORMATOS},{l:"Estado",campo:"estado",ops:ESTADOS}].map(f=>(
                              <div key={f.campo}>
                                <div style={{fontSize:7,color:"#333",textTransform:"uppercase",letterSpacing:1,marginBottom:2,fontWeight:700}}>{f.l}</div>
                                <select value={p[f.campo]} onChange={e=>editarCampo(p.id,f.campo,e.target.value)}
                                  style={{...selectStyle,background:f.campo==="estado"?ec.bg:"#0d0d0d",color:f.campo==="estado"?ec.color:"#fff",border:`1px solid ${f.campo==="estado"?ec.color+"40":"#1a1a1a"}`}}>
                                  {f.ops.map(o=><option key={o} style={{background:"#111",color:"#fff"}}>{o}</option>)}
                                </select>
                              </div>
                            ))}
                          </div>
                          {/* Selector de reseña vinculada — solo visible cuando tipo=RESENA */}
                          {p.tipo==="RESENA"&&(
                            <div style={{marginTop:7,padding:"8px 10px",background:"#0a001a",border:"1px solid #7c3aed40",borderRadius:7}}>
                              <div style={{fontSize:8,color:"#7c3aed",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Reseña vinculada — elige de las 40 del mes</div>
                              <select value={p.resenaId||""} onChange={e=>{
                                const rid=e.target.value;
                                editarCampo(p.id,"resenaId",rid);
                                if(rid){
                                  
                                  // Actualizar el tema de la pub con el titulo de la reseña
                                  const r=resenas[mesActivo]?.find(x=>x.id===rid);
                                  if(r&&r.titulo) editarCampo(p.id,"tema",r.titulo);
                                }
                              }} style={{...selectStyle,width:"100%",color:"#ddd",background:"#0d0d0d",border:"1px solid #7c3aed40",fontSize:9}}>
                                <option value="" style={{background:"#111"}}>— Sin vincular —</option>
                                {(resenas[mesActivo]||[]).filter(r=>r.semana===p.semana).map(r=>(
                                  <option key={r.id} value={r.id} style={{background:"#111",color:"#ddd"}}>
                                    {r.obra!=="Editorial"?`[${r.obra}] `:""}{r.titulo?.substring(0,60)||"Sin titulo"}
                                  </option>
                                ))}
                              </select>
                              {p.resenaId&&(()=>{const r=(resenas[mesActivo]||[]).find(x=>x.id===p.resenaId);return null;})()}
                            </div>
                          )}
                          <div style={{marginTop:7,display:"flex",alignItems:"center",gap:10}}>
                              <div style={{fontSize:9,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:1}}>Para diseñar:</div>
                              <button onClick={()=>{
                                  const next=p.disenho===""?"para_disenar":p.disenho==="para_disenar"?"disenho_realizado":"";
                                  editarCampo(p.id,"disenho",next);
                                }}
                                style={{padding:"4px 16px",borderRadius:20,fontWeight:900,fontSize:10,cursor:"pointer",
                                  background:p.disenho==="para_disenar"?"#C40803":p.disenho==="disenho_realizado"?"#059669":"#0a0a0a",
                                  color:p.disenho?"#fff":"#444",
                                  border:p.disenho==="para_disenar"?"2px solid #C40803":p.disenho==="disenho_realizado"?"2px solid #059669":"1.5px solid #333",
                                  transition:"all 0.2s"}}>
                                {p.disenho==="para_disenar"?"Para disenar":p.disenho==="disenho_realizado"?"Diseno realizado":"Enviar a disenar"}
                              </button>
                              {p.disenho==="para_disenar"&&<span style={{fontSize:8,color:"#C40803",fontWeight:700}}>● Para disenar</span>}
                              {p.disenho==="disenho_realizado"&&<span style={{fontSize:8,color:"#059669",fontWeight:700}}>✓ Realizado</span>}
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
                          <div style={{marginTop:7}}>
                            <div style={{fontSize:7,color:"#333",textTransform:"uppercase",letterSpacing:1,marginBottom:2,fontWeight:700}}>Tema</div>
                            <input value={p.tema} onChange={e=>editarCampo(p.id,"tema",e.target.value)} style={inputStyle}/>
                          </div>
                          <div style={{marginTop:7}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                              <div style={{fontSize:7,color:"#333",textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>📝 Copy</div>
                              <button onClick={()=>handleGenerarCopy(p)} disabled={generando[p.id]} style={{background:generando[p.id]?"#1a1a1a":"#1a0000",color:generando[p.id]?"#444":"#C40803",border:`1px solid ${generando[p.id]?"#222":"#C40803"}`,borderRadius:12,padding:"2px 9px",fontSize:8,fontWeight:700,cursor:generando[p.id]?"not-allowed":"pointer"}}>
                                {generando[p.id]?"⏳ Generando...":"✨ Nueva propuesta IA"}
                              </button>
                            </div>
                            <textarea value={p.copy} onChange={e=>editarCampo(p.id,"copy",e.target.value)} rows={4}
                              style={{...inputStyle,background:"#060606",lineHeight:1.65,resize:"vertical"}}/>
                          </div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginTop:7}}>
                            {[{l:"🎯 CTA",k:"cta"},{l:"🎨 Link diseño",k:"linkDiseno",ph:"https://drive.google.com/..."},{l:"🗒 Notas",k:"notas",ph:"Pendiente..."}].map(f=>(
                              <div key={f.k}>
                                <div style={{fontSize:7,color:"#333",textTransform:"uppercase",letterSpacing:1,marginBottom:2,fontWeight:700}}>{f.l}</div>
                                <input value={p[f.k]||""} placeholder={f.ph||""} onChange={e=>editarCampo(p.id,f.k,e.target.value)} style={{...inputStyle,background:f.k==="notas"?"#060606":"#0a0a0a",border:f.k==="notas"?"1px dashed #1a1a1a":"1px solid #1e1e1e",color:f.k==="notas"?"#666":"#fff"}}/>
                              </div>
                            ))}
                          </div>
                          <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
                            <button onClick={()=>handleEliminarPub(p.id)} style={{fontSize:9,color:"#7f1d1d",background:"transparent",border:"none",cursor:"pointer"}}>🗑 Eliminar</button>
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
                <div style={{fontSize:9,color:"#444",marginTop:2}}>{resenasMes.length} reseñas planificadas para {mesActivo}</div>
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
                    
                  </div>
                  {rs.map(r=>(
                    <div key={r.id} style={{background:"#0b0b0b",border:"1px solid #1a1a1a",borderRadius:9,padding:"9px 12px",marginBottom:6}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                          <div style={{flex:1}}>
                            <div style={{fontSize:11,fontWeight:700,color:"#fff",marginBottom:4}}>{r.obra||"Sin título"}</div>
                            <input value={r.obra||""} onChange={e=>setResenas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(x=>x.id===r.id?{...x,obra:e.target.value}:x)}))}
                              placeholder="Nombre de la obra" style={{width:"100%",background:"#111",border:"1px solid #222",borderRadius:5,padding:"3px 7px",color:"#fff",fontSize:10,marginBottom:4}}/>
                            <input value={r.titulo||""} onChange={e=>setResenas(prev=>({...prev,[mesActivo]:prev[mesActivo].map(x=>x.id===r.id?{...x,titulo:e.target.value}:x)}))}
                              placeholder="Título de la reseña" style={{width:"100%",background:"#111",border:"1px solid #222",borderRadius:5,padding:"3px 7px",color:"#fff",fontSize:10}}/>
                          </div>
                          <button onClick={()=>setResenas(prev=>({...prev,[mesActivo]:prev[mesActivo].filter(x=>x.id!==r.id)}))}
                            style={{background:"transparent",border:"none",color:"#555",cursor:"pointer",fontSize:14,padding:"2px 4px"}}>✕</button>
                        </div>
                      </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* ══ POR RED ══ */}
        {/* ══ BITÁCORA ADMIN ══ */}
        {vista==="bitacora"&&(
          <div style={{marginTop:12}}>
            {/* Tabs meses */}
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
              {mesesDisp.map(m=>(
                <button key={m} onClick={()=>{setMesActivo(m);setSemanaActiva(1);}}
                  style={{padding:"4px 14px",borderRadius:16,fontWeight:700,fontSize:10,cursor:"pointer",
                    background:mesActivo===m?"#C40803":"#0d0d0d",color:mesActivo===m?"#fff":"#555",
                    border:mesActivo===m?"2px solid #C40803":"1.5px solid #1a1a1a"}}>
                  {m}
                </button>
              ))}
            </div>

            {(()=>{
              const pubsMes=parrillas[mesActivo]||[];
              const semanasMes=[...new Set(pubsMes.map(p=>p.semana))].sort((a,b)=>a-b);
              const totalPub=pubsMes.filter(p=>p.estado==="Publicado").length;
              const totalProd=pubsMes.filter(p=>p.estado==="En producción").length;
              const totalPend=pubsMes.filter(p=>p.estado==="Pendiente").length;

              return(
                <div>
                  {/* Contadores del mes */}
                  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
                    {[
                      {l:"Total",v:pubsMes.length,c:"#fff"},
                      {l:"Publicadas",v:totalPub,c:"#22c55e"},
                      {l:"En producción",v:totalProd,c:"#3b82f6"},
                      {l:"Pendientes",v:totalPend,c:"#555"},
                    ].map(item=>(
                      <div key={item.l} style={{background:"#0b0b0b",border:"1px solid #1a1a1a",borderRadius:8,
                        padding:"8px 14px",textAlign:"center",minWidth:70}}>
                        <div style={{fontSize:22,fontWeight:900,color:item.c}}>{item.v}</div>
                        <div style={{fontSize:7,color:"#333",textTransform:"uppercase",letterSpacing:1,marginTop:2}}>{item.l}</div>
                      </div>
                    ))}
                    {/* Barra de progreso */}
                    <div style={{flex:1,minWidth:160,display:"flex",flexDirection:"column",justifyContent:"center",gap:4}}>
                      <div style={{fontSize:8,color:"#444",marginBottom:3}}>Progreso del mes</div>
                      <div style={{height:6,background:"#1a1a1a",borderRadius:3,overflow:"hidden"}}>
                        <div style={{height:"100%",background:"#22c55e",borderRadius:3,
                          width:pubsMes.length>0?`${Math.round(totalPub/pubsMes.length*100)}%`:"0%",
                          transition:"width 0.4s"}}/>
                      </div>
                      <div style={{fontSize:8,color:"#22c55e"}}>
                        {pubsMes.length>0?Math.round(totalPub/pubsMes.length*100):0}% publicado
                      </div>
                    </div>
                  </div>

                  {/* Semanas con desglose */}
                  {semanasMes.map(s=>{
                    const pubsSemana=pubsMes.filter(p=>p.semana===s);
                    const pub=pubsSemana.filter(p=>p.estado==="Publicado");
                    const prod=pubsSemana.filter(p=>p.estado==="En producción");
                    const pend=pubsSemana.filter(p=>p.estado==="Pendiente");
                    return(
                      <div key={s} style={{marginBottom:24,background:"#0b0b0b",border:"1px solid #141414",borderRadius:10,padding:"12px 14px"}}>
                        {/* Header semana con números */}
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
                          <div style={{background:"#C40803",color:"#fff",fontWeight:900,fontSize:9,
                            padding:"3px 12px",borderRadius:5,letterSpacing:1,textTransform:"uppercase"}}>
                            Semana {s}
                          </div>
                          <span style={{fontSize:8,color:"#fff",fontWeight:700}}>{pubsSemana.length} pubs</span>
                          <div style={{flex:1,height:1,background:"#1a1a1a"}}/>
                          {pub.length>0&&<span style={{fontSize:8,color:"#22c55e",fontWeight:700}}>✅ {pub.length}</span>}
                          {prod.length>0&&<span style={{fontSize:8,color:"#3b82f6",fontWeight:700}}>🔵 {prod.length}</span>}
                          {pend.length>0&&<span style={{fontSize:8,color:"#444"}}>⬜ {pend.length}</span>}
                        </div>

                        {/* Publicadas */}
                        {pub.length>0&&(
                          <div style={{marginBottom:10}}>
                            <div style={{fontSize:7,color:"#22c55e",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>✅ Publicado</div>
                            <div style={{display:"flex",flexDirection:"column",gap:4}}>
                              {pub.map((p,i)=>(
                                <div key={p.id} style={{display:"flex",gap:8,alignItems:"baseline",paddingLeft:8,borderLeft:"2px solid #22c55e30"}}>
                                  <span style={{fontSize:8,color:"#22c55e",fontWeight:700,minWidth:14}}>{i+1}.</span>
                                  <span style={{fontSize:9,color:"#666",minWidth:44,flexShrink:0}}>{p.fecha}</span>
                                  <span style={{fontSize:11,color:"#ccc",fontWeight:500}}>{p.tema}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* En producción */}
                        {prod.length>0&&(
                          <div style={{marginBottom:10}}>
                            <div style={{fontSize:7,color:"#3b82f6",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>🔵 En producción</div>
                            <div style={{display:"flex",flexDirection:"column",gap:4}}>
                              {prod.map((p,i)=>(
                                <div key={p.id} style={{display:"flex",gap:8,alignItems:"baseline",paddingLeft:8,borderLeft:"2px solid #3b82f630"}}>
                                  <span style={{fontSize:8,color:"#3b82f6",fontWeight:700,minWidth:14}}>{i+1}.</span>
                                  <span style={{fontSize:9,color:"#666",minWidth:44,flexShrink:0}}>{p.fecha}</span>
                                  <span style={{fontSize:11,color:"#888",fontWeight:500}}>{p.tema}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Pendientes */}
                        {pend.length>0&&(
                          <div>
                            <div style={{fontSize:7,color:"#333",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>⬜ Pendiente ({pend.length})</div>
                            <div style={{display:"flex",flexDirection:"column",gap:4}}>
                              {pend.map((p,i)=>(
                                <div key={p.id} style={{display:"flex",gap:8,alignItems:"baseline",paddingLeft:8,borderLeft:"2px solid #1a1a1a"}}>
                                  <span style={{fontSize:8,color:"#2a2a2a",fontWeight:700,minWidth:14}}>{i+1}.</span>
                                  <span style={{fontSize:9,color:"#2a2a2a",minWidth:44,flexShrink:0}}>{p.fecha}</span>
                                  <span style={{fontSize:11,color:"#333",fontWeight:500}}>{p.tema}</span>
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

        {vista==="historial"&&(
          <div style={{marginTop:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div>
                <div style={{fontSize:12,fontWeight:700}}>Historial de cambios</div>
                <div style={{fontSize:9,color:"#444",marginTop:1}}>{historial.length} cambios esta sesión</div>
              </div>
              {historial.length>0&&<BTN onClick={()=>setHistorial([])} danger small>Limpiar</BTN>}
            </div>
            {historial.length===0&&<div style={{textAlign:"center",padding:32,color:"#222",fontSize:12,border:"1px dashed #141414",borderRadius:10}}>🕐 Aún no hay cambios registrados.</div>}
            {historial.map((h,i)=>{
              const esRec=restaurando===h.ts+"_"+h.id;
              return(
                <div key={i} style={{background:esRec?"#002a00":"#0b0b0b",border:`1px solid ${esRec?"#22c55e":"#141414"}`,borderRadius:7,padding:"7px 11px",marginBottom:4,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",transition:"all 0.3s"}}>
                  <span style={{fontSize:8,color:"#333",fontFamily:"monospace",minWidth:55}}>{h.ts}</span>
                  <span style={{fontSize:8,color:"#555",background:"#141414",padding:"1px 5px",borderRadius:4,fontFamily:"monospace"}}>{h.id.split("_")[0]}</span>
                  <span style={{fontSize:9,color:"#C40803",fontWeight:700,minWidth:55}}>{h.campo}</span>
                  <div style={{flex:1,display:"flex",gap:5,alignItems:"center",flexWrap:"wrap",minWidth:180}}>
                    <span style={{fontSize:8,color:"#444",background:"#100000",padding:"1px 6px",borderRadius:4,maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={h.anterior}>← {h.anterior.substring(0,35)}{h.anterior.length>35?"…":""}</span>
                    <span style={{fontSize:8,color:"#22c55e",background:"#001800",padding:"1px 6px",borderRadius:4,maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={h.nuevo}>{h.nuevo.substring(0,35)}{h.nuevo.length>35?"…":""}</span>
                  </div>
                  <button onClick={()=>restaurarCambio(h)} style={{background:"#0a0a1e",color:"#5577ff",border:"1px solid #1a1a4a",borderRadius:7,padding:"2px 9px",cursor:"pointer",fontSize:8,fontWeight:700,flexShrink:0}}>↩ Restaurar</button>
                </div>
              );
            })}
          </div>
        )}


      {/* ── GUIA EDITORIAL ── */}
      {vista==="guia"&&(
        <div style={{marginTop:12}}>
          {/* Sub-tabs de la guia */}
          <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
            {[{v:"flujo",l:"Flujo mensual"},{v:"timing",l:"Timing"},{v:"arco",l:"Arco semanal"},{v:"series",l:"Series fijas"},{v:"efemerides",l:"Efemerides"},{v:"reglas",l:"Reglas de oro"}].map(t=>(
              <button key={t.v} onClick={()=>setGuiaTab(t.v)}
                style={{padding:"4px 12px",borderRadius:16,fontSize:10,fontWeight:700,cursor:"pointer",
                  background:guiaTab===t.v?"#C40803":"transparent",
                  color:guiaTab===t.v?"#fff":"#555",
                  border:guiaTab===t.v?"1.5px solid #C40803":"1.5px solid #222"}}>
                {t.l}
              </button>
            ))}
          </div>

          {/* TIMING */}
          {guiaTab==="flujo"&&(
            <div>
              <div style={{fontSize:10,color:"#C40803",fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Flujo de construccion de parrilla mensual</div>
              <div style={{background:"#0d0d0d",border:"1px solid #C4080330",borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:10,color:"#888",lineHeight:1.6}}>
                Este es el orden definitivo de trabajo cada mes. Seguirlo garantiza que la parrilla llegue completa, sin retrabajos y con las reseñas ya vinculadas desde el inicio.
              </div>
              <button onClick={()=>{setGuiaAgregando("flujo");setGuiaNuevoVal({titulo:"",desc:"",responsable:"Aarón"});}} style={{padding:"4px 14px",borderRadius:16,fontSize:9,fontWeight:700,cursor:"pointer",background:"transparent",color:"#C40803",border:"1.5px dashed #C40803",marginBottom:10}}>+ Agregar paso</button>
              {guiaAgregando==="flujo"&&(
                <div style={{background:"#0d0d0d",border:"1.5px solid #C40803",borderRadius:8,padding:"12px 14px",marginBottom:12}}>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Titulo del paso</label>
                  <input value={guiaNuevoVal.titulo||""} onChange={e=>setGuiaNuevoVal(p=>({...p,titulo:e.target.value}))} placeholder="Ej: Revision de arte final" style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,marginBottom:6,boxSizing:"border-box"}}/>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Descripcion</label>
                  <textarea value={guiaNuevoVal.desc||""} onChange={e=>setGuiaNuevoVal(p=>({...p,desc:e.target.value}))} placeholder="Que sucede en este paso..." style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,minHeight:48,resize:"vertical",marginBottom:6,boxSizing:"border-box"}}/>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Responsable</label>
                  <select value={guiaNuevoVal.responsable||"Aaron"} onChange={e=>setGuiaNuevoVal(p=>({...p,responsable:e.target.value}))} style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,marginBottom:6}}>
                    {["Aaron","Claude","Aaron + Claude","Aaron + Diseñadora","Diseñadora","Ana"].map(r=><option key={r} style={{background:"#111"}}>{r}</option>)}
                  </select>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>{if(!guiaNuevoVal.titulo)return;const nextPaso=guia.flujo.length+1;setGuia(g=>({...g,flujo:[...g.flujo,{paso:nextPaso,titulo:guiaNuevoVal.titulo,desc:guiaNuevoVal.desc||"",responsable:guiaNuevoVal.responsable||"Aaron"}]}));setGuiaAgregando(null);setGuiaNuevoVal({});}} style={{padding:"3px 10px",background:"#C40803",color:"#fff",border:"none",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>Agregar</button>
                    <button onClick={()=>{setGuiaAgregando(null);setGuiaNuevoVal({});}} style={{padding:"3px 10px",background:"transparent",color:"#555",border:"1px solid #333",borderRadius:4,fontSize:9,cursor:"pointer"}}>Cancelar</button>
                  </div>
                </div>
              )}
              {guia.flujo.map((f,i)=>{
                const respColor=f.responsable==="Claude"?"#0891b2":f.responsable==="Aaron"?"#C40803":f.responsable==="Diseñadora"?"#7c3aed":"#059669";
                return(
                  <div key={i} style={{background:"#0b0b0b",border:"1px solid #1a1a1a",borderRadius:8,padding:"12px 14px",marginBottom:8,display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{minWidth:28,height:28,borderRadius:"50%",background:"#C40803",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:11,fontWeight:900,color:"#fff"}}>{f.paso}</span>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:4}}>
                        <div style={{fontSize:11,fontWeight:700,color:"#fff"}}>{f.titulo}</div>
                        <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
                          <span style={{fontSize:8,fontWeight:700,color:respColor,border:`1px solid ${respColor}`,padding:"1px 7px",borderRadius:8}}>{f.responsable}</span>
                          {guiaEditando!==`flujo-${i}`&&<button onClick={()=>{setGuiaEditando(`flujo-${i}`);setGuiaEditVal({desc:f.desc,responsable:f.responsable});}} style={{padding:"2px 8px",background:"transparent",color:"#444",border:"1px solid #222",borderRadius:4,fontSize:9,cursor:"pointer"}}>Editar</button>}
                        </div>
                      </div>
                      {guiaEditando===`flujo-${i}`?(
                        <div>
                          <textarea value={guiaEditVal.desc||""} onChange={e=>setGuiaEditVal(p=>({...p,desc:e.target.value}))} style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,minHeight:48,resize:"vertical",marginBottom:6,boxSizing:"border-box"}}/>
                          <select value={guiaEditVal.responsable||"Aaron"} onChange={e=>setGuiaEditVal(p=>({...p,responsable:e.target.value}))} style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,marginBottom:6}}>
                            {["Aaron","Claude","Aaron + Claude","Aaron + Diseñadora","Diseñadora","Ana"].map(r=><option key={r} style={{background:"#111"}}>{r}</option>)}
                          </select>
                          <div style={{display:"flex",gap:6}}>
                            <button onClick={()=>{setGuia(g=>({...g,flujo:g.flujo.map((x,j)=>j===i?{...x,desc:guiaEditVal.desc,responsable:guiaEditVal.responsable}:x)}));setGuiaEditando(null);}} style={{padding:"3px 10px",background:"#C40803",color:"#fff",border:"none",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>Guardar</button>
                            <button onClick={()=>setGuiaEditando(null)} style={{padding:"3px 10px",background:"transparent",color:"#555",border:"1px solid #333",borderRadius:4,fontSize:9,cursor:"pointer"}}>Cancelar</button>
                          </div>
                        </div>
                      ):(
                        <div style={{fontSize:10,color:"#666",lineHeight:1.5}}>{f.desc}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {guiaTab==="timing"&&(
            <div>
              <div style={{fontSize:10,color:"#C40803",fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Cuando publicar segun el tipo de funcion</div>
              <div style={{background:"#0d0d0d",border:"1px solid #C4080330",borderRadius:8,padding:"10px 14px",marginBottom:10,fontSize:10,color:"#888",lineHeight:1.6}}>
                Regla central: publicar siempre ANTES de que la decision se tome. Nunca el mismo dia de la funcion.
              </div>
              <button onClick={()=>{setGuiaAgregando("timing");setGuiaNuevoVal({titulo:"",cuando:"",porque:"",});}} style={{padding:"4px 14px",borderRadius:16,fontSize:9,fontWeight:700,cursor:"pointer",background:"transparent",color:"#C40803",border:"1.5px dashed #C40803",marginBottom:10}}>+ Agregar regla de timing</button>
              {guiaAgregando==="timing"&&(
                <div style={{background:"#0d0d0d",border:"1.5px solid #C40803",borderRadius:8,padding:"12px 14px",marginBottom:12}}>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Tipo de funcion</label>
                  <input value={guiaNuevoVal.titulo||""} onChange={e=>setGuiaNuevoVal(p=>({...p,titulo:e.target.value}))} placeholder="Ej: Obras de martes..." style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,marginBottom:6,boxSizing:"border-box"}}/>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Cuando publicar</label>
                  <input value={guiaNuevoVal.cuando||""} onChange={e=>setGuiaNuevoVal(p=>({...p,cuando:e.target.value}))} placeholder="Ej: Publicar el lunes anterior..." style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,marginBottom:6,boxSizing:"border-box"}}/>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Por que</label>
                  <textarea value={guiaNuevoVal.porque||""} onChange={e=>setGuiaNuevoVal(p=>({...p,porque:e.target.value}))} placeholder="Razon o logica de este timing..." style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,minHeight:48,resize:"vertical",marginBottom:6,boxSizing:"border-box"}}/>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>{if(!guiaNuevoVal.titulo)return;setGuia(g=>({...g,timing:[...g.timing,{titulo:guiaNuevoVal.titulo,cuando:guiaNuevoVal.cuando||"",porque:guiaNuevoVal.porque||""}]}));setGuiaAgregando(null);setGuiaNuevoVal({});}} style={{padding:"3px 10px",background:"#C40803",color:"#fff",border:"none",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>Agregar</button>
                    <button onClick={()=>{setGuiaAgregando(null);setGuiaNuevoVal({});}} style={{padding:"3px 10px",background:"transparent",color:"#555",border:"1px solid #333",borderRadius:4,fontSize:9,cursor:"pointer"}}>Cancelar</button>
                  </div>
                </div>
              )}
              {guia.timing.map((t,i)=>(
                <div key={i} style={{background:"#0b0b0b",border:"1px solid #1a1a1a",borderLeft:"3px solid #C40803",borderRadius:8,padding:"10px 14px",marginBottom:8}}>
                  {guiaEditando===`timing-${i}`?(
                    <div>
                      <div style={{fontSize:9,color:"#555",marginBottom:4}}>Cuando:</div>
                      <input value={guiaEditVal.cuando||""} onChange={e=>setGuiaEditVal(p=>({...p,cuando:e.target.value}))}
                        style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,marginBottom:6}}/>
                      <div style={{fontSize:9,color:"#555",marginBottom:4}}>Por que:</div>
                      <textarea value={guiaEditVal.porque||""} onChange={e=>setGuiaEditVal(p=>({...p,porque:e.target.value}))}
                        style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,minHeight:50,resize:"vertical"}}/>
                      <div style={{display:"flex",gap:6,marginTop:6}}>
                        <button onClick={()=>{setGuia(g=>({...g,timing:g.timing.map((x,j)=>j===i?{...x,...guiaEditVal}:x)}));setGuiaEditando(null);}} style={{padding:"3px 10px",background:"#C40803",color:"#fff",border:"none",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>Guardar</button>
                        <button onClick={()=>setGuiaEditando(null)} style={{padding:"3px 10px",background:"transparent",color:"#555",border:"1px solid #333",borderRadius:4,fontSize:9,cursor:"pointer"}}>Cancelar</button>
                      </div>
                    </div>
                  ):(
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:11,fontWeight:700,color:"#fff",marginBottom:4}}>{t.titulo}</div>
                        <div style={{fontSize:10,color:"#C40803",fontWeight:700,marginBottom:3}}>{t.cuando}</div>
                        <div style={{fontSize:10,color:"#666",lineHeight:1.5}}>{t.porque}</div>
                      </div>
                      <button onClick={()=>{setGuiaEditando(`timing-${i}`);setGuiaEditVal({cuando:t.cuando,porque:t.porque});}}
                        style={{padding:"2px 8px",background:"transparent",color:"#444",border:"1px solid #222",borderRadius:4,fontSize:9,cursor:"pointer",flexShrink:0}}>✏ Editar</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ARCO SEMANAL */}
          {guiaTab==="arco"&&(
            <div>
              <div style={{fontSize:10,color:"#C40803",fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Rol de cada dia de la semana</div>
              <button onClick={()=>{setGuiaAgregando("arco");setGuiaNuevoVal({dia:"",rol:"",contenido:""});}} style={{padding:"4px 14px",borderRadius:16,fontSize:9,fontWeight:700,cursor:"pointer",background:"transparent",color:"#C40803",border:"1.5px dashed #C40803",marginBottom:10}}>+ Agregar dia</button>
              {guiaAgregando==="arco"&&(
                <div style={{background:"#0d0d0d",border:"1.5px solid #C40803",borderRadius:8,padding:"12px 14px",marginBottom:12}}>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Dia de la semana</label>
                  <input value={guiaNuevoVal.dia||""} onChange={e=>setGuiaNuevoVal(p=>({...p,dia:e.target.value}))} placeholder="Ej: Viernes" style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,marginBottom:6,boxSizing:"border-box"}}/>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Rol del dia</label>
                  <input value={guiaNuevoVal.rol||""} onChange={e=>setGuiaNuevoVal(p=>({...p,rol:e.target.value}))} placeholder="Ej: Decidir" style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,marginBottom:6,boxSizing:"border-box"}}/>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Contenido sugerido</label>
                  <textarea value={guiaNuevoVal.contenido||""} onChange={e=>setGuiaNuevoVal(p=>({...p,contenido:e.target.value}))} placeholder="Que publicar este dia y por que..." style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,minHeight:48,resize:"vertical",marginBottom:6,boxSizing:"border-box"}}/>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>{if(!guiaNuevoVal.dia)return;setGuia(g=>({...g,arco:[...g.arco,{dia:guiaNuevoVal.dia,rol:guiaNuevoVal.rol||"",contenido:guiaNuevoVal.contenido||""}]}));setGuiaAgregando(null);setGuiaNuevoVal({});}} style={{padding:"3px 10px",background:"#C40803",color:"#fff",border:"none",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>Agregar</button>
                    <button onClick={()=>{setGuiaAgregando(null);setGuiaNuevoVal({});}} style={{padding:"3px 10px",background:"transparent",color:"#555",border:"1px solid #333",borderRadius:4,fontSize:9,cursor:"pointer"}}>Cancelar</button>
                  </div>
                </div>
              )}
              {guia.arco.map((d,i)=>(
                <div key={i} style={{background:"#0b0b0b",border:"1px solid #1a1a1a",borderRadius:8,padding:"10px 14px",marginBottom:8,display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{minWidth:70,fontSize:12,fontWeight:700,color:"#C40803"}}>{d.dia}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:0.5,marginBottom:3}}>{d.rol}</div>
                    {guiaEditando===`arco-${i}`?(
                      <div>
                        <textarea value={guiaEditVal.contenido||""} onChange={e=>setGuiaEditVal(p=>({...p,contenido:e.target.value}))}
                          style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,minHeight:50,resize:"vertical"}}/>
                        <div style={{display:"flex",gap:6,marginTop:6}}>
                          <button onClick={()=>{setGuia(g=>({...g,arco:g.arco.map((x,j)=>j===i?{...x,contenido:guiaEditVal.contenido}:x)}));setGuiaEditando(null);}} style={{padding:"3px 10px",background:"#C40803",color:"#fff",border:"none",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>Guardar</button>
                          <button onClick={()=>setGuiaEditando(null)} style={{padding:"3px 10px",background:"transparent",color:"#555",border:"1px solid #333",borderRadius:4,fontSize:9,cursor:"pointer"}}>Cancelar</button>
                        </div>
                      </div>
                    ):(
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                        <div style={{fontSize:10,color:"#aaa",lineHeight:1.5,flex:1}}>{d.contenido}</div>
                        <button onClick={()=>{setGuiaEditando(`arco-${i}`);setGuiaEditVal({contenido:d.contenido});}}
                          style={{padding:"2px 8px",background:"transparent",color:"#444",border:"1px solid #222",borderRadius:4,fontSize:9,cursor:"pointer",flexShrink:0}}>✏ Editar</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SERIES FIJAS */}
          {guiaTab==="series"&&(
            <div>
              <div style={{fontSize:10,color:"#C40803",fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Series de contenido recurrente</div>
              <button onClick={()=>{setGuiaAgregando("series");setGuiaNuevoVal({nombre:"",color:"#555",freq:"",dia:"",desc:""});}} style={{padding:"4px 14px",borderRadius:16,fontSize:9,fontWeight:700,cursor:"pointer",background:"transparent",color:"#C40803",border:"1.5px dashed #C40803",marginBottom:10}}>+ Agregar serie</button>
              {guiaAgregando==="series"&&(
                <div style={{background:"#0d0d0d",border:"1.5px solid #C40803",borderRadius:8,padding:"12px 14px",marginBottom:12}}>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Nombre de la serie (en mayusculas)</label>
                  <input value={guiaNuevoVal.nombre||""} onChange={e=>setGuiaNuevoVal(p=>({...p,nombre:e.target.value.toUpperCase()}))} placeholder="Ej: BEHIND THE SCENES" style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,marginBottom:6,boxSizing:"border-box"}}/>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Color del badge (hex)</label>
                  <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:6}}>
                    <input value={guiaNuevoVal.color||"#555"} onChange={e=>setGuiaNuevoVal(p=>({...p,color:e.target.value}))} placeholder="#C40803" style={{flex:1,background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,boxSizing:"border-box"}}/>
                    <div style={{width:28,height:28,borderRadius:6,background:guiaNuevoVal.color||"#555",border:"1px solid #333",flexShrink:0}}/>
                  </div>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Frecuencia</label>
                  <input value={guiaNuevoVal.freq||""} onChange={e=>setGuiaNuevoVal(p=>({...p,freq:e.target.value}))} placeholder="Ej: 1 por semana / 2 por mes" style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,marginBottom:6,boxSizing:"border-box"}}/>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Mejor dia para publicar</label>
                  <input value={guiaNuevoVal.dia||""} onChange={e=>setGuiaNuevoVal(p=>({...p,dia:e.target.value}))} placeholder="Ej: Martes o Miercoles" style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,marginBottom:6,boxSizing:"border-box"}}/>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Descripcion</label>
                  <textarea value={guiaNuevoVal.desc||""} onChange={e=>setGuiaNuevoVal(p=>({...p,desc:e.target.value}))} placeholder="Que es, como funciona, objetivo del formato..." style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,minHeight:56,resize:"vertical",marginBottom:6,boxSizing:"border-box"}}/>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>{if(!guiaNuevoVal.nombre)return;setGuia(g=>({...g,series:[...g.series,{nombre:guiaNuevoVal.nombre,color:guiaNuevoVal.color||"#555",freq:guiaNuevoVal.freq||"",dia:guiaNuevoVal.dia||"",desc:guiaNuevoVal.desc||""}]}));setGuiaAgregando(null);setGuiaNuevoVal({});}} style={{padding:"3px 10px",background:"#C40803",color:"#fff",border:"none",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>Agregar</button>
                    <button onClick={()=>{setGuiaAgregando(null);setGuiaNuevoVal({});}} style={{padding:"3px 10px",background:"transparent",color:"#555",border:"1px solid #333",borderRadius:4,fontSize:9,cursor:"pointer"}}>Cancelar</button>
                  </div>
                </div>
              )}
              {guia.series.map((s,i)=>(
                <div key={i} style={{background:"#0b0b0b",border:"1px solid #1a1a1a",borderLeft:`3px solid ${s.color}`,borderRadius:8,padding:"10px 14px",marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6,flexWrap:"wrap"}}>
                        <span style={{fontSize:9,fontWeight:900,background:s.color,color:"#fff",padding:"2px 8px",borderRadius:10,letterSpacing:0.5}}>{s.nombre}</span>
                        <span style={{fontSize:9,color:"#555"}}>{s.freq}</span>
                        <span style={{fontSize:9,color:"#444"}}>Mejor dia: {s.dia}</span>
                      </div>
                      {guiaEditando===`series-${i}`?(
                        <div>
                          <textarea value={guiaEditVal.desc||""} onChange={e=>setGuiaEditVal(p=>({...p,desc:e.target.value}))}
                            style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,minHeight:50,resize:"vertical"}}/>
                          <div style={{display:"flex",gap:6,marginTop:6}}>
                            <button onClick={()=>{setGuia(g=>({...g,series:g.series.map((x,j)=>j===i?{...x,desc:guiaEditVal.desc}:x)}));setGuiaEditando(null);}} style={{padding:"3px 10px",background:"#C40803",color:"#fff",border:"none",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>Guardar</button>
                            <button onClick={()=>setGuiaEditando(null)} style={{padding:"3px 10px",background:"transparent",color:"#555",border:"1px solid #333",borderRadius:4,fontSize:9,cursor:"pointer"}}>Cancelar</button>
                          </div>
                        </div>
                      ):(
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                          <div style={{fontSize:10,color:"#888",lineHeight:1.5,flex:1}}>{s.desc}</div>
                          <button onClick={()=>{setGuiaEditando(`series-${i}`);setGuiaEditVal({desc:s.desc});}}
                            style={{padding:"2px 8px",background:"transparent",color:"#444",border:"1px solid #222",borderRadius:4,fontSize:9,cursor:"pointer",flexShrink:0}}>✏ Editar</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* EFEMERIDES */}
          {guiaTab==="efemerides"&&(
            <div>
              <div style={{fontSize:10,color:"#C40803",fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Calendario de efemerides y fechas clave</div>
              <button onClick={()=>{setGuiaAgregando("efemerides");setGuiaNuevoVal({mes:"Enero",fecha:"",nombre:"",tipo:"Social",nota:""});}} style={{padding:"4px 14px",borderRadius:16,fontSize:9,fontWeight:700,cursor:"pointer",background:"transparent",color:"#C40803",border:"1.5px dashed #C40803",marginBottom:10}}>+ Agregar efemeride</button>
              {guiaAgregando==="efemerides"&&(
                <div style={{background:"#0d0d0d",border:"1.5px solid #C40803",borderRadius:8,padding:"12px 14px",marginBottom:12}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:6}}>
                    <div>
                      <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Mes</label>
                      <select value={guiaNuevoVal.mes||"Enero"} onChange={e=>setGuiaNuevoVal(p=>({...p,mes:e.target.value}))} style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10}}>
                        {["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio-Agosto","Septiembre","Octubre","Noviembre","Diciembre"].map(m=><option key={m} style={{background:"#111"}}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Tipo</label>
                      <select value={guiaNuevoVal.tipo||"Social"} onChange={e=>setGuiaNuevoVal(p=>({...p,tipo:e.target.value}))} style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10}}>
                        {["Social","Teatral","Internacional","Temporada"].map(t=><option key={t} style={{background:"#111"}}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Fecha</label>
                  <input value={guiaNuevoVal.fecha||""} onChange={e=>setGuiaNuevoVal(p=>({...p,fecha:e.target.value}))} placeholder="Ej: 14 feb / 2do domingo / Todo octubre" style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,marginBottom:6,boxSizing:"border-box"}}/>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Nombre de la efemeride</label>
                  <input value={guiaNuevoVal.nombre||""} onChange={e=>setGuiaNuevoVal(p=>({...p,nombre:e.target.value}))} placeholder="Ej: Dia del Maestro" style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,marginBottom:6,boxSizing:"border-box"}}/>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Nota editorial</label>
                  <textarea value={guiaNuevoVal.nota||""} onChange={e=>setGuiaNuevoVal(p=>({...p,nota:e.target.value}))} placeholder="Como usar esta fecha para el contenido de Teatrando..." style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,minHeight:48,resize:"vertical",marginBottom:6,boxSizing:"border-box"}}/>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>{if(!guiaNuevoVal.nombre)return;setGuia(g=>({...g,efemerides:[...g.efemerides,{mes:guiaNuevoVal.mes,fecha:guiaNuevoVal.fecha||"",nombre:guiaNuevoVal.nombre,tipo:guiaNuevoVal.tipo||"Social",nota:guiaNuevoVal.nota||""}]}));setGuiaAgregando(null);setGuiaNuevoVal({});}} style={{padding:"3px 10px",background:"#C40803",color:"#fff",border:"none",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>Agregar</button>
                    <button onClick={()=>{setGuiaAgregando(null);setGuiaNuevoVal({});}} style={{padding:"3px 10px",background:"transparent",color:"#555",border:"1px solid #333",borderRadius:4,fontSize:9,cursor:"pointer"}}>Cancelar</button>
                  </div>
                </div>
              )}
              {["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio-Agosto","Septiembre","Octubre","Noviembre","Diciembre"].map(mes=>{
                const efs=guia.efemerides.filter(e=>e.mes===mes);
                if(!efs.length) return null;
                return(
                  <div key={mes} style={{marginBottom:14}}>
                    <div style={{fontSize:9,color:"#444",textTransform:"uppercase",letterSpacing:1,fontWeight:700,marginBottom:6,paddingBottom:4,borderBottom:"1px solid #1a1a1a"}}>{mes}</div>
                    {efs.map((ef,i)=>{
                      const idx=guia.efemerides.indexOf(ef);
                      const tipoColor={"Social":"#b45309","Teatral":"#C40803","Internacional":"#0891b2","Temporada":"#059669"}[ef.tipo]||"#555";
                      return(
                        <div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:"1px solid #111",alignItems:"flex-start"}}>
                          <div style={{minWidth:90,fontSize:10,fontWeight:700,color:"#fff"}}>{ef.fecha}</div>
                          <div style={{flex:1}}>
                            <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:3,flexWrap:"wrap"}}>
                              <span style={{fontSize:10,color:"#ddd"}}>{ef.nombre}</span>
                              <span style={{fontSize:8,fontWeight:700,color:tipoColor,border:`1px solid ${tipoColor}`,padding:"1px 6px",borderRadius:8}}>{ef.tipo}</span>
                            </div>
                            {guiaEditando===`ef-${idx}`?(
                              <div>
                                <textarea value={guiaEditVal.nota||""} onChange={e=>setGuiaEditVal(p=>({...p,nota:e.target.value}))}
                                  style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,minHeight:40,resize:"vertical"}}/>
                                <div style={{display:"flex",gap:6,marginTop:4}}>
                                  <button onClick={()=>{setGuia(g=>({...g,efemerides:g.efemerides.map((x,j)=>j===idx?{...x,nota:guiaEditVal.nota}:x)}));setGuiaEditando(null);}} style={{padding:"3px 10px",background:"#C40803",color:"#fff",border:"none",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>Guardar</button>
                                  <button onClick={()=>setGuiaEditando(null)} style={{padding:"3px 10px",background:"transparent",color:"#555",border:"1px solid #333",borderRadius:4,fontSize:9,cursor:"pointer"}}>Cancelar</button>
                                </div>
                              </div>
                            ):(
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                                <div style={{fontSize:10,color:"#666",lineHeight:1.4,flex:1}}>{ef.nota}</div>
                                <button onClick={()=>{setGuiaEditando(`ef-${idx}`);setGuiaEditVal({nota:ef.nota});}}
                                  style={{padding:"2px 8px",background:"transparent",color:"#444",border:"1px solid #222",borderRadius:4,fontSize:9,cursor:"pointer",flexShrink:0}}>✏ Editar</button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}

          {/* REGLAS DE ORO */}
          {guiaTab==="reglas"&&(
            <div>
              <div style={{fontSize:10,color:"#C40803",fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Reglas de oro — aplican siempre</div>
              <button onClick={()=>{setGuiaAgregando("reglas");setGuiaNuevoVal({texto:"",detalle:""});}} style={{padding:"4px 14px",borderRadius:16,fontSize:9,fontWeight:700,cursor:"pointer",background:"transparent",color:"#C40803",border:"1.5px dashed #C40803",marginBottom:10}}>+ Agregar regla</button>
              {guiaAgregando==="reglas"&&(
                <div style={{background:"#0d0d0d",border:"1.5px solid #C40803",borderRadius:8,padding:"12px 14px",marginBottom:12}}>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Regla (enunciado corto)</label>
                  <input value={guiaNuevoVal.texto||""} onChange={e=>setGuiaNuevoVal(p=>({...p,texto:e.target.value}))} placeholder="Ej: Siempre incluir horario en obras de estreno" style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,marginBottom:6,boxSizing:"border-box"}}/>
                  <label style={{fontSize:9,color:"#555",marginBottom:3,display:"block"}}>Detalle o excepciones</label>
                  <textarea value={guiaNuevoVal.detalle||""} onChange={e=>setGuiaNuevoVal(p=>({...p,detalle:e.target.value}))} placeholder="Contexto, cuando aplica, excepciones..." style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,minHeight:56,resize:"vertical",marginBottom:6,boxSizing:"border-box"}}/>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>{if(!guiaNuevoVal.texto)return;const nextNum=guia.reglas.length+1;setGuia(g=>({...g,reglas:[...g.reglas,{num:nextNum,texto:guiaNuevoVal.texto,detalle:guiaNuevoVal.detalle||""}]}));setGuiaAgregando(null);setGuiaNuevoVal({});}} style={{padding:"3px 10px",background:"#C40803",color:"#fff",border:"none",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>Agregar</button>
                    <button onClick={()=>{setGuiaAgregando(null);setGuiaNuevoVal({});}} style={{padding:"3px 10px",background:"transparent",color:"#555",border:"1px solid #333",borderRadius:4,fontSize:9,cursor:"pointer"}}>Cancelar</button>
                  </div>
                </div>
              )}
              {guia.reglas.map((r,i)=>(
                <div key={i} style={{background:"#0b0b0b",border:"1px solid #1a1a1a",borderRadius:8,padding:"10px 14px",marginBottom:8,display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{fontSize:20,fontWeight:700,color:"#C40803",minWidth:28,lineHeight:1}}>{r.num}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,fontWeight:700,color:"#fff",marginBottom:4}}>{r.texto}</div>
                    {guiaEditando===`regla-${i}`?(
                      <div>
                        <textarea value={guiaEditVal.detalle||""} onChange={e=>setGuiaEditVal(p=>({...p,detalle:e.target.value}))}
                          style={{width:"100%",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:4,padding:"4px 8px",fontSize:10,minHeight:50,resize:"vertical"}}/>
                        <div style={{display:"flex",gap:6,marginTop:6}}>
                          <button onClick={()=>{setGuia(g=>({...g,reglas:g.reglas.map((x,j)=>j===i?{...x,detalle:guiaEditVal.detalle}:x)}));setGuiaEditando(null);}} style={{padding:"3px 10px",background:"#C40803",color:"#fff",border:"none",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700}}>Guardar</button>
                          <button onClick={()=>setGuiaEditando(null)} style={{padding:"3px 10px",background:"transparent",color:"#555",border:"1px solid #333",borderRadius:4,fontSize:9,cursor:"pointer"}}>Cancelar</button>
                        </div>
                      </div>
                    ):(
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                        <div style={{fontSize:10,color:"#666",lineHeight:1.5,flex:1}}>{r.detalle}</div>
                        <button onClick={()=>{setGuiaEditando(`regla-${i}`);setGuiaEditVal({detalle:r.detalle});}}
                          style={{padding:"2px 8px",background:"transparent",color:"#444",border:"1px solid #222",borderRadius:4,fontSize:9,cursor:"pointer",flexShrink:0}}>✏ Editar</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

        <div style={{textAlign:"center",marginTop:28,fontSize:8,color:"#141414"}}>Teatrando CDMX · Sistema de Contenido 2026 · @teatrandocdmx</div>
      </div>
    </div>
  );
}
