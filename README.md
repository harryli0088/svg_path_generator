# svg_path_generator
A javascript function that generates a data string for the "d" attribute in a "path" element.

It takes in general straight lines or curves that you want to follow, and can add randomized "wiggles" to give it a hand-drawn effect



## usage
the generate_path function takes in a path_data object
```
path_data = {
  start: {x: number, y: number},
  sections: [
    {
      dx: size in pixels that the end point x coordinate should be,
      dy: size in pixels that the end point y coordinate should be,
      r: size in pixels of the radius (smaller radius means more extreme curve, larger radius means less extreme curve, don't make it too small relative to the step size otherwise it won't intersect),
      step_size: size in pixels that each step should be,
      wiggle_size: size in pixels that the maximum wiggle can be
    },
    ...
  ]
}
```

```
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

 ## examples
 Examples can be found in the /examples directory. There is a d3.js file included

 ![Ramen Example](/examples/ramen.svg)
