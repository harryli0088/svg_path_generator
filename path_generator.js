//made by Harry Li

//the generate_path function takes in a path_data object
//path_data = {
//  start: {x: number, y: number},
//  sections: [
//    {
//      dx: size in pixels that the end point x coordinate should be,
//      dy: size in pixels that the end point y coordinate should be,
//      r: size in pixels of the radius (smaller radius means more extreme curve, larger radius means less extreme curve, don't make it too small relative to the step size otherwise it won't intersect),
//      step_size: size in pixels that each step should be,
//      wiggle_size: size in pixels that the maximum wiggle can be
//    },
//    ...
//  ]
//}

//

//example path_data
// const path_data = {
//   start: {
//     x: 200,
//     y: 300,
//   },
//   sections: [
//   {dx: 0, dy: -50, r: 0, step_size: 4, wiggle_size: 1},
//   {dx: 10, dy: -10, r: -30, step_size: 1, wiggle_size: 1},
//   {dx: 10, dy:0, r: 0, step_size: 5, wiggle_size: 1},
//   {dx: 10, dy:10, r: -30, step_size: 1, wiggle_size: 1},
//   {dx: 0, dy: 50, r: 0, step_size: 4, wiggle_size: 1},
//   {dx: -30, dy: 0, r: 50, step_size: 3, wiggle_size: 1},
//   ],
// };

//primary function that returns the generated path
function generate_path(path_data) {
  //generates the path for a single section
  function generate_section(section, current_pos) {
    let d = ""; //the path data string to eventually return

    let distance = 0; //the distance from the starting point to the end point, accounting for curvature
    let num_steps = 0; //the number of steps we should take from start to end
    let step_unit_vector = {x: 0, y: 0}; //the unit vector pointing in the direction of the next step
    let wiggle_vector = {x: 0, y: 0}; //the vector to add to the current_pos to add wiggle to the path

    const starting_point = {x: current_pos.x, y: current_pos.y}; //record our starting point
    const end_point = {x:starting_point.x + section.dx, y:starting_point.y + section.dy}; //record our desired end point

    //if there is a radius
    if(section.r !== 0) {
      const direct_distance = Math.sqrt( Math.pow(section.dx,2) + Math.pow(section.dy,2) ); //get direct distance between the two points of the arc
      const angle = 2*Math.asin( direct_distance/(2*section.r) ); //get the angle of the arc

      distance = angle * section.r; //get the distance of the arc length
      num_steps = get_num_steps(distance, section.step_size); //get the number of steps

      height = section.r * Math.cos(angle/2); //height of the isosceles
      const angle_dxy = Math.atan(section.dy/section.dx);
      height_vector = {x: height*Math.sin(angle_dxy), y: -height*Math.cos(angle_dxy)}; //relative to the raidus point R

      //the coordinates and radius of the center of the circle
      const center = {
        x:starting_point.x + section.dx/2 + height_vector.x,
        y:starting_point.y + section.dy/2 + height_vector.y,
        r: Math.abs(section.r)
      };
      // d3.select("svg").append("circle").attr("cx",center.x).attr("cy",center.y).attr("r",12)

      current_pos.r = Math.sqrt(2*Math.pow(section.r,2)*(1-Math.cos(angle/num_steps))); //law of cosines to calculate the direct distance between each step

      //get each point along this curve with a wiggle
      for(let i=1; i<=num_steps; ++i) {
        const p = get_next_curve_point(current_pos,center,end_point); //get the next point p
        step_unit_vector = get_step_unit_vector(p.x-current_pos.x,p.y-current_pos.y); //derive a step unit vector
        current_pos.x = p.x; //get the new x
        current_pos.y = p.y; //get the new y

        wiggle_vector = get_wiggle_vector(section.wiggle_size, step_unit_vector);
        d += next_point(current_pos, wiggle_vector);
      }
    }
    //else this is a straight line
    else {
      distance = Math.sqrt(Math.pow(section.dx,2) + Math.pow(section.dy,2)); //find the distance from start to end
      num_steps = get_num_steps(distance, section.step_size); //get the number of steps to take
      step_unit_vector = {x: section.dx/distance, y: section.dy/distance}; //create a unit vector of the direction we're going in

      const dx_i = section.dx/num_steps; //get the x distance of this step from the origin
      const dy_i = section.dy/num_steps; //get the y distance of this step from the origin

      //get each point along this line with a wiggle
      for(let i=1; i<=num_steps; ++i) {
        current_pos.x += dx_i; //add the x difference
        current_pos.y += dy_i; //add the y difference

        wiggle_vector = get_wiggle_vector(section.wiggle_size, step_unit_vector);
        d += next_point(current_pos, wiggle_vector);
      }
    }

    d += end_point.x + " " + end_point.y + " "; //add the end point to make sure the path gets completely drawn

    //set the current position to the end point
    current_pos.x = end_point.x;
    current_pos.y = end_point.y;

    return d; //return the data string
  }



  //given a distance and a step size, return the number of steps to take (minimum is 1)
  function get_num_steps(distance,step_size) {
    return Math.max( Math.round(distance/step_size) , 1 ); //force there to be at least one step
  }

  //given the step unit vector, return a perpendicular wiggle vector
  function get_wiggle_vector(wiggle_size, step_unit_vector) {
    const wiggle = wiggle_size*(2*Math.random() - 1); //generate a random number in the range [-wiggle_size, wiggle_size]
    return {x: wiggle*step_unit_vector.y, y:-1*wiggle*step_unit_vector.x}; //calculate the wiggle vector
  }

  //given a direction vector, return a unit vector in the same direction
  function get_step_unit_vector(dx,dy) {
    const distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
    return {x:dx/distance, y:dy/distance};
  }

  //given the current position and a wiggle vector, return the next point as a string "x y "
  function next_point(current_pos, wiggle_vector) {
    return (current_pos.x + wiggle_vector.x).toFixed(2) + " " + (current_pos.y + wiggle_vector.y).toFixed(2) + " "; //add the next point with some wiggle
  }



  //given two circles, try to find the points where they intersect
  //taken and modified from this stack answer: https://stackoverflow.com/a/12221389
  function intersection(x0, y0, r0, x1, y1, r1) {
    let a, dx, dy, d, h, rx, ry, x2, y2;

    // dx and dy are the vertical and horizontal distances between the circle centers.
    dx = x1 - x0;
    dy = y1 - y0;

    d = Math.sqrt((dy*dy) + (dx*dx)); /* Determine the straight-line distance between the centers. */

    /* Check for solvability. */
    if (d > (r0 + r1)) {
      return false; /* no solution. circles do not intersect. */
    }
    if (d < Math.abs(r0 - r1)) {
      return false; /* no solution. one circle is contained in the other */
    }

    /* 'point 2' is the point where the line through the circle
    * intersection points crosses the line between the circle
    * centers.
    */

    /* Determine the distance from point 0 to point 2. */
    a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d) ;

    /* Determine the coordinates of point 2. */
    x2 = x0 + (dx * a/d);
    y2 = y0 + (dy * a/d);

    h = Math.sqrt((r0*r0) - (a*a)); // Determine the distance from point 2 to either of the intersection points

    // Now determine the offsets of the intersection points from point 2.
    rx = -dy * (h/d);
    ry = dx * (h/d);

    /* Determine the absolute intersection points. */
    const point_1_x = x2 + rx;
    const point_2_x = x2 - rx;
    const point_1_y = y2 + ry;
    const point_2_y = y2 - ry;

    return [point_1_x, point_1_y, point_2_x, point_2_y];
  }


  //given a start circle and center circle, return the intersection point that is closest to the end point
  function get_next_curve_point(start,center,end) {
    const points = intersection(start.x, start.y, start.r, center.x, center.y, center.r); //get the two intersection points
    const point_1 = {x: points[0],y: points[1]};
    const point_2 = {x: points[2],y: points[3]};

    //calculate the distance from both points to the end point
    const dist_1 = Math.sqrt(Math.pow(end.x-point_1.x,2) + Math.pow(end.y-point_1.y,2));
    const dist_2 = Math.sqrt(Math.pow(end.x-point_2.x,2) + Math.pow(end.y-point_2.y,2));

    return (dist_1 > dist_2) ? point_2 : point_1; //return the closer point
  }





  //initialize data and generate each section
  let current_pos = {x: path_data.start.x, y: path_data.start.y};
  let d = "M"+path_data.start.x+" "+path_data.start.y+"C  ";
  for(let i=0; i<path_data.sections.length; ++i) {
    d += generate_section(path_data.sections[i], current_pos);
    // d3.select("svg").append("circle").attr("cx",current_pos.x).attr("cy",current_pos.y).attr("r",10).attr("fill","purple");
  }
  return d + "Z";
}
