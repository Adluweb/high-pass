window.addEventListener("DOMContentLoaded",function(){new Swiper(".mySwiper1",{direction:"horizontal",loop:!1,navigation:{nextEl:".next",prevEl:".prev"}}),new Swiper(".mySwiper2",{direction:"horizontal",loop:!1,navigation:{nextEl:".nexten",prevEl:".preven"}}),new Swiper(".mySwiper3",{direction:"horizontal",loop:!0,autoplay:{delay:2500,disableOnInteraction:!1}});ymaps.ready(function(){var e=new ymaps.Map("Mymap1",{center:[55.76376529517815,37.60349327907623],zoom:13}),t=new ymaps.Placemark([55.76990288813042,37.6385630165105],{},{iconLayout:"default#imageWithContent",iconImageHref:"./images/point.svg",iconImageSize:[14,14],iconImageOffset:[-24,-24]});e.geoObjects.add(t)});const e=document.querySelectorAll(".projects__button");e.forEach(function(t){t.addEventListener("click",function(t){e.forEach(function(e){e.classList.remove("is-active")}),this.classList.add("is-active")})});const t=document.querySelectorAll(".services__swiper-link");t.forEach(function(e){e.addEventListener("click",function(e){t.forEach(function(e){e.classList.remove("activen")}),this.classList.add("activen")})}),document.querySelector("#close").addEventListener("click",function(){document.querySelector("#menu").classList.toggle("min")}),document.querySelector("#burger-active").addEventListener("click",function(){document.querySelector("#burger").classList.toggle("header__burger-active")}),document.querySelector("#burger-close").addEventListener("click",function(){document.querySelector("#burger").classList.toggle("header__burger-active")}),document.querySelector(".header__svg").addEventListener("click",function(){document.querySelector("#search").classList.toggle("header__search-active")}),document.querySelector(".header__search-svg").addEventListener("click",function(){document.querySelector("#search").classList.toggle("header__search-active")})});
