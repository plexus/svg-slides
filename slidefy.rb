#!/usr/bin/env ruby

require 'pathname'

$:.unshift Pathname(ENV['HOME']).join('github/hexp/lib')

require 'hexp'
require 'pathname'

INFILE  = Pathname(ARGV[0])
OUTFILE = INFILE.sub(/\.svg$/, '.html')

unless INFILE && INFILE.extname == '.svg'
  $stderr.puts "Usage: #{__FILE__} slides.svg"
  exit 1
end

TEMPLATE = Hexp.parse(DATA)
SVG      = Hexp.parse(File.read(INFILE).gsub('font-weight:600', 'font-weight:bold')) # :(

bgcolor = SVG.select('*[pagecolor]').first['pagecolor']

# Namespace hrefs on images or Chrome doesn't pick up on them
svg = SVG.replace('image') do |image|
  image.attr('xlink:href', image['href'])
end

result = TEMPLATE
  .replace('svg') { svg }
  .replace('style') {|style| style.set_children([style.text.sub('}', "background-color: #{bgcolor}; }")])} # :(

File.write(OUTFILE, result.to_html(html5: true))

__END__
<!DOCTYPE>
<html>
  <head>
    <style type="text/css">
      body, svg {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
    </style>
    <script type="text/javascript" src="svg-slides.js"></script>
    <script type="text/javascript">
      window.onload = function() {
        SvgSlides.initialize();
      }
    </script>
  </head>
  <body>
    <!-- <div id="wrapper" style="border: 1px solid black;"> -->
    <div id="wrapper">
      <svg></svg>
    </div>
  </body>
</html>
