var DETAIL_IMAGE_SELECTOR = '[data-image-role=\"target\"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role=\"title\"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role=\"frame\"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role=\"trigger\"]';
var PREVIOUS_DETAIL_SELECTOR = '[button-role=\"prev\"]';
var NEXT_DETAIL_SELECTOR = '[button-role=\"next\"]';
var CLICK_NUM = 0;
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
  }

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
  }

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
  }
function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
  }
function addThumbClickHandler(thumb){
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
  }
function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
  }
function trackIndexHandler(index){
    "use strict";
    return function() {
      CLICK_NUM = index;
    };
  }
function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
  }
function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
      }, 50);
  }
function nextDetail(){
    "use strict";
    var image = getThumbnailsArray();
  
    CLICK_NUM++;
    if (CLICK_NUM < image.length) {
      setDetailsFromThumb(image[CLICK_NUM]);
    } else {
      CLICK_NUM = 0;
      setDetailsFromThumb(image[CLICK_NUM]);
    }
}
function prevDetail() {
    "use strict";
    var image = getThumbnailsArray();

    if (CLICK_NUM > 0) {
        CLICK_NUM--;
    }
    else{
        CLICK_NUM = image.length - 1;
    }
    setDetailsFromThumb(image[CLICK_NUM]);
}
function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
      event.preventDefault();
      console.log(event.keyCode);
      if (event.keyCode === ESC_KEY) {
        hideDetails();
    }
    });
    
  }
function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    showDetails();

    for(var i=0; i < thumbnails.length; i++) {
        thumbnails[i].addEventListener("click", trackIndexHandler(i));
      }
    
    var nextButton = document.querySelector(NEXT_DETAIL_SELECTOR);
    nextButton.addEventListener("click", function() {
        nextDetail();
  });

    var previousButton = document.querySelector(PREVIOUS_DETAIL_SELECTOR);
    previousButton.addEventListener("click", function() {
       prevDetail();
  });

  }
initializeEvents();