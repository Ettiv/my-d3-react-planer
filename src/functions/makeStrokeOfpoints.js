const makeStrokeOfPoints = (pointsArray) => {

  let strokePoints = '';

  pointsArray.map((point, index) => {
    if (pointsArray.length === index + 1) {
      strokePoints += point.x;
      strokePoints += ' ';
      strokePoints += point.y;
    } else {
      strokePoints += point.x;
      strokePoints += ' ';
      strokePoints += point.y;
      strokePoints += ',';
    }
  })

  return strokePoints;
}

export default makeStrokeOfPoints;