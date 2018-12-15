const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      cookieParser  = require('cookie-parser'),
      mongoose      = require('mongoose'),
      path          = require('path'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local');

require('dotenv').config();

const User          = require('./models/User'),
      Item          = require('./models/Item');

const middleware    = require('./locals/middleware');

mongoose.connect(process.env.MONGODB);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/production_build')));

app.use(require('express-session')({
  secret: 'Argos Limited ia a member of Home Retail Group plc (the "Group") which includes Habitat Retail Limited and other associated companies.',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/production_build/index.html'));
});


app.get('/api/test', (req, res) => {
  console.log('User accessed express');
  res.json({
    message: 'hello from express'
  });
});


app.get('/api/items', (req, res) => {
  if (req.isAuthenticated()) {

    User.findById(req.user._id)
        .populate('directions')
        .exec((err, foundUser) => {
          if (err) {
            console.log(err);
            res.status(500).json({ err });
          } else {
            res.status(200).json({
              message: 'User signed in, sending profile',
              user: foundUser
            });
          }
        });//

  } else {
    res.status(200).json({
      message: 'User not signed in, sending defaults'
    });
  }
})


app.post('/api/item', middleware.isLoggedIn, (req, res) => {
  console.log('Adding a new item');
  User.findById(req.user._id, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err });
    } else {
      Item.create(req.body, (err, createdItem) => {
        if (err) {
          console.log(err);
          res.status(500).json({ err });
        } else {
          console.log('Item added OK.');
          foundUser.directions.push(createdItem._id);
          foundUser.save();
          createdItem.author = {
            username: foundUser.username,
            id: foundUser._id
          }
          createdItem.save();
          res.status(200).json({
            message: 'New item added OK.',
            payload: createdItem
          })
        }
      });
    }
  })

});

app.put('/api/item', (req, res) => {
  console.log('Going to update item to: ');
  console.log(req.body.payload);
  if (req.body.id) {
    Item.findByIdAndUpdate(req.body.id, req.body.payload, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ err });
      } else {
        res.status(200).json({
          message: 'Item updated OK.'
        });
      }
    })
  } else {
    res.status(200).json({
      message: 'Item updated OK.'
    });
  }
})

app.put('/api/item/cross', (req, res) => {
  console.log('Simlating a db cross');
  if (req.body.id) {
    Item.findByIdAndUpdate(req.body.id, {crossed: req.body.crossed}, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ err });
      } else {
        res.status(200).json({
          message: 'Crossed OK.'
        });
      }
    })
  } else {
    res.status(200).json({
      message: 'Crossed OK.'
    });
  }
})

app.delete('/api/item', (req, res) => {
  console.log('Deleting an item');
  console.log(req.body.id);

  if (req.body.id) {
    console.log('Id provided');
    Item.findById(req.body.id, (err, foundItem) => {
      if (err) {
        console.log(err);
        res.status(500).json({ err });
      } else {
        console.log('Item lookup ok');
        User.findById(foundItem.author.id, (err, foundUser) => {
          if (err) {
            console.log(err);
            res.status(500).json({ err });
          } else {
            console.log('User lookup ok');
            foundUser.directions.remove(foundItem._id);
            foundUser.save();

            Item.findByIdAndRemove(foundItem._id, (err) => {
              if (err) {
                console.log(err);
                res.status(500).json({ err });
              } else {
                console.log('Item removed, finishing...');
                res.status(200).json({
                  message: 'Deleted OK.'
                })
              }
            })
          }
        })
        // res.status(200).json({
        //   message: 'Deleted OK.'
        // })
      }
    })
  } else {
    res.status(200).json({
      message: 'Deleted OK.'
    })
  }
});



app.post('/api/auth/register', (req, res) => {
  let newUser = new User({ username: req.body.username });

  User.register(newUser, req.body.password, (err, createdUser) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err });
    } else {
      passport.authenticate('local')(req, res, () => {
        res.status(200).json({
          message: 'User registered OK!',
          user: createdUser
        })
      })
    }
  })
});

app.post('/api/auth/login', (req, res) => {
  console.log('### User login attempt');

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err });
      return;
    }
    if (user) {
      console.log(user);
      req.login(user, (err) => {
        if (err) {
          console.log('LOGIN ERROR');
          console.log(err);
          return res.status(401).json({ err });
        }

        console.log('## User logged in OK.');
        return res.status(200).json({
          message: 'User successfully logged in!',
          user
        })

      })
    } else {
      console.log('## No user found');
      res.status(401).json({ err: info });
    }

  })(req, res);
});

app.post('/api/auth/logout', (req, res) => {
  req.logOut();
  res.status(200).json({
    message: 'Logged out OK.'
  })
})

const PORT = process.env.PORT || 5000
app.listen(
  PORT
  , () => console.log(
    `${new Date().toLocaleTimeString('en-GB')}: Express server initialised on port: ${PORT}...`
  )
);
