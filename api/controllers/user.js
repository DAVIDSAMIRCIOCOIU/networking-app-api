const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

/** Registers a user checking against email.
 */
exports.user_signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user === null) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log("error");
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              surname: req.body.surname,
              email: req.body.email,
              password: hash,
              role: req.body.role,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created.",
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  error: err,
                });
              });
          }
        });
      } else {
        res.status(409).json({
          message: "Mail already exists.",
          user: user,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

/** Logins with user credentials */
exports.user_login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if(user === null) {
            return res.status(401).json({
                message: "Auth failed."
            });
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: "Auth Failed"
                    });
                } else if (result) {
                    const token = jwt.sign(
                    {
                        email: user.email,
                        role: user.role
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                } else {
                    res.status(401).json({
                        message: "Auth failed."
                    });
                }
            });
        }
    })
    .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
};

exports.user_delete = (req, res, next) => {};
