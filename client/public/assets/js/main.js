(function ($) {
    "use strict";


    /*------------------------------------------------
       * Preloader 
       ------------------------------------------------*/
    $(window).on('load', function () {
        $('#loading').fadeOut();
        $('#preloader').delay(300).fadeOut('slow');
    });


    // skill
    $(".skill-per").each(function () {
        var $this = $(this);
        var id = $this.attr("id");
        $this.css("width", id + "%");
        $({
            animatedValue: 0
        }).animate({
            animatedValue: id
        }, {
            duration: 1000,
            step: function () {
                $this.attr("id", Math.floor(this.animatedValue) + "%");
            },
            complete: function () {
                $this.attr("id", Math.floor(this.animatedValue) + "%");
            }
        });
    });

    // marquee
    let SwiperTop = new Swiper(".swiper--top", {
        spaceBetween: 0,
        centeredSlides: true,
        speed: 15000,
        autoplay: {
            delay: 0
        },
        loop: true,
        slidesPerView: "auto",
        allowTouchMove: false,
        disableOnInteraction: true
    });

    let SwiperBottom = new Swiper(".swiper--bottom", {
        spaceBetween: 0,
        centeredSlides: true,
        speed: 6000,
        autoplay: {
            delay: 1,
            reverseDirection: true
        },
        loop: true,
        loopedSlides: 4,
        slidesPerView: "auto",
        allowTouchMove: false,
        disableOnInteraction: true
    });


    // sticky
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll < 200) {
            $("#header-sticky").removeClass("sticky-menu");
        } else {
            $("#header-sticky").addClass("sticky-menu");
        }
    });

    // RESPONSIVE MENU
    $('.responsive').on('click', function (e) {
        $('#mobile-menu').slideToggle();
    });

    // meanmenu
    $('#mobile-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "992"
    });

    $('.info-bar').on('click', function () {
        $('.extra-info').addClass('info-open');
    })

    $('.close-icon').on('click', function () {
        $('.extra-info').removeClass('info-open');
    })

    // offcanvas menu
    $(".menu-tigger").on("click", function () {
        $(".offcanvas-menu,.offcanvas-overly").addClass("active");
        return false;
    });
    $(".menu-close,.offcanvas-overly").on("click", function () {
        $(".offcanvas-menu,.offcanvas-overly").removeClass("active");
    });



    // menu toggle
    $(".main-menu li a").on('click', function () {
        if ($(window).width() < 700) {
            $("#mobile-menu").slideUp();
        }
    });

    // smoth scroll
    $(function () {
        $('a.smoth-scroll').on('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 100
            }, 1000);
            event.preventDefault();
        });
    });

    // mainSlider
    function mainSlider() {
        var BasicSlider = $('.slider-active');
        BasicSlider.on('init', function (e, slick) {
            var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });
        BasicSlider.slick({
            autoplay: true,
            autoplaySpeed: 10000,
            dots: true,
            fade: true,
            arrows: false,
            prevArrow: '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        dots: false,
                        arrows: false
                    }
                }
		]
        });

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }
    }
    mainSlider();


    // services-active
    $('.services-active').slick({
        dots: true,
        infinite: true,
        arrows: false,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
		},
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
		},
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
		}
	]
    });

    // team-active
    $('.team-active').slick({
        dots: false,
        infinite: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa-light fa-arrow-left-long"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa-light fa-arrow-right-long"></i></button>',
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
		},
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
		},
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
		}
	]
    });
    // portfolio-active
    $('.class-active').slick({
        dots: false,
        infinite: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
		},
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
		},
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
		}
	]
    });
    // portfolio-active
    $('.portfolio-active').slick({
        dots: false,
        infinite: true,
        arrows: false,
        prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
		},
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
		},
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
		}
	]
    });

    // brand-active
    $('.brand-active').slick({
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                }
		},
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
		},
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
		},
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
		},
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
		}
	]
    });

    // testimonial-active
    $('.testimonial-active').slick({
        dots: false,
        infinite: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-arrow-right"></i></button>',
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
		},
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
		},
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
		}
	]
    });
    // testimonial-active
    $('.testimonial-active2').slick({
        dots: false,
        autoplay: false,
        autoplaySpeed: 1500,
        infinite: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa-light fa-arrow-left-long"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa-light fa-arrow-right-long"></i></button>',
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
		},
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
		},
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
		}
	]
    });

    // testimonial-active2

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        variableWidth: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
    });
    // home-blog-active
    $('.home-blog-active').slick({
        dots: false,
        infinite: true,
        arrows: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><i class="far fa-long-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="far fa-long-arrow-right"></i></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
		},
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
		},
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
		}
	]
    });

    // home-blog-active
    $('.home-blog-active2').slick({
        dots: false,
        infinite: true,
        arrows: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
		},
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
		},
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
		}
	]
    });




    // blog
    $('.blog-active').slick({
        dots: false,
        infinite: true,
        arrows: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
    });




    // counterUp

    $('.count').counterUp({
        delay: 100,
        time: 1000
    });

    /* magnificPopup img view */
    $('.popup-image').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /* magnificPopup video view */
    $('.popup-video').magnificPopup({
        type: 'iframe'
    });

    // paroller
    if ($('.paroller').length) {
        $('.paroller').paroller();
    }

    //* Parallaxmouse js
    function parallaxMouse() {
        if ($('#parallax').length) {
            var scene = document.getElementById('parallax');
            var parallax = new Parallax(scene);
        };
    };
    parallaxMouse();

    // service active
    $('.s-single-services').on('mouseenter', function () {
        $(this).addClass('active').parent().siblings().find('.s-single-services').removeClass('active');
    })

    // scrollToTop
    $.scrollUp({
        scrollName: 'scrollUp',
        topDistance: '300',
        topSpeed: 300,
        animation: 'fade',
        animationInSpeed: 200,
        animationOutSpeed: 200,
        scrollText: '<i class="fas fa-level-up-alt"></i>',
        activeOverlay: false,
    });


    // isotop
    $('.grid').imagesLoaded(function () {
        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: 1
            }
        });

        // filter items on button click
        $('.button-group').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
        });

    });
    // isotop
    $(".element").each(function () {
            var a = $(this);
            a.typed({
                strings: a.attr("data-elements").split(","),
                typeSpeed: 100,
                backDelay: 3e3
            })
        }),
        //for menu active class
        $('.button-group > button').on('click', function (event) {
            $(this).siblings('.active').removeClass('active');
            $(this).addClass('active');
            event.preventDefault();
        });

    // WOW active
    new WOW().init();


    /* Text Effect Animation */
    if ($('.text-anime-style-1').length) {
        let staggerAmount = 0.05,
            translateXValue = 0,
            delayValue = 0.5,
            animatedTextElements = document.querySelectorAll('.text-anime-style-1');

        animatedTextElements.forEach((element) => {
            let animationSplitText = new SplitText(element, {
                type: "chars, words"
            });
            gsap.from(animationSplitText.words, {
                duration: 1,
                delay: delayValue,
                x: 20,
                autoAlpha: 0,
                stagger: staggerAmount,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%"
                },
            });
        });
    }

    if ($('.text-anime-style-2').length) {
        let staggerAmount = 0.05,
            translateXValue = 20,
            delayValue = 0.5,
            easeType = "power2.out",
            animatedTextElements = document.querySelectorAll('.text-anime-style-2');

        animatedTextElements.forEach((element) => {
            let animationSplitText = new SplitText(element, {
                type: "chars, words"
            });
            gsap.from(animationSplitText.chars, {
                duration: 1,
                delay: delayValue,
                x: translateXValue,
                autoAlpha: 0,
                stagger: staggerAmount,
                ease: easeType,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%"
                },
            });
        });
    }

    if ($('.text-anime-style-3').length) {
        let animatedTextElements = document.querySelectorAll('.text-anime-style-3');

        animatedTextElements.forEach((element) => {
            //Reset if needed
            if (element.animation) {
                element.animation.progress(1).kill();
                element.split.revert();
            }

            element.split = new SplitText(element, {
                type: "lines,words,chars",
                linesClass: "split-line",
            });
            gsap.set(element, {
                perspective: 400
            });

            gsap.set(element.split.chars, {
                opacity: 0,
                x: "50",
            });

            element.animation = gsap.to(element.split.chars, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%"
                },
                x: "0",
                y: "0",
                rotateX: "0",
                opacity: 1,
                duration: 1,
                ease: Back.easeOut,
                stagger: 0.02,
            });
        });
    }


    //Tabs Box
    if ($('.tabs-box').length) {
        $('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
            e.preventDefault();
            var target = $($(this).attr('data-tab'));

            if ($(target).is(':visible')) {
                return false;
            } else {
                target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
                target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
                $(target).fadeIn(300);
                $(target).addClass('active-tab animated fadeIn');
            }
        });
    }

    /*
    -----------------------------------------------------
    Gsap
    ----------------------------------------------------- 
    */
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const fadeItems = document.querySelectorAll(".fade");
    fadeItems.forEach((fadeItem) => {
        let startPosition = "top 90%",
            tweenOptions = {
                duration: 1.5,
                delay: 0.5,
                scrub: 1.9,
                opacity: 1,
            };

        let timeline = gsap.timeline({
            scrollTrigger: {
                trigger: fadeItem,
                start: startPosition,
                markers: false,
            },
        });
        timeline.to(fadeItem, tweenOptions);
    });

    const fadeSlideItems = document.querySelectorAll(".fade-slide");

    fadeSlideItems.forEach((fadeSlideItem) => {
        let slideAmount = 80,
            startPosition = "top 90%",
            tweenOptions = {
                duration: 1.3,
                delay: 0.5,
                opacity: 0,
                ease: "power2.out",
            };

        if (fadeSlideItem.hasAttribute("data-slide-amount")) {
            slideAmount = fadeSlideItem.getAttribute("data-slide-amount");
        }

        if (fadeSlideItem.hasAttribute("data-opacity")) {
            tweenOptions.opacity = fadeSlideItem.getAttribute("data-opacity");
        }

        if (fadeSlideItem.hasAttribute("data-ease")) {
            tweenOptions.ease = fadeSlideItem.getAttribute("data-ease");
        }

        if (fadeSlideItem.hasAttribute("data-duration")) {
            tweenOptions.duration = fadeSlideItem.getAttribute("data-duration");
        }

        if (fadeSlideItem.hasAttribute("data-delay")) {
            tweenOptions.delay = fadeSlideItem.getAttribute("data-delay");
        }

        if (fadeSlideItem.classList.contains("right")) {
            tweenOptions.x = slideAmount;
        }

        if (fadeSlideItem.classList.contains("left")) {
            tweenOptions.x = -slideAmount;
        }

        if (fadeSlideItem.classList.contains("top")) {
            tweenOptions.y = -slideAmount;
        }

        if (fadeSlideItem.classList.contains("bottom")) {
            tweenOptions.y = slideAmount;
        }

        let timeline = gsap.timeline({
            scrollTrigger: {
                trigger: fadeSlideItem,
                start: startPosition,
                markers: false,
            },
        });
        timeline.from(fadeSlideItem, tweenOptions);
    });

    const splitChars = document.querySelectorAll(".split_chars");

    splitChars.forEach((item) => {
        let isScrollAble = true,
            tweenOptions = {
                duration: 1.3,
                delay: 0.5,
                autoAlpha: 0,
                stagger: 0.15,
                ease: "power2.out",
            },
            scrollTrigger = {
                trigger: item,
                start: "top 90%",
                markers: false,
            };

        if (item.hasAttribute("data-duration")) {
            tweenOptions.duration = item.getAttribute("data-duration");
        }

        if (item.hasAttribute("data-delay")) {
            tweenOptions.delay = item.getAttribute("data-delay");
        }

        if (item.hasAttribute("data-ease")) {
            tweenOptions.ease = item.getAttribute("data-ease");
        }

        if (item.hasAttribute("data-stagger")) {
            tweenOptions.stagger = item.getAttribute("data-stagger");
        }

        if (item.hasAttribute("data-translateX")) {
            tweenOptions.x = item.getAttribute("data-translateX");
        }

        if (item.hasAttribute("data-translateY")) {
            tweenOptions.y = item.getAttribute("data-translateY");
        }

        if (
            !item.hasAttribute("data-translateX") &&
            !item.hasAttribute("data-translateX")
        ) {
            tweenOptions.x = 100;
        }

        if (item.hasAttribute("data-scroll-trigger")) {
            isScrollAble = item.getAttribute("data-scroll-trigger");
        }

        if (item.hasAttribute("data-trigger-start")) {
            scrollTrigger.start = item.getAttribute("data-trigger-start");
        }

        if (isScrollAble) {
            tweenOptions.scrollTrigger = scrollTrigger;
        }

        let splittedText = new SplitText(item, {
            type: "chars, words",
        });

        gsap.from(splittedText.chars, tweenOptions);
    });

    const moveLine3DItems = document.querySelectorAll(".move-line-3d");

    moveLine3DItems.forEach((item) => {
        let startPosition = "top 90%",
            tweenOptions = {
                duration: 1,
                delay: 0.3,
                opacity: 0,
                rotationX: -80,
                force3D: true,
                transformOrigin: "top center -50",
                stagger: 0.1,
            };

        if (item.hasAttribute("data-start")) {
            startPosition = item.getAttribute("data-start");
        }

        if (item.hasAttribute("data-duration")) {
            tweenOptions.duration = item.getAttribute("data-duration");
        }

        if (item.hasAttribute("data-delay")) {
            tweenOptions.delay = item.getAttribute("data-delay");
        }

        if (item.hasAttribute("data-opacity")) {
            tweenOptions.opacity = item.getAttribute("data-opacity");
        }

        if (item.hasAttribute("data-stagger")) {
            tweenOptions.stagger = item.getAttribute("data-stagger");
        }

        if (item.hasAttribute("data-rotate")) {
            tweenOptions.rotationX = item.getAttribute("data-rotate");
        }

        if (item.hasAttribute("data-origin")) {
            tweenOptions.transformOrigin = item.getAttribute("data-origin");
        }

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: startPosition,
                duration: tweenOptions.duration,
                scrub: false,
                markers: false,
            },
        });

        const splitedText = new SplitText(item, {
            type: "lines",
        }).split({
            type: "lines",
        });
        gsap.set(item, {
            perspective: 400,
        });
        timeline.from(splitedText.lines, tweenOptions);
    });


    //ticker

    document.addEventListener('DOMContentLoaded', () => {
        const durationOffset = window.innerWidth < 768 ? 50 : 100;

        document.querySelectorAll('.ticker').forEach(ticker => {
            if (!ticker.querySelector('.ticker__text')) {
                const tickerRun = ticker.querySelector('.ticker__run');
                const tickerText = tickerRun.innerHTML;
                const tickerTextSection = `<span class="ticker__text">${tickerText}</span>`;

                tickerRun.innerHTML = `${tickerTextSection}${tickerTextSection}`;
            }

            // Initial animation to set opacity
            gsap.to(ticker, {
                y: 0,
                duration: 0.5,
                opacity: 0,
                onComplete: () => {
                    const tickerRun = ticker.querySelector('.ticker__run');
                    const textSections = tickerRun.querySelectorAll('span.ticker__text');
                    const tickerInnerWidth = textSections[0].offsetWidth;
                    const tickerScrollSpanCount = textSections.length;
                    const tickerScrollSpanWidth = tickerInnerWidth * tickerScrollSpanCount;
                    const tickerScrollWidth = -tickerInnerWidth;
                    const tickerDuration = Math.abs(tickerScrollSpanWidth / tickerScrollSpanCount - tickerScrollSpanWidth / (tickerScrollSpanCount - 1)) / 50;

                    let direction = `+=${tickerScrollWidth}`;
                    if (ticker.classList.contains('arabic')) {
                        direction = `-=${tickerScrollWidth}`;
                    }

                    gsap.to(tickerRun, {
                        x: direction,
                        ease: 'none',
                        duration: tickerDuration,
                        repeat: -1,
                        modifiers: {
                            x: gsap.utils.unitize(x => parseFloat(x) % tickerScrollWidth)
                        }
                    });

                    gsap.to(ticker, {
                        y: 0,
                        duration: 0.5,
                        opacity: 1
                    });
                }
            });
        });
    });


})(jQuery);
