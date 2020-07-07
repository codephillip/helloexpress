var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get("/test", (req, res, next) => {
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

router.put("/test/:item", (req, res, next) => {
    console.log("called first put method");
    next(); // pass control to the next handler
}, (req, res) => {
    res.send("called put " + req.params.item)
});


// array of call backs
var fun1 = (req, res, next) => {
    console.log("fun1 called");
    next();
}

var fun2 = (req, res, next) => {
    console.log("fun2 called");
    next();
}

// last function doesn't have next
var fun3 = (req, res) => {
    console.log("fun3 called");
    res.send("called post after fun 1 and fun 2");
}

router.post("/test", [fun1, fun2, fun3]);


// array of call backs with normal callbacks
var fun4 = (req, res, next) => {
    console.log("fun4 called");
    next();
}

var fun5 = (req, res, next) => {
    console.log("fun5 called");
    next();
}

router.delete("/test", [fun4, fun5], (req, res, next) => {
    console.log("delete callback 1");
    next();
}, (req, res) => {
  res.send("called delete");
})

// handles all GET, POST, PUT, DELETE
router.all("/test2", (req, res) => {
    res.json({
        "text": "helloworld"
    });
});
module.exports = router;
