// REQUEST BY HTTP
const http = require('http');
// ARGs PARSER
const argv = require('minimist')(process.argv.slice(2));
// -t parallell/serial
// -n quantity
let typeOfRequests = argv['t'];
let quantytyOfRequests = argv['n'];

// Variables
const request = (c) => {
  return new Promise((resolve, reject) => {
    http
      .get('http://localhost:3000/id='+c, res => {
        let content = '';
        res.on('data', chunk => {
          content += chunk;
        }),
          res.on('end', () => {
            resolve(content);
          });
      })
      .on('error', err => reject(console.log('ERROR', err)));
  });
};

const requestByType = async(quantytyOfRequests, typeOfRequests) => {
  switch(typeOfRequests){
    case 'parallel': 
        const promises = []
        for(let i=1;i<=quantytyOfRequests;i++){
            promises.push(request(i))
        }
        Promise.all(promises)
        .then(result =>console.log(result))
        .catch(err => console.log(err))
        break
    case 'serial': 
        for(let i=1;i<=quantytyOfRequests;i++){
        await request(i)
            .then(data => console.log(data))
            .catch(err => console.log(err));
        }
        break
    default:
        console.log('Request type not provided')    
  }
};

requestByType(quantytyOfRequests, typeOfRequests);
