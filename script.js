$(function() {
	var height = $(window).height(); // Alto de la página
	var device = navigator.userAgent; // Navegador que se está usando
	// Variable que utilizaremos para saber el margen que deberá tener el menú cuando
	// se muestre u oculte, en función del ancho de la página
	var leftMenu;

	// Comprobamos si se accede a la página mediante un dispositivo táctil
	if (device.match(/Iphone/i)|| device.match(/Ipod/i)|| device.match(/Android/i)|| device.match(/J2ME/i)|| device.match(/BlackBerry/i)|| device.match(/iPhone|iPod/i)|| device.match(/Opera Mini/i)|| device.match(/IEMobile/i)|| device.match(/Mobile/i)|| device.match(/Windows Phone/i)|| device.match(/windows mobile/i)|| device.match(/windows ce/i)|| device.match(/webOS/i)|| device.match(/palm/i)|| device.match(/bada/i)|| device.match(/series60/i)|| device.match(/nokia/i)|| device.match(/symbian/i)|| device.match(/HTC/i)) {
		console.log("Movil");
		// Si es un móvil mostraremos el fondo estático de estrellas
		// y la información de los elementos del portfolio no tendrán
		// el efecto hover, si no que se verán directamente
		$("#estrellas").css({"opacity": "1"});
		$(".infoItem").css({"opacity": "1"});
	} else { // Si no es un móvil
		// Iniciamos el fondo de particles.js
		particlesJS("particles-js", {
"particles": {
    "number": {
    "value": 227,
    "density": {
        "enable": true,
        "value_area": 1025.8919341219544
    }
    },
    "color": {
    "value": "#ffffff"
    },
    "shape": {
    "type": "circle",
    "stroke": {
        "width": 0,
        "color": "rgba(138,160,186,0.7)"
    },
    "polygon": {
        "nb_sides": 4
    },
    "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
    }
    },
    "opacity": {
    "value": 1,
    "random": true,
    "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
    }
    },
    "size": {
    "value": 2,
    "random": true,
    "anim": {
        "enable": true,
        "speed": 2.4362316369040355,
        "size_min": 2.436231636904035,
        "sync": false
    }
    },
    "line_linked": {
    "enable": true,
    "distance": 60,
    "color": "#ffffff",
    "opacity": 0.22096133965703635,
    "width": 1
    },
    "move": {
    "enable": true,
    "speed": 1,
    "direction": "none",
    "random": true,
    "straight": false,
    "out_mode": "out",
    "bounce": false,
    "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
    }
    }
},
"interactivity": {
    "detect_on": "canvas",
    "events": {
    "onhover": {
        "enable": true,
        "mode": "bubble"
    },
    "onclick": {
        "enable": false,
        "mode": "repulse"
    },
    "resize": true
    },
    "modes": {
    "grab": {
        "distance": 207.079689136843,
        "line_linked": {
    "opacity": 1
        }
    },
    "bubble": {
        "distance": 60.90579092260088,
        "size": 3,
        "duration": 1.7053621458328247,
        "opacity": 0,
        "speed": 3
    },
    "repulse": {
        "distance": 400,
        "duration": 0.4
    },
    "push": {
        "particles_nb": 4
    },
    "remove": {
        "particles_nb": 2
    }
    }
},
"retina_detect": true
});

		// Los dos fondos de montañas (los de la parte posterior) serán fijos
		// para cambiar la velocidad con la que se mueven al hacer scroll (esto
		// no se hará en la versión móvil por rendimiento)
		$("#fondo1").css({"background-attachment": "fixed"});
		$("#fondo2").css({"background-attachment": "fixed"});

		// Cada vez que se haga scroll
		$(document).scroll(function() {
			// Obtenemos el valor del scroll
			var scrollTop = $(this).scrollTop();

			// Si el valor del scroll es menor que el alto de la página continuaremos.
			// Se establece así para que lo siguiente solo se ejecute cuando la cabecera
			// esté visible
			if(scrollTop < height) {
				// Movemos los fondos a una velocidad inferior a la del scroll para consegui el efecto parallax
				$("#fondo1").css({"background-position": "center bottom +" + (scrollTop/1.3) + "px"});
				$("#fondo2").css({"background-position": "center bottom +" + (scrollTop/1.1) + "px"});
			}
		});		
	}

	// Por cada barra de skill se mostrará la animación
	$('.skillbar').each(function(){
		$(this).find('.skillBarra').animate({
			width:$(this).attr('data-percent')
		},4000);
	});

	// También se mostrará una animación en el contador, que irá aumentando su valor
	$('.contador').each(function () {
		var $this = $(this);
		$({ Counter: 0 }).animate({ Counter: $this.text() }, {
			duration: 4000,
			easing: 'swing',
			step: function () {
				$this.text(Math.ceil(this.Counter));
			}
		});
	});

	/* 
	 * Smooth scrolling (transiciones al navegar entre las secciones de la página por el menú)
	 * https://css-tricks.com/snippets/jquery/smooth-scrolling/
	 */
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
				ocultarMenu();
				return false;
			}
		}
	});

	// Cuando se pulse sobre el botón del menú para abrirlo o cerrarlo
	$('#botonMenu').click(function() {
		ocultarMenu();
	});

	/**
	 * Función ocultarMenu
	 * Oculta o muestra el menú de navegación
	 */
	function ocultarMenu() {
		// Para mostrar el menú tendremos que cambiar el margen de este.
		// Como tenemos dos tipos de menú en función del ancho de la ventana, 
		// obtenemos este valor para establecer el margen que tendrá
		if ($(window).width() <= 768) {
			leftMenu = "-100vw";
		} else {
			leftMenu = "-15em";
		}

		// Creamos o eliminamos la clase 'open' del botón para que cambie de aspecto
		$('#botonMenu').toggleClass('open');

		// Si el margen de la barra es 0, se estará mostrando, por lo que cambiamos
		// su margen al calculado para ocultarla
		if ($("nav").css("left") == '0px') {
			$("nav").css({"left": leftMenu});
		} else { // Si la barra está oculta
			// Cambiamos su margen a 0 para mostrarla
			$("nav").css({"left": "0"});
		}
	}
});