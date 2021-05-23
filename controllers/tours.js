const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.getTourById = (req, res) => {
  const tour = tours.find(i => i.id === +req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'tour not found'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = {
    id: newId,
    ...req.body
  };

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
};

exports.updateTour = (req, res) => {
  const tour = tours.find(i => i.id === +req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'tour not found'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour'
    }
  });
};

exports.deleteTour = (req, res) => {
  const tour = tours.find(i => i.id === +req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'tour not found'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};