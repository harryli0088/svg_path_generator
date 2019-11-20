![Ramen Example](/examples/ramen.svg)


![Sushi Example](/examples/sushi.svg)


![Soda Example](/examples/gabunomi.svg)


![Tempura Example](/examples/tempura.svg)


![Takoyaki Example](/examples/takoyaki.svg)


# svg_path_generator
Draw with SVG

A javascript function that generates a data string for the "d" attribute in an SVG "path" element.

It takes in general straight lines or curves that you want to follow, and can add randomized "wiggles" to give it a hand-drawn effect



## usage

1) Provide a starting x and y position
2) Provide an array of "sections": curves or straight lines to draw


the generate_path function takes in a path_data object
```javascript
path_data = {
  start: {x: number, y: number},
  sections: [
    {
      dx: change in pixels along the x axis,
      dy: change in pixels along the y axis (remember that in SVG y increases positively down),
      r: size in pixels of the radius of the curve. 0 produces a straight line. Change the sign of the radius to change the curve direction. Smaller radius means more extreme curve; larger radius means less extreme curve. Do not make the radius too small; you can only draw a semicircle at most. If you need a bigger curve, combine two smaller curves to make a bigger one,
      step_size: size in pixels that each step should be,
      wiggle_size: size in pixels that the maximum wiggle side-to-side can be
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
 ```

## How it works

![explanation](/examples/explanation.svg)



## examples
Examples can be found in the /examples directory. There is a d3.js file included.
/examples/ramen.html is a full example of how every part of the ramen is created!


## License
MIT License
