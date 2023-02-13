// function to send a json object
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// function to show a success status code
const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  // success status code
  respondJSON(request, response, 200, responseJSON);
};

// function to show a bad request without the correct parameters
const badRequest = (request, response, params) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // Error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // Error Id
    responseJSON.id = 'badRequest';
    // 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }

  // success status code
  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // Error message
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    // Error Id
    responseJSON.id = 'unauthorized';
    // 400 bad request code
    return respondJSON(request, response, 401, responseJSON);
  }

  // success status code
  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
  };

  // success status code
  respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Service Error. Something went wrong.',
  };

  // success status code
  respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet.' + 
    'Check again later for updated content.',
  };

  // success status code
  respondJSON(request, response, 501, responseJSON);
};

// function to show not found error
const notFound = (request, response) => {
  // error message and id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
