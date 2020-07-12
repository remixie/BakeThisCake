/* eslint-disable no-console */
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const MongoClient = require("mongodb").MongoClient;
const { equal } = require("assert");
var port = process.env.PORT || 3000;

http.listen(port, () => console.log("Listening to port " + port + "."));

var dbName = "";

// Connection URL
var url = "";

if (process.env.NODE_ENV !== "production") {
  url = "mongodb://mongo:27017";
  dbName = "cake";
} else {
  url = process.env.MONGODB_URI;
  dbName = "";
}

// Create a new MongoClient
const client = new MongoClient(url + (dbName == "" ? "" : dbName), {
  useNewUrlParser: true
});

//console.log(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  const db = client.db(dbName);
  const ingredients = db.collection("ingredients");
  equal(null, err);
  console.log("The cake server is now running.");

  io.on("connection", function(socket) {
    console.log("A new player has connected!");

    socket.on("newGameRequest", async () => {
      console.log("request received");
      const [record] = await ingredients
        .aggregate([
          {
            $sample: { size: 1 }
          },
          {
            $unwind: "$words"
          },
          {
            $sample: { size: 1 }
          },
          {
            $replaceRoot: { newRoot: { word: "$words" } }
          }
        ])
        .toArray();
      const applyToWord = apply(record.word);
      const encoded = applyToWord(encode, btoa, encode, btoa);
      socket.emit("deliverWords", encoded);
    });
  });
});

app.use("/", express.static("./dist"));

app.get("/api", () => {
  console.log("requested!");
});

// copied from the one in utils because we can't import es6 here

/**
 * Applies the given functions in order to the given input, if no functions are given
 * then returns a function that when given an array of functions, will apply them in order to the original input
 *
 * @param {*} input
 * @param {Function[]|Function[][]} [optionalFns]
 * @returns
 */
function apply(input, ...optionalFns) {
  optionalFns = arrayFlat(optionalFns);
  if (!optionalFns || optionalFns.length === 0) {
    return (...optionalFns) =>
      arrayFlat(optionalFns).reduce((output, fn) => fn(output), input);
  }
  console.log(optionalFns);
  return optionalFns.reduce((output, fn) => fn(output), input);
}

/**
 * Flattens an array n times
 *
 * @param {any[]} array
 * @param {number} [times=Infinity]
 * @returns {any[]}
 */
function arrayFlat(array, times = Infinity) {
  return array.reduce((arr, item) => {
    if (Array.isArray(item) && times > 0) {
      arr.push(...arrayFlat(item, times - 1));
    } else {
      arr.push(item);
    }
    return arr;
  }, []);
}

// function atob (input) {
//   return Buffer.from(input,'base64').toString('latin1')
// }

function btoa(input) {
  return Buffer.from(input, "latin1").toString("base64");
}

function encode(word) {
  const ascii = new Uint8Array(
    [...word].map(letter => letter.charCodeAt(0))
  ).map((code, index) =>
    index % 2 ? rotateRight(code, index) : rotateLeft(code, index / 2 + 1)
  );
  const rotatoPotato = ascii.reduce((acc, code) => {
    acc.push(String.fromCharCode(code));
    return acc;
  }, []).join``;
  return rotatoPotato;
}

const bitMask = 2 ** 8 - 1;

function mask(num) {
  return num & 7;
}

function rotateLeft(n, d) {
  const masked = mask(d); // I'm batman
  return ((n << masked) & bitMask) | (n >>> (8 - masked));
}

function rotateRight(n, d) {
  const masked = mask(d); // no-one cared who I was till I put on the mask
  return (n >>> masked) | ((n << (8 - masked)) & bitMask);
}
