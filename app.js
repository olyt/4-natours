const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// route handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requstedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

const getTourById = (req, res) => {
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTourById);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// routes
app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

const port = 7000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});