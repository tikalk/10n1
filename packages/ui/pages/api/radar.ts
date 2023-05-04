// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import csv from 'csvtojson';

export default (req, res) => {
  fetch('https://www.tikalk.com/data/radar.csv')
    .then((resp) => resp.text())
    .then((data) => {
      csv({
        noheader: true,
        output: 'csv',
      })
        .fromString(data)
        .then((csvRow) => {
          res.status(200).json(csvRow);
        });
    });
};
