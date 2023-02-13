const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
// function to send response
const respond = (request, response, content, type) => {
  // set status code (200 success) and content type
  response.writeHead(200, { 'Content-Type': type });
  // write the content string or buffer to response
  response.write(content);
  // send the response to the client
  response.end();
};

const getMediaType = (request, response, acceptedTypes) => {
  // object to send
  const mediaType = {
    message: 'This is a successful response',
  };

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${mediaType.message}</message>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml');
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const mediaObjStr = JSON.stringify(mediaType);

  // return response passing json and content type
  return respond(request, response, mediaObjStr, 'application/json');
};

// function to handle the index page
const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const getCSS = (request, response) => {
  respond(request, response, css, 'text/css');
};

module.exports = {
  getMediaType,
  getIndex,
  getCSS,
};
