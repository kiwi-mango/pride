const Intro = {
  render: () => {
    return `
      <div class="container">
        <div class="type-js headline">
          <p class="text-js">
            Gender is a tough subject to tackle. There are a lot of facets to consider, a lot of pressures at play,
            and we have all been conditioned in such a way that our first instinct is almost unanimously wrong.
            But we’re going to tackle it. No, we’re going to tackle the snot out of it.
            Coming to our aid, I would like to present to you: The Genderbread Person!
          </p>
        </div>
      </div>
    `
  },
  afterrender: () => {
    const url = window.location.href;
    console.log( );
    
    
    function autoType(elementClass, typingSpeed){
      var thhis = $(elementClass);
      var container = $(".container")
      var home = $(".home")
      thhis.css({
        "position": "relative",
        "display": "inline-block"
      });
      home.css({
        "display": "none"
      })
      thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
      thhis = thhis.find(".text-js");
      var text = thhis.text().trim().split('');
      var amntOfChars = text.length;
      var newString = "";
      thhis.text("|");
      setTimeout(function(){
        thhis.css("opacity",1);
        thhis.prev().removeAttr("style");
        thhis.text("");
        for(var i = 0; i < amntOfChars; i++){
          (function(i,char){
            setTimeout(function() {        
              newString += char;
              thhis.text(newString);
            },i*typingSpeed);
          })(i+1,text[i]);
        }
      },50);

      setTimeout(function() {
        window.location=`${url}#/home`
      }, 41000);
    }

    autoType(".type-js", 100);

  }
}

export default Intro;