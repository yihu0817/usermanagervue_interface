var db = require('../config/db');

var querydb = function (sql, parameters) {

    return new Promise(function (resolve, rejected) {
        db.query(sql, parameters, function (err, data) {
            if (err) {
                rejected(err);
            } else {
                resolve(data);
            }
        });
    });
};

// const querydb = (sql,parameters) => {
//      return new Promise(function (resolve, rejected) {
//          db.query(sql, parameters, function (err, data) {
//              if (err) {
//                  rejected(err);
//              } else {
//                  resolve(data);
//              }
//          });
//      });
// }

// const querydb = (sql,parameters) => new Promise( (resolve,rejected) => {
//     db.query(sql, parameters, (err, data) => {
//         if (err) {
//             rejected(err);
//         } else {
//             resolve(data);
//         }
//     });
// });

module.exports = querydb;