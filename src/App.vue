<template>
	<div class="container-outer course-study-outer">
		<p class='height_window'></p>
		<div class="container-inner course-study-inner"><div data-level="1" class="study-catalog-wrapper"><div data-course="423" class="study-category__window-slide" style="display: block;"><div class="window-slide__study-array"><div data-id="424" data-index="1" class="study-block course_item"><div data-icon-bright="1" class="study-block__image dark" style="background-color: rgb(255, 168, 0);"><img src="https://bilimland.kz/upload/content/structure/499/icon/21a239c34e07db87841ef840ed9ca625.svg" alt="Логоритмика - Bilimland.kz" title="Логоритмика"> <div class="study-block__lesson-counter"><span class="study-block__lesson-digit">29</span> <span class="study-block__lesson-name">lesson</span></div> <div class="__title">Логоритмика</div> <div class="__triangle" style="border-top-color: rgb(255, 168, 0);"></div></div></div> <div data-id="463" data-index="2" class="study-block course_item"><div data-icon-bright="1" class="study-block__image dark" style="background-color: rgb(255, 168, 0);"><img src="https://bilimland.kz/upload/content/structure/537/icon/0ac0e3a0fd82f77553e84828029fe52c.svg" alt="Мектепке дайындық - Bilimland.kz" title="Мектепке дайындық"> <div class="study-block__lesson-counter"><span class="study-block__lesson-digit">30</span> <span class="study-block__lesson-name">lesson</span></div> <div class="__title">Мектепке дайындық</div> <div class="__triangle" style="border-top-color: rgb(255, 168, 0);"></div></div></div> <div data-id="470" data-index="3" class="study-block course_item"><div data-icon-bright="1" class="study-block__image dark" style="background-color: rgb(255, 168, 0);"><img src="https://bilimland.kz/upload/content/structure/544/icon/e530d9fbff9fdba09418153a8e8182d7.svg" alt="Тәй-тәй - Bilimland.kz" title="Тәй-тәй"> <div class="study-block__lesson-counter"><span class="study-block__lesson-digit">54</span> <span class="study-block__lesson-name">lesson</span></div> <div class="__title">Тәй-тәй</div> <div class="__triangle" style="border-top-color: rgb(255, 168, 0);"></div></div></div> <div data-id="481" data-index="4" class="study-block course_item"><div data-icon-bright="1" class="study-block__image dark" style="background-color: rgb(255, 168, 0);"><img src="https://bilimland.kz/upload/content/structure/549/icon/cc1f881988078b65b2c519d3b076187e.svg" alt="Сөйлейтін суреттер - Bilimland.kz" title="Сөйлейтін суреттер"> <div class="study-block__lesson-counter"><span class="study-block__lesson-digit">14</span> <span class="study-block__lesson-name">lesson</span></div> <div class="__title">Сөйлейтін суреттер</div> <div class="__triangle" style="border-top-color: rgb(255, 168, 0);"></div></div></div> <div data-id="485" data-index="5" class="study-block course_item"><div data-icon-bright="1" class="study-block__image dark" style="background-color: rgb(255, 168, 0);"><img src="https://bilimland.kz/upload/content/structure/550/icon/c838d9559974611050448c3359220363.svg" alt="Сөз ойындары - Bilimland.kz" title="Сөз ойындары"> <div class="study-block__lesson-counter"><span class="study-block__lesson-digit">13</span> <span class="study-block__lesson-name">lesson</span></div> <div class="__title">Сөз ойындары</div> <div class="__triangle" style="border-top-color: rgb(255, 168, 0);"></div></div></div> <div data-id="935" data-index="6" class="study-block course_item"><div data-icon-bright="" class="study-block__image dark" style="background-color: rgb(255, 168, 0);"><img src="https://bilimland.kz/upload/content/structure/1442/icon/0b17c2b48fca3ba49402c8be732df81d.svg" alt="Қара да айт! - Bilimland.kz" title="Қара да айт!"> <div class="study-block__lesson-counter"><span class="study-block__lesson-digit">30</span> <span class="study-block__lesson-name">lesson</span></div> <div class="__title">Қара да айт!</div> <div class="__triangle" style="border-top-color: rgb(255, 168, 0);"></div></div></div></div></div></div></div>
		<app-home></app-home>
		<p class='height_window'></p>
	</div>
</template>
<script>
	import $ from "jquery";
 	import Home from './views/Home'

	export default {
 	components: {'app-home':Home},

	data:()=>({

  }),
};

 $(function() {


   /*=============================study-block=======================================*/
   let studyContainer = false,
     activeContainer = false,
     studyLvl = false,
     maxLvl = 5,
     speedScrollLvl = 300,
     course_item = $('.course_item');

   function _clearStudyCourse(iMaxLvl, callback) {
     if (iMaxLvl > studyLvl) {
       if ($(studyContainer).find('[data-level="' + iMaxLvl + '"]').length > 0) {
         $(studyContainer).find('[data-level="' + iMaxLvl + '"]').slideUp(speedScrollLvl / 1.5, function () {

           $(this).remove();
           iMaxLvl -= 1;
           _clearStudyCourse(iMaxLvl, callback);
         });
       } else {
         iMaxLvl -= 1;
         _clearStudyCourse(iMaxLvl, callback);
       }
     } else {
       callback();
     }
   }

   function _showStudyCourseBlock(object, courseId, lastBlock) {
     _clearStudyCourse(maxLvl, function () {
       _transporterStudyCourse(courseId, lastBlock, true);
       $('html, body').animate({
           scrollTop: (object.offset().top - 80)
         },
         400,
         function () {


           _showStudyContainer(courseId, true);
         });
     });
   }

   function _transporterStudyCourse(numId, lastInString, bool) {
     if (bool) {
       activeContainer = $('#study-cat-wrapper').children('[data-course="' + numId + '"]').clone(true);
       $(studyContainer).children('[data-index="' + lastInString + '"]').after(activeContainer);
     } else {
       $(studyContainer).children('[data-course="' + numId + '"]').remove();
     }
   }

   function _showStudyContainer(numId, bool) {
     if (bool) {
       $('[data-course="' + numId + '"]').slideDown(speedScrollLvl);
     } else {
       $('[data-course="' + numId + '"]').slideUp(speedScrollLvl);
     }
   }

   $('body').on('click', '.course_item', function(e) {
     e.preventDefault();
     let object = $(e.currentTarget);
     let objectID = object.data('id');
     studyLvl = object.closest('[data-level]').data('level');



     let countBlocks = object.parent().children('.study-block').length;  // кол-во блоков в контейнере
     let indexBlock = object.data('index');                                    // номер текущего объекта
     let widthWrapper = object.parent().innerWidth();                          // ширина контейнера
     let widthBlock = object.outerWidth(true);                                 // ширина текущего объекта
     let numBlocksInString = parseInt(widthWrapper / widthBlock);           // кол-во блоков в одной строке
     let numOfString = Math.ceil(indexBlock / numBlocksInString);           // номер строки
     let numLastBlockInString = numOfString * numBlocksInString;               // номер последнего блока в строке
     let countBlocksChildren = $('[data-course="' + objectID + '"]').find('.course_item').length;    // кол-во блоков у выбранного контейнера
     let countStrings = Math.ceil(countBlocksChildren / numBlocksInString);                              // кол-во строк у выбранного контейнера

     studyContainer = object.parent();

     if (numLastBlockInString > countBlocks) {

       numLastBlockInString = countBlocks;
     }

     if (object.hasClass('is-active')) {

       _clearStudyCourse(maxLvl, function () {
         object.removeClass('is-active');
         console.log(studyContainer)
         // studyContainer.removeClass('is-active');
       });
     }
     else {
       //Визуальное выделение активного блока

       // object.parent().children('.study-block').removeClass('is-active');
       object.parent().addClass('is-active');
       object.addClass('is-active');
       _showStudyCourseBlock(object, objectID, numLastBlockInString);
     }
   });
   /*====================================================================*/

 });



</script>
