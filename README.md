# SVG Slides

Turn an SVG file into a presentation.

This script takes an SVG file, and wraps it in some HTML and Javascript so you can use it as a presentation in a browser. It only does simple slide-per-slide navigation, no fancy animations.

Set your SVG document (Inkscape : Ctrl-Shift-D) to the size of your slides (e.g. 1024x768), and create your first slide within the bounding box of the document.

Then lay out your slides from left to right, so the second slides sits to the right of the document box, the third one to the right of that, etc.

Use the slidefy.rb script

```
slidefy.rb my_presentation.svg
```

and you will get a `my_presentation.html`. Make sure the svg-slides.js is available from whereever you intend to serve this.

Written as a quick hack so I could make my slides in my beloved inkscape with minimal fuzz. First used for RubyConf Argentina 2013.

For real prezzi like fanciness have a look at [Sozi](http://sozi.baierouge.fr/)

License : MIT.

## FAQ

### My text doesn't show up

See [this section in the Inkscape FAQ](http://wiki.inkscape.org/wiki/index.php/FAQ#What_about_flowed_text.3F). Inkscape has two types of text nodes, flowed and regular. Browsers can only display the regular type. Convert your text using "Convert to Text" in the Text menu, or convert to paths. The last option has the downside that you can no longer edit the text as text, but it has the upside that you're not depedent on fonts to be available.
