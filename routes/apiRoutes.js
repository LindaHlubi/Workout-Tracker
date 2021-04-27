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
      router.put("/api/workouts/:id", (req, res) => {
        Workout.findByIdAndUpdate(
          { _id: req.params.id }, { exercises: req.body }
        ).then((dbWorkout) => {
          res.json(dbWorkout);
        }).catch(err => {
          res.status(400).json(err);
        });
    });

    //create a workout
    router.post("/api/workouts/", (req, res) => {
      Workout.create(req.body).then((dbWorkout) => {
        res.json(dbWorkout);
      }).catch(err => {
          res.status(400).json(err);
        });
    });





module.exports = router;