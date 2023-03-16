const radians = (degrees) => {
    return degrees * Math.PI / 180;
  }
  
  const distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }
  
  const map = (value, istart, istop, ostart, ostop) => {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  }
  export { radians, distance, map };