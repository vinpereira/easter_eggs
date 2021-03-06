loadJS("https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js");
loadJS("https://cdn.rawgit.com/mikeflynn/egg.js/master/egg.min.js");

// konami code
var options = {
    src: "imgs/konami-code.gif",
    id: "egggif",
    styles:{
        display: "none",
        position: "absolute",
        top: "33%",
        left: "25%"
    }
};
loadImgTag(options);

// magic
options.src = "imgs/magic.gif";
options.id = "egggif2";
options.styles = {
    display: "none",
    position: "absolute",
    top: "33%",
    left: "35%"
};
loadImgTag(options);


// 3d touch
options.src = "imgs/3Ddog.gif";
options.id = "egggif3d";
options.styles = {
    display: "none",
    position: "absolute",
    top: "25%",
    left: "40%"
};
loadImgTag(options);


// dinofauro
var egggif4_container = document.createElement("div");
egggif4_container.id = 'egggif4_container';
egggif4_container.style.display = "none";
egggif4_container.style.position = "absolute";
egggif4_container.style.bottom = "0";
egggif4_container.style.right = "-300px";
egggif4_container.style.width = "300px";
egggif4_container.style.display = "none";

var egggif4_title = document.createElement("h1");
egggif4_title.innerHTML = "ICOLAFORA";
egggif4_title.style.color = "orange";
egggif4_title.style.fontSize = "50px";
egggif4_title.style.fontWeight = "bold";
egggif4_container.appendChild(egggif4_title);

var egggif4 = document.createElement("img");
egggif4.src = "imgs/dinofauro.jpg";
egggif4.id = "egggif4";
egggif4.style.width = "250px";
egggif4.style.height = "250px";
egggif4_container.appendChild(egggif4);
document.getElementsByTagName("body")[0].appendChild(egggif4_container);


// jequiti
options.src = "imgs/jequiti.jpeg";
options.id = "egg_jequiti";
options.styles = {
    display: "none",
    position: "absolute",
    width: "100%",
    height: "100%"
};
loadImgTag(options);

// ta pronto
options.src = "imgs/tapronto.gif";
options.id = "egggif5";
options.styles = {
    display: "none",
    position: "absolute",
    top: "33%",
    left: "25%"
};
loadImgTag(options);


window.onload = function(){

    var egg = new Egg();
    egg.addCode("up,up,down,down,left,right,left,right,b,a", function() {
        $('#egggif').fadeIn(500, function() {
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

    egg.addCode("d,i,n,o,f,a,u,r,o", function() {
        $('#egggif4_container').show(200).animate({
            "right": "110%"
        }, 3500);
        window.setTimeout(function () {

            $('#egggif4_container').hide(100).css({
                "right": "-300px"
            });
        }, 5000);
    }, "dinofauro");

    egg.addCode("j,e,q,u,i,t,i", function() {
        $('#egg_jequiti').show(5, function() {
            window.setTimeout(function() {
                $('#egg_jequiti').hide();
            }, 500);
        });
    }, "jequiti");

    egg.addCode("t,a,p,r,o,n,t,o", function() {
        $('#egggif5').fadeIn(500, function() {
            window.setTimeout(function () {
                $('#egggif5').hide();
            }, 3500);
        });
    }, "ta-pronto");

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
    newJS.assync = "true";
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(newJS);
}

function loadImgTag(options){
    var imgTag = document.createElement("img");
    imgTag.src = options.src;
    imgTag.id = options.id;
    for(prop in options.styles){
        imgTag.style[prop] = options.styles[prop];
    }
    document.getElementsByTagName("body")[0].appendChild(imgTag);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
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
