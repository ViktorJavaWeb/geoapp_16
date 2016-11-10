var teamBtn = document.querySelector('.team_change_wrap');  // тег по которому отслеживаем клик
teamBtn.addEventListener('click', function(event){ // отслеживаем событие клик по teamBtn
    var target = event.target;  // цель клика
    var checkClass = target.classList.contains('team_change'); // проверка, есть ли класс team_change у цели
    // если есть - вернутся true, если нет - вернется false 
    if(checkClass){ // если true, т.е. клик был по кнопке, наш случай
        var hasClass = target.classList.contains('team_change_on'); // проверка, есть ли у элемента, по которому был клик,
        //класс team_change_on. если есть - вернутся true (кнопка уже включена), если нет - вернется false (кнопка выключена) 
        
        if(!hasClass){
            var btnOn = teamBtn.querySelector('.team_change_on'); // отбор включенной кнопки
            btnOn.classList.remove('team_change_on');  // выключаем кнопку удалением класса team_change_on
            target.classList.add('team_change_on'); // включаем кнопку
            
            var targetId = target.id.slice(-1); // получил id элемента, по которому был клик
            
            var teamWrapOn = document.querySelector('.team_wrap_on');
            teamWrapOn.classList.remove('team_wrap_on');
            
            var teamWrapNew = document.getElementById('team_wrap_' + targetId);
            teamWrapNew.classList.add('team_wrap_on');
        }
    }
});

/* Появление паранджи в фото */
var teamFoto = document.querySelector('.megawrap');
teamFoto.addEventListener('mouseover', function(e){
    var target = e.target;
    var oldEl = e.relatedTarget;
    
    var checkFoto = target.classList.contains('team_item_foto');
    
    if(oldEl){
        var oldElClass = oldEl.classList.contains('team_item_mask');
    }else{
        var oldElClass = true;
    }
    
    if(checkFoto && !oldElClass){
        var paranjaOn = target.firstElementChild;
        
        var test = teamFoto.querySelectorAll('.team_item_mask');
        for(var i = 0; i < test.length; i++){
            test[i].classList.remove('team_item_mask_on');
        }
        
        paranjaOn.classList.add('team_item_mask_on');
    }
    //console.log(oldEl);
});

/* Скрытие паранджи в фото */
var paranja = document.querySelector('.megawrap');
paranja.addEventListener('mouseout', function(e){
    var target = e.target;
    var newEl = e.relatedTarget;
    
    if(newEl){
        var newElClass = newEl.classList.contains('team_item_mask');
    }else{
        var newElClass = true;
    }
    
    var checkFoto = target.classList.contains('team_item_foto');
    
    
    if(checkFoto && !newElClass){
        var paranjaOff = target.firstElementChild;
        paranjaOff.classList.remove('team_item_mask_on');
    }
    //console.log(oldEl);
});


/* счетчики */
var checkCnt = 0;
window.addEventListener('scroll', function(e){
    var container = document.querySelector('.counters_wrap').getBoundingClientRect();
    var viewportHeight = window.innerHeight;
    var delta = container.bottom - viewportHeight;
    
    if(!checkCnt && delta <= 0){
        checkCnt = 1;
        var counters = document.querySelectorAll('.counter_number');
        
        var timers = [];
        
        for(var i = 0; i < counters.length; i++){
            animateCnt(counters, i);
        }
        //console.log(counters);
    }
    function animateCnt(counters, i){
        var counter = counters[i];
        var cnt = +counter.id.substr(4);
        var j = 0;
        
        timers[i] = setInterval(function(){
            counter.innerHTML = j;
            
            j += 2;
            
            
            if(j > cnt){
                clearInterval(timers[i]);
                counter.innerHTML = cnt;
            }
        }, 4);
    } 
});

/* прокрутка отзывов */
var testiWrap = document.querySelectorAll('.testi_wrap');  //массив отзывов
var testiCnt = testiWrap.length;  // длина массива, т.е. кол-во отзывов

var testiWrapOn = document.querySelector('.testi_wrap_on'); //текущий отзыв
var testiWrapOnId = +testiWrapOn.id.substr(11); // id текущего отзыва

if(testiWrapOnId === 1){
    var testiBtnOff = document.getElementById('testi_btn_left');
}
if(testiWrapOnId === testiCnt){
    var testiBtnOff = document.getElementById('testi_btn_right');
}
testiBtnOff.classList.add('testi_check_img_off');

var testiBtn = document.querySelector('.testi_btn_wrap');  // вся область клика
testiBtn.addEventListener('click', function(event){ // клик  по выбранной области
    var testiTarget = event.target;  // цель клика
    var testiCheckClass = testiTarget.classList.contains('testi_btn'); // проверка наличия необходимого класса у цели
    var testiCheckClassOff = testiTarget.classList.contains('testi_check_img_off');
    // если есть - вернутся true, если нет - вернется false 
    
    if(testiCheckClass && !testiCheckClassOff){ // если true, т.е. клик был по кнопке, наш случай
        var testiId = testiTarget.id;  // id кнопки
        
        var testiWrapOn = document.querySelector('.testi_wrap_on'); //текущий отзыв
        var testiWrapOnId = +testiWrapOn.id.substr(11); // id текущего отзыва
        
        if(testiId === 'testi_btn_left'){ // если клик по левой - уменьшаем
            testiWrapOnId--;
        }
        if(testiId === 'testi_btn_right'){ // если клик по правой - увеличиваем отзыв
            testiWrapOnId++;
        }
    
        if(testiWrapOnId === 1){
            var testiBtnOff = document.getElementById('testi_btn_left');
        }
        if(testiWrapOnId === testiCnt){
            var testiBtnOff = document.getElementById('testi_btn_right');
        }
        
        var testiBtnOn = document.querySelector('.testi_check_img_off');
        
        if(testiBtnOn){
            testiBtnOn.classList.remove('testi_check_img_off');
        }
        
        if(testiBtnOff){
            testiBtnOff.classList.add('testi_check_img_off');
        }
        
        testiWrapOn.classList.remove('testi_wrap_on'); // скрываю текущий отзыв
        document.getElementById('testi_wrap_' + testiWrapOnId).classList.add('testi_wrap_on');  // открываю новый отзыв
    }
});

/* Ширина карты */
var winWidth = document.documentElement.clientWidth; // ширина видимой части окна
var contWidth = document.querySelector('.contacts .container').clientWidth;
var marRight = (winWidth - contWidth) / 2;

var formWidth = document.querySelector('.contacts_form').clientWidth;

var padRight = contWidth - formWidth;

var mapWidth = marRight + padRight - 30;

document.querySelector('.contacts iframe').width = mapWidth;


/* Предложение в состоянии наведения */
var offerWrap = document.querySelector('.offer_wrap'); //необх. область

function offerItemOff(offerItemOn){
    for(var i = 0; i < offerItemOn.length; i++){
        offerItemOn[i].classList.remove('offer_item_on');
    }
}

offerWrap.addEventListener('mouseover', function(event) { //наведение на необх.область
    var offerTarget  = event.target; //цель наведения
    var offerItem = offerTarget.classList.contains('offer_item'); //проверка необх.класса
    var offerItem2 = offerTarget.parentElement.classList.contains('offer_item');
    
    var offerItemOn = offerWrap.querySelectorAll('.offer_item_on');
    
    if(offerItem) {
        offerItemOff(offerItemOn);
        offerTarget.classList.add('offer_item_on'); // добавление  класса
    }
    if(offerItem2) {
        offerItemOff(offerItemOn);
        offerTarget.parentElement.classList.add('offer_item_on'); // добавление  класса
    }
//console.log(1);
});

offerWrap.addEventListener('mouseout', function(event) { //уведение с области
    var offerTarget  = event.target; //цель уведения
    var offerItem = offerTarget.classList.contains('offer_item'); //проверка необх.класса
    if(offerItem) {
        offerTarget.classList.remove('offer_item_on'); // удаление  класса
    }
//console.log(1);

});

/* POPUP */
var popupBtn = document.querySelector('.header_btn');
popupBtn.addEventListener('click', function(e){
    var overlay = document.querySelector('.overlay');
    overlay.style.display = 'block';
});

var popupClose = document.querySelector('.popup_close');
popupClose.addEventListener('click', function(e){
    var overlay = document.querySelector('.overlay');
    overlay.style.display = '';
});

var popupSubmit = document.querySelector('.popup_form button');
popupSubmit.addEventListener('click', function(e){
    e.preventDefault();
    
    var login = document.querySelector('.popup_form input[type="text"]').value;
    
    var error = '';
    if(!login){
        var x1 = 'Не заполнено поле Login';
        error = error + x1;
    }
    
    
    if(!error){
        console.log('отправка данных');
        var overlay = document.querySelector('.overlay');
        overlay.style.display = '';
    }else{
        alert(error);
    }
});


/*Locations*/
// var viewContainer = window.innerHeight;// высота окна

window.addEventListener('scroll', function (event) {
    var container = document.querySelector('.container').getBoundingClientRect(); // размер данного контейнера
    var df = container.bottom; // нижнее значения container = 0 где-0 значение когда оно становиться в самом верху;
    var buttonOn = document.querySelector('.buttonUp');
    if (df < 0 ? buttonOn.classList.add('buttonUp_on') : buttonOn.classList.remove('buttonUp_on'));

});

var upBtn = document.querySelector('.buttonUp');
upBtn.addEventListener('click', function (event) {
    up(event.target);
});

function up() {
    var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
    if(top) {
        window.scrollBy(0,-100);
        t = setTimeout('up()',10);
    } else clearTimeout(t);
    return false;
}



//About

var features = document.querySelector('.features');
features.addEventListener('click', function (event) {
    var featuresTarget = event.target;
    var r = document.querySelector('.team');
    r.scrollIntoView();



})































/*

//выбираем нужные элементы
var a = document.querySelectorAll('.link');

//перебираем все найденные элементы и вешаем на них события
[].forEach.call( a, function(el) {
    //вешаем событие
    el.click = function(e) {
        //производим действия
    }
});

*/

/*
window.onload = function()
{
    document.getElementById('bottom').scrollIntoView(true);
}


*/

//his.scrollIntoView();
/*
 about
 features
 pricing
 screenshots
 contact

 */