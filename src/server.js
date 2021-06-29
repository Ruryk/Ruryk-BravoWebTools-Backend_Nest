const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

const SECRET_KEY = '123456789';

const expiresIn = '1h';

// SQL
const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bravowebtools"
});

// Nodemailer

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'mr.ivent6@gmail.com',
    pass: '1598753ivent'
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

function sentCodeToEmail(email, code) {
  const message = {
    from: 'bravoWebTool@domain.com',
    to: email,
    subject: 'Confirm Email',
    text: 'Please confirm your email',
    html: '<p>Please confirm your email</p><p>Code: ' + code + '</p>'
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      return error;
    }
    console.log('Message sent: %s', info.messageId);
  });
}

function generateCodeVerifivation() {
  const code = Math.floor(Math.random() * 1000000).toString().padStart(6, 0);
  return code;
}

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
}

// Check if the user exists in database
function isAuthenticated({ email }) {

}

function writeCodeVerification(email) {
  const code = generateCodeVerifivation();
  conn.query(
    "UPDATE users SET code='" + code + "' WHERE email='" + email + "'", (err, result) => {
      if (err) throw (err);
    }
  );
  sentCodeToEmail(email, code);
}

// Verification to one of the users from users db
server.post('/auth/verification', (req, res) => {
  const { email } = req.body;
  if (isAuthenticated({ email }) === false) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }
  writeCodeVerification(email);
  res.status(200).json({ status: 200 });
})

// Verification to one of the users from users db
server.post('/auth/check-user', (req, res) => {
  const { email } = req.body;
  conn.query(
    "SELECT * FROM users WHERE email='" + email + "'", (err, result) => {
      if (err) {
        const status = 401;
        const message = 'Incorrect email or password';
        res.status(status).json({ status, message });
      };
      const user = JSON.parse(JSON.stringify(result));
      if (user.length > 0) {
        res.status(200).json({ status: 200 });
      } else {
        res.status(401).json({ status: 401 });
      }
    }
  );
})

// Check code to one of the users from users db
server.post('/auth/check-code', (req, res) => {
  const { email, code } = req.body;
  console.log(code);
  conn.query(
    "SELECT * FROM users WHERE email='" + email + "'", (err, result) => {
      if (err) {
        res.status(401).json({ status: 401, message: 'Incorrect code' });
      };
      const user = JSON.parse(JSON.stringify(result));
      console.log(user);
      if (user.length > 0) {
        if (code == user[0].code) {
          res.status(200).json({ status: 200 });
        } else {
          res.status(200).json({ status: 401, message: 'Incorrect code' });
        }
      } else {
        res.status(401).json({ status: 401, message: 'Incorrect code' });
      }
    }
  );
})

// Login to one of the users from users db
server.post('/auth/login', (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { code, email } = req.body;
  const access_token = createToken({ email });
  console.log("Access Token:" + access_token);
  conn.query(
    "SELECT * FROM users WHERE email='" + email + "'", (err, result) => {
      if (err) throw (err);
      let response = JSON.parse(JSON.stringify(result));
      if (response.length > 0) {
        if (code == response[0].code) {
          conn.query(
            "UPDATE users SET token='" + access_token + "', code='' WHERE email='" + email + "'", (err2, result) => {
              if (err2) throw (err2);
              console.log('update token');
            }
          );
          res.status(200).json({ access_token });
        }
      }
    }
  );
})

// Login to one of the users from users db with token
server.post('/auth/login-token', (req, res) => {
  const { token } = req.body;
  console.log(req.body);
  conn.query(
    "SELECT * FROM users WHERE token='" + token + "'", (err, result) => {
      if (err) throw (err);
      let response = JSON.parse(JSON.stringify(result));
      console.log("from db: " + response);
      console.log(token);
      if (response.length > 0) {
        const access_token = createToken({ email: response[0].email });
        conn.query(
          "UPDATE users SET token='" + access_token + "', code='' WHERE email='" + response[0].email + "'", (err2, result) => {
            if (err2) throw (err2);
            console.log('update token');
            res.status(200).json({ token: access_token });
          }
        );
      } else {
        res.status(200).json({ status: false });
      }
    }
  );
})


// server.use(/^(?!\/auth).*$/, (req, res, next) => {
//   if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
//     const status = 401;
//     const message = 'Error in authorization format';
//     res.status(status).json({ status, message });
//     return;
//   }
//   try {
//     let verifyTokenResult;
//     verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

//     if (verifyTokenResult instanceof Error) {
//       const status = 401;
//       const message = 'Access token not provided';
//       res.status(status).json({ status, message });
//       return;
//     }
//     next();
//   } catch (err) {
//     const status = 401;
//     const message = 'Error access_token is revoked';
//     res.status(status).json({ status, message });
//   }
// })

// server.use(router);

server.listen(3000, () => {
  console.log('Run Auth API Server');
})
