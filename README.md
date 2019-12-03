![Ramen Example](/examples/ramen.svg)


![Sushi Example](/examples/sushi.svg)


![Soda Example](/examples/gabunomi.svg)


![Tempura Example](/examples/tempura.svg)


![Takoyaki Example](/examples/takoyaki.svg)


![Taiyaki Example](/examples/taiyaki.svg)


# svg_path_generator
Draw with SVG

A javascript function that generates a data string for the "d" attribute in an SVG "path" element.

It takes in general straight lines or curves that you want to follow, and can add randomized "wiggles" to give it a hand-drawn effect



## Usage
```
npm install --save harryli0088/svg_path_generator
```

```javascript
import svg_path_generator from "svg_path_generator"
```


1) Provide a starting x and y position
2) Provide an array of "sections", which are curves or straight lines to draw


the generate_path function takes in a path_data object
```
const path_data = {
  start: {x: number, y: number},
  sections: [
    {
      x: the absolute x pixel you want to move to,
      y: the absolute y pixel you want to move to (remember that in SVG, y increases positively down),
      dx: (alternatively, you can provide a relative change in pixels along the x axis),
      dy: (alternatively, you can provide a relative change in pixels along the y axis (remember that in SVG, y increases positively down)),
      r: length in pixels of the radius of the curve. 0 produces a straight line. Change the sign of the radius to change the curve direction. Smaller radius means more extreme curve; larger radius means less extreme curve. Do not make the radius too small; you can only draw a semicircle at most. If you need a bigger curve, combine two smaller curves to make a bigger one,
      step_size: size in pixels that each step should be,
      wiggle_size: size in pixels that the maximum wiggle side-to-side can be (wiggles are randomized, so each render will be slightly different)
    },
    ...
  ]
}
```

```javascript
//example path_data
const path_data = {
  start: {
    x: 200,
    y: 300,
  },
  sections: [
    {dx: 0, dy: -50, r: 0, step_size: 4, wiggle_size: 1},
    {dx: 10, dy: -10, r: -30, step_size: 1, wiggle_size: 1},
    {dx: 10, dy:0, r: 0, step_size: 5, wiggle_size: 1},
    {dx: 10, dy:10, r: -30, step_size: 1, wiggle_size: 1},
    {dx: 0, dy: 50, r: 0, step_size: 4, wiggle_size: 1},
    {dx: -30, dy: 0, r: 50, step_size: 3, wiggle_size: 1},
  ]
}

svg_path_generator(path_data); //returns the "d" attribute string to put into your SVG "path"
```

## How it works

![explanation](/examples/explanation.svg)



## Examples
Examples can be found in the /examples directory. You can install d3.js as a peer dependency.


## License
MIT License
