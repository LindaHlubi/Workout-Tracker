const router = require("express").Router();
const Workout = require("../models/workout.js");
const mongojs = require("mongodb");

//get workout
router.get("/api/workouts", (req,res) => {
    Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
});

      // add and update exercise
      router.put("/api/workouts/:id", (req,res) => {
        const id = mongojs.ObjectId(req.params.id)
        Workout.findByIdAndUpdate( id, {$push: {exercises: req.body} }, {new:true}, (err, data) => {
          if (err) {
            console.log(err)
          }
          res.json(data);
        });
      });

    //create a workout
    router.post("/api/workouts/", (req, res) => {
      Workout.create(req.body)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      }).catch(err => {
          res.status(400).json(err);
        });
    });
// GET route for getting range
router.get('/api/workouts/range', (req, res) => {
  Workout.aggregate([
      {
          $addFields: {
              totalDuration: {
                  $sum: "$exercises.duration"
              }
          }
      }
  ])
   .sort({ day: -1 })
   .limit(7)
   .then(dbWorkout => res.json(dbWorkout))
   .catch((err) => res.status(400).json(err));
});






module.exports = router;