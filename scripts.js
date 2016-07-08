loadJS("https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js");
loadJS("https://cdn.rawgit.com/mikeflynn/egg.js/master/egg.min.js");

var egggif = document.createElement("img");
egggif.src = "http://media.giphy.com/media/4hnQDVKVARZ6w/giphy.gif";
egggif.id = "egggif";
egggif.style.display = "none";

var egggif2 = document.createElement("img");
egggif2.src = "http://i.imgur.com/YsbKHg1.gif";
egggif2.id = "egggif2";
egggif2.style.display = "none";

var egggif3d = document.createElement("img");
egggif3d.src = "http://barkpost-assets.s3.amazonaws.com/wp-content/uploads/2013/11/3dDoge.gif";
egggif3d.id = "egggif3d";
egggif3d.style.display = "none";

document.getElementsByTagName("body")[0].appendChild(egggif);
document.getElementsByTagName("body")[0].appendChild(egggif2);
document.getElementsByTagName("body")[0].appendChild(egggif3d);

window.onload = function(){

    $("#egggif, #egggif2").css({
        "position": "absolute",
        "top": "33%",
        "left": "25%",
        "display": "none"
    });

    $("#egggif3d").css({
        "position": "absolute",
        "top": "25%",
        "left": "40%",
        "display": "none"
    });

    var egg = new Egg();
    egg.addCode("up,up,down,down,left,right,left,right,b,a", function() {
        jQuery('#egggif').fadeIn(500, function() {
            window.setTimeout(function() {
                jQuery('#egggif').hide();
            }, 5000);
        });
    }, "konami-code");

    egg.addCode("m,a,g,i,c", function() {
        $('#egggif2').fadeIn(500, function() {
            window.setTimeout(function () {
                $('#egggif2').hide();
            }, 3500);
        });
    }, "magic");

    egg.addHook(function(){
        console.log("Hook called for: " + this.activeEgg.keys);
        console.log(this.activeEgg.metadata);
    });
    egg.listen();

    var easter_egg = new MyEasterEgg();
    easter_egg.code = function () {
        $('#egggif3d').fadeIn(500, function() {
          window.setTimeout(function () {
            $('#egggif3d').hide();
          }, 5000);
        });
    }
    easter_egg.load();
};


function loadJS(src_js){
    var newJS = document.createElement("script");
    newJS.type = "text/javascript";
    newJS.src = src_js;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(newJS);
}


// Easter Egg que funfa com touch
var MyEasterEgg = function (callback) {
  var my_egg = {
    addEvent: function (obj, type, fn, ref_obj) {
      if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
      }
    },
    load: function (link) {
      this.touch_screen.load(link);
    },
    code: function (link) {
      window.location = link
    },
    touch_screen: {
      start_x: 0,
      start_y: 0,
      stop_x: 0,
      stop_y: 0,
      tap: false,
      capture: false,
      orig_keys: "",
      keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
      code: function (link) {
        my_egg.code(link);
      },
      load: function (link) {
        this.orig_keys = this.keys;
        my_egg.addEvent(document, "touchmove", function (e) {
          if (e.touches.length == 1 && my_egg.touch_screen.capture == true) {
            var touch = e.touches[0];
            my_egg.touch_screen.stop_x = touch.pageX;
            my_egg.touch_screen.stop_y = touch.pageY;
            my_egg.touch_screen.tap = false;
            my_egg.touch_screen.capture = false;
            my_egg.touch_screen.check_direction();
          }
        });
        my_egg.addEvent(document, "touchend", function (evt) {
          if (my_egg.touch_screen.tap == true) my_egg.touch_screen.check_direction(link);
        }, false);
        my_egg.addEvent(document, "touchstart", function (evt) {
          my_egg.touch_screen.start_x = evt.changedTouches[0].pageX;
          my_egg.touch_screen.start_y = evt.changedTouches[0].pageY;
          my_egg.touch_screen.tap = true;
          my_egg.touch_screen.capture = true;
        });
      },
      check_direction: function (link) {
        x_magnitude = Math.abs(this.start_x - this.stop_x);
        y_magnitude = Math.abs(this.start_y - this.stop_y);
        x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
        y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
        result = (x_magnitude > y_magnitude) ? x : y;
        result = (this.tap == true) ? "TAP" : result;

        if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
        if (this.keys.length == 0) {
          this.keys = this.orig_keys;
          this.code(link);
        }
      }
    }
  }

  typeof callback === "string" && my_egg.load(callback);
  if (typeof callback === "function") {
    my_egg.code = callback;
    my_egg.load();
  }

  return my_egg;
};
