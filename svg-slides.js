var SvgSlides = (function() {
  'use strict';

  var currentSlide = 0;

  function initialize() {
    document.addEventListener( 'keydown', onDocumentKeyDown, false );
    var num = parseInt(window.location.hash.replace(/#/, ''));
    if (isNaN(num)) {
      slide(0);
    } else {
      slide(num);
    }
    center();
  }

  function svg() {
    return document.getElementsByTagName('svg')[0];
  }

  function wrapper() {
    return document.getElementById('wrapper');
  }

  function center() {
    wrapper().style.position   = 'absolute'
    wrapper().style.top        = '50%';
    wrapper().style.left       = '50%';
    wrapper().style.marginLeft = '-' + slideWidth() / 2;
    wrapper().style.marginTop  = '-' + slideHeight() / 2;
  }

  function slideWidth() {
    return svg().getAttribute('width');
  }

  function slideHeight() {
    return svg().getAttribute('height');
  }

  function slide(n) {
    currentSlide = n;
    updateViewbox(n * slideWidth(), 0, slideWidth(), slideHeight());
    window.location.hash = '#' + n
  }

  function updateViewbox(x, y, w, h) {
    svg().setAttribute('viewBox', [x, y, w, h].join(' '))
  }

  function navigatePrev() {
    slide( currentSlide - 1);
  }

  function navigateNext() {
    slide( currentSlide + 1);
  }

  function onDocumentKeyDown( event ) {
    // Disregard the event if there's a focused element or a
    // keyboard modifier key is present
    if( (event.shiftKey && event.keyCode !== 32) || event.altKey || event.ctrlKey || event.metaKey ) return;

    var triggered = true;

    switch( event.keyCode ) {
    case 80: //p
    case 33: //page up
    case 37: //left
      navigatePrev();
      break;
    case 78: //n
    case 34: //page down
    case 32: //space
    case 39: //right
      navigateNext();
      break;
      // h, left
    // case 72: case 37: navigateLeft(); break;
    //   // l, right
    // case 76: case 39: navigateRight(); break;
    //   // k, up
    // case 75: case 38: navigateUp(); break;
    //   // j, down
    // case 74: case 40: navigateDown(); break;

    case 36: // home
    case 48: // 0
      slide(0);
      break;
    //   // end
    // case 35: slide( Number.MAX_VALUE ); break;
    //   // space
    // case 32: isOverview() ? deactivateOverview() : event.shiftKey ? navigatePrev() : navigateNext(); break;
    //   // return
    // case 13: isOverview() ? deactivateOverview() : triggered = false; break;
    //   // b, period, Logitech presenter tools "black screen" button
    // case 66: case 190: case 191: togglePause(); break;
    //   // f
    // case 70: enterFullscreen(); break;
    default:
      triggered = false;
    }

    // If the input resulted in a triggered action we should prevent
    // the browsers default behavior
    if( triggered ) {
      event.preventDefault();
    }
    else if ( event.keyCode === 27 && supports3DTransforms ) {
      toggleOverview();

      event.preventDefault();
    }

  }

  return {
    initialize: initialize,
    svg: svg,
    slideWidth: slideWidth,
    slideHeight: slideHeight,
    slide: slide,
    updateViewbox: updateViewbox,
    navigatePrev: navigatePrev,
    navigateNext: navigateNext
  }
})();
