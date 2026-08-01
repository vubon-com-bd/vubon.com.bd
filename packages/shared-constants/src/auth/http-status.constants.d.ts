/**
 * HTTP status code constants for the monorepo
 * All HTTP status codes are centralized here for consistent API responses
 */
/**
 * Informational responses (100-199)
 */
export declare const HTTP_STATUS_INFO: {
    /**
     * 100 Continue
     * The server has received the request headers and the client should proceed to send the request body
     */
    readonly CONTINUE: 100;
    /**
     * 101 Switching Protocols
     * The requester has asked the server to switch protocols
     */
    readonly SWITCHING_PROTOCOLS: 101;
    /**
     * 102 Processing
     * The server has received and is processing the request, but no response is available yet
     */
    readonly PROCESSING: 102;
    /**
     * 103 Early Hints
     * Used to return some response headers before final HTTP message
     */
    readonly EARLY_HINTS: 103;
};
/**
 * Success responses (200-299)
 */
export declare const HTTP_STATUS_SUCCESS: {
    /**
     * 200 OK
     * Standard response for successful HTTP requests
     */
    readonly OK: 200;
    /**
     * 201 Created
     * The request has been fulfilled and resulted in a new resource being created
     */
    readonly CREATED: 201;
    /**
     * 202 Accepted
     * The request has been accepted for processing, but the processing has not been completed
     */
    readonly ACCEPTED: 202;
    /**
     * 203 Non-Authoritative Information
     * The server is a transforming proxy that received a 200 OK from its origin, but is returning a modified version
     */
    readonly NON_AUTHORITATIVE_INFORMATION: 203;
    /**
     * 204 No Content
     * The server successfully processed the request and is not returning any content
     */
    readonly NO_CONTENT: 204;
    /**
     * 205 Reset Content
     * The server successfully processed the request, but is not returning any content and requires the requester to reset the document view
     */
    readonly RESET_CONTENT: 205;
    /**
     * 206 Partial Content
     * The server is delivering only part of the resource due to a range header sent by the client
     */
    readonly PARTIAL_CONTENT: 206;
    /**
     * 207 Multi-Status
     * The message body that follows is an XML message and can contain a number of separate response codes
     */
    readonly MULTI_STATUS: 207;
    /**
     * 208 Already Reported
     * The members of a DAV binding have already been enumerated in a previous reply to this request
     */
    readonly ALREADY_REPORTED: 208;
    /**
     * 226 IM Used
     * The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations
     */
    readonly IM_USED: 226;
};
/**
 * Redirection responses (300-399)
 */
export declare const HTTP_STATUS_REDIRECTION: {
    /**
     * 300 Multiple Choices
     * Indicates multiple options for the resource that the client may follow
     */
    readonly MULTIPLE_CHOICES: 300;
    /**
     * 301 Moved Permanently
     * This and all future requests should be directed to the given URI
     */
    readonly MOVED_PERMANENTLY: 301;
    /**
     * 302 Found
     * The requested resource resides temporarily under a different URI
     */
    readonly FOUND: 302;
    /**
     * 303 See Other
     * The response to the request can be found under another URI using a GET method
     */
    readonly SEE_OTHER: 303;
    /**
     * 304 Not Modified
     * Indicates that the resource has not been modified since the version specified by the request headers
     */
    readonly NOT_MODIFIED: 304;
    /**
     * 305 Use Proxy
     * The requested resource is available only through a proxy, the address for which is provided in the response
     */
    readonly USE_PROXY: 305;
    /**
     * 306 Unused
     * This status code was used in a previous version of the HTTP specification, is no longer used, and is reserved
     */
    readonly UNUSED: 306;
    /**
     * 307 Temporary Redirect
     * The request should be repeated with another URI, but future requests can still use the original URI
     */
    readonly TEMPORARY_REDIRECT: 307;
    /**
     * 308 Permanent Redirect
     * The request and all future requests should be repeated using another URI
     */
    readonly PERMANENT_REDIRECT: 308;
};
/**
 * Client error responses (400-499)
 */
export declare const HTTP_STATUS_CLIENT_ERROR: {
    /**
     * 400 Bad Request
     * The server cannot or will not process the request due to an apparent client error
     */
    readonly BAD_REQUEST: 400;
    /**
     * 401 Unauthorized
     * The request requires user authentication
     */
    readonly UNAUTHORIZED: 401;
    /**
     * 402 Payment Required
     * Reserved for future use
     */
    readonly PAYMENT_REQUIRED: 402;
    /**
     * 403 Forbidden
     * The request was valid, but the server is refusing action
     */
    readonly FORBIDDEN: 403;
    /**
     * 404 Not Found
     * The requested resource could not be found
     */
    readonly NOT_FOUND: 404;
    /**
     * 405 Method Not Allowed
     * A request method is not supported for the requested resource
     */
    readonly METHOD_NOT_ALLOWED: 405;
    /**
     * 406 Not Acceptable
     * The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request
     */
    readonly NOT_ACCEPTABLE: 406;
    /**
     * 407 Proxy Authentication Required
     * The client must first authenticate itself with the proxy
     */
    readonly PROXY_AUTHENTICATION_REQUIRED: 407;
    /**
     * 408 Request Timeout
     * The server timed out waiting for the request
     */
    readonly REQUEST_TIMEOUT: 408;
    /**
     * 409 Conflict
     * The request could not be processed because of conflict in the request
     */
    readonly CONFLICT: 409;
    /**
     * 410 Gone
     * The requested resource is no longer available and will not be available again
     */
    readonly GONE: 410;
    /**
     * 411 Length Required
     * The request did not specify the length of its content, which is required by the requested resource
     */
    readonly LENGTH_REQUIRED: 411;
    /**
     * 412 Precondition Failed
     * The server does not meet one of the preconditions that the requester put on the request
     */
    readonly PRECONDITION_FAILED: 412;
    /**
     * 413 Payload Too Large
     * The request is larger than the server is willing or able to process
     */
    readonly PAYLOAD_TOO_LARGE: 413;
    /**
     * 414 URI Too Long
     * The URI provided was too long for the server to process
     */
    readonly URI_TOO_LONG: 414;
    /**
     * 415 Unsupported Media Type
     * The request entity has a media type which the server or resource does not support
     */
    readonly UNSUPPORTED_MEDIA_TYPE: 415;
    /**
     * 416 Range Not Satisfiable
     * The client has asked for a portion of the file, but the server cannot supply that portion
     */
    readonly RANGE_NOT_SATISFIABLE: 416;
    /**
     * 417 Expectation Failed
     * The server cannot meet the requirements of the Expect request-header field
     */
    readonly EXPECTATION_FAILED: 417;
    /**
     * 418 I'm a teapot
     * This code was defined in 1998 as one of the traditional IETF April Fools' jokes
     */
    readonly IM_A_TEAPOT: 418;
    /**
     * 421 Misdirected Request
     * The request was directed at a server that is not able to produce a response
     */
    readonly MISDIRECTED_REQUEST: 421;
    /**
     * 422 Unprocessable Entity
     * The request was well-formed but was unable to be followed due to semantic errors
     */
    readonly UNPROCESSABLE_ENTITY: 422;
    /**
     * 423 Locked
     * The resource that is being accessed is locked
     */
    readonly LOCKED: 423;
    /**
     * 424 Failed Dependency
     * The request failed because it depended on another request and that request failed
     */
    readonly FAILED_DEPENDENCY: 424;
    /**
     * 426 Upgrade Required
     * The client should switch to a different protocol
     */
    readonly UPGRADE_REQUIRED: 426;
    /**
     * 428 Precondition Required
     * The origin server requires the request to be conditional
     */
    readonly PRECONDITION_REQUIRED: 428;
    /**
     * 429 Too Many Requests
     * The user has sent too many requests in a given amount of time
     */
    readonly TOO_MANY_REQUESTS: 429;
    /**
     * 431 Request Header Fields Too Large
     * The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large
     */
    readonly REQUEST_HEADER_FIELDS_TOO_LARGE: 431;
    /**
     * 451 Unavailable For Legal Reasons
     * A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource
     */
    readonly UNAVAILABLE_FOR_LEGAL_REASONS: 451;
};
/**
 * Server error responses (500-599)
 */
export declare const HTTP_STATUS_SERVER_ERROR: {
    /**
     * 500 Internal Server Error
     * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable
     */
    readonly INTERNAL_SERVER_ERROR: 500;
    /**
     * 501 Not Implemented
     * The server either does not recognize the request method, or it lacks the ability to fulfill the request
     */
    readonly NOT_IMPLEMENTED: 501;
    /**
     * 502 Bad Gateway
     * The server was acting as a gateway or proxy and received an invalid response from the upstream server
     */
    readonly BAD_GATEWAY: 502;
    /**
     * 503 Service Unavailable
     * The server is currently unavailable (because it is overloaded or down for maintenance)
     */
    readonly SERVICE_UNAVAILABLE: 503;
    /**
     * 504 Gateway Timeout
     * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server
     */
    readonly GATEWAY_TIMEOUT: 504;
    /**
     * 505 HTTP Version Not Supported
     * The server does not support the HTTP protocol version used in the request
     */
    readonly HTTP_VERSION_NOT_SUPPORTED: 505;
    /**
     * 506 Variant Also Negotiates
     * The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself
     */
    readonly VARIANT_ALSO_NEGOTIATES: 506;
    /**
     * 507 Insufficient Storage
     * The server is unable to store the representation needed to complete the request
     */
    readonly INSUFFICIENT_STORAGE: 507;
    /**
     * 508 Loop Detected
     * The server detected an infinite loop while processing the request
     */
    readonly LOOP_DETECTED: 508;
    /**
     * 510 Not Extended
     * Further extensions to the request are required for the server to fulfill it
     */
    readonly NOT_EXTENDED: 510;
    /**
     * 511 Network Authentication Required
     * The client needs to authenticate to gain network access
     */
    readonly NETWORK_AUTHENTICATION_REQUIRED: 511;
};
/**
 * Combined HTTP status codes for easy access
 */
export declare const HTTP_STATUS: {
    /**
     * 500 Internal Server Error
     * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable
     */
    readonly INTERNAL_SERVER_ERROR: 500;
    /**
     * 501 Not Implemented
     * The server either does not recognize the request method, or it lacks the ability to fulfill the request
     */
    readonly NOT_IMPLEMENTED: 501;
    /**
     * 502 Bad Gateway
     * The server was acting as a gateway or proxy and received an invalid response from the upstream server
     */
    readonly BAD_GATEWAY: 502;
    /**
     * 503 Service Unavailable
     * The server is currently unavailable (because it is overloaded or down for maintenance)
     */
    readonly SERVICE_UNAVAILABLE: 503;
    /**
     * 504 Gateway Timeout
     * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server
     */
    readonly GATEWAY_TIMEOUT: 504;
    /**
     * 505 HTTP Version Not Supported
     * The server does not support the HTTP protocol version used in the request
     */
    readonly HTTP_VERSION_NOT_SUPPORTED: 505;
    /**
     * 506 Variant Also Negotiates
     * The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself
     */
    readonly VARIANT_ALSO_NEGOTIATES: 506;
    /**
     * 507 Insufficient Storage
     * The server is unable to store the representation needed to complete the request
     */
    readonly INSUFFICIENT_STORAGE: 507;
    /**
     * 508 Loop Detected
     * The server detected an infinite loop while processing the request
     */
    readonly LOOP_DETECTED: 508;
    /**
     * 510 Not Extended
     * Further extensions to the request are required for the server to fulfill it
     */
    readonly NOT_EXTENDED: 510;
    /**
     * 511 Network Authentication Required
     * The client needs to authenticate to gain network access
     */
    readonly NETWORK_AUTHENTICATION_REQUIRED: 511;
    /**
     * 400 Bad Request
     * The server cannot or will not process the request due to an apparent client error
     */
    readonly BAD_REQUEST: 400;
    /**
     * 401 Unauthorized
     * The request requires user authentication
     */
    readonly UNAUTHORIZED: 401;
    /**
     * 402 Payment Required
     * Reserved for future use
     */
    readonly PAYMENT_REQUIRED: 402;
    /**
     * 403 Forbidden
     * The request was valid, but the server is refusing action
     */
    readonly FORBIDDEN: 403;
    /**
     * 404 Not Found
     * The requested resource could not be found
     */
    readonly NOT_FOUND: 404;
    /**
     * 405 Method Not Allowed
     * A request method is not supported for the requested resource
     */
    readonly METHOD_NOT_ALLOWED: 405;
    /**
     * 406 Not Acceptable
     * The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request
     */
    readonly NOT_ACCEPTABLE: 406;
    /**
     * 407 Proxy Authentication Required
     * The client must first authenticate itself with the proxy
     */
    readonly PROXY_AUTHENTICATION_REQUIRED: 407;
    /**
     * 408 Request Timeout
     * The server timed out waiting for the request
     */
    readonly REQUEST_TIMEOUT: 408;
    /**
     * 409 Conflict
     * The request could not be processed because of conflict in the request
     */
    readonly CONFLICT: 409;
    /**
     * 410 Gone
     * The requested resource is no longer available and will not be available again
     */
    readonly GONE: 410;
    /**
     * 411 Length Required
     * The request did not specify the length of its content, which is required by the requested resource
     */
    readonly LENGTH_REQUIRED: 411;
    /**
     * 412 Precondition Failed
     * The server does not meet one of the preconditions that the requester put on the request
     */
    readonly PRECONDITION_FAILED: 412;
    /**
     * 413 Payload Too Large
     * The request is larger than the server is willing or able to process
     */
    readonly PAYLOAD_TOO_LARGE: 413;
    /**
     * 414 URI Too Long
     * The URI provided was too long for the server to process
     */
    readonly URI_TOO_LONG: 414;
    /**
     * 415 Unsupported Media Type
     * The request entity has a media type which the server or resource does not support
     */
    readonly UNSUPPORTED_MEDIA_TYPE: 415;
    /**
     * 416 Range Not Satisfiable
     * The client has asked for a portion of the file, but the server cannot supply that portion
     */
    readonly RANGE_NOT_SATISFIABLE: 416;
    /**
     * 417 Expectation Failed
     * The server cannot meet the requirements of the Expect request-header field
     */
    readonly EXPECTATION_FAILED: 417;
    /**
     * 418 I'm a teapot
     * This code was defined in 1998 as one of the traditional IETF April Fools' jokes
     */
    readonly IM_A_TEAPOT: 418;
    /**
     * 421 Misdirected Request
     * The request was directed at a server that is not able to produce a response
     */
    readonly MISDIRECTED_REQUEST: 421;
    /**
     * 422 Unprocessable Entity
     * The request was well-formed but was unable to be followed due to semantic errors
     */
    readonly UNPROCESSABLE_ENTITY: 422;
    /**
     * 423 Locked
     * The resource that is being accessed is locked
     */
    readonly LOCKED: 423;
    /**
     * 424 Failed Dependency
     * The request failed because it depended on another request and that request failed
     */
    readonly FAILED_DEPENDENCY: 424;
    /**
     * 426 Upgrade Required
     * The client should switch to a different protocol
     */
    readonly UPGRADE_REQUIRED: 426;
    /**
     * 428 Precondition Required
     * The origin server requires the request to be conditional
     */
    readonly PRECONDITION_REQUIRED: 428;
    /**
     * 429 Too Many Requests
     * The user has sent too many requests in a given amount of time
     */
    readonly TOO_MANY_REQUESTS: 429;
    /**
     * 431 Request Header Fields Too Large
     * The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large
     */
    readonly REQUEST_HEADER_FIELDS_TOO_LARGE: 431;
    /**
     * 451 Unavailable For Legal Reasons
     * A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource
     */
    readonly UNAVAILABLE_FOR_LEGAL_REASONS: 451;
    /**
     * 300 Multiple Choices
     * Indicates multiple options for the resource that the client may follow
     */
    readonly MULTIPLE_CHOICES: 300;
    /**
     * 301 Moved Permanently
     * This and all future requests should be directed to the given URI
     */
    readonly MOVED_PERMANENTLY: 301;
    /**
     * 302 Found
     * The requested resource resides temporarily under a different URI
     */
    readonly FOUND: 302;
    /**
     * 303 See Other
     * The response to the request can be found under another URI using a GET method
     */
    readonly SEE_OTHER: 303;
    /**
     * 304 Not Modified
     * Indicates that the resource has not been modified since the version specified by the request headers
     */
    readonly NOT_MODIFIED: 304;
    /**
     * 305 Use Proxy
     * The requested resource is available only through a proxy, the address for which is provided in the response
     */
    readonly USE_PROXY: 305;
    /**
     * 306 Unused
     * This status code was used in a previous version of the HTTP specification, is no longer used, and is reserved
     */
    readonly UNUSED: 306;
    /**
     * 307 Temporary Redirect
     * The request should be repeated with another URI, but future requests can still use the original URI
     */
    readonly TEMPORARY_REDIRECT: 307;
    /**
     * 308 Permanent Redirect
     * The request and all future requests should be repeated using another URI
     */
    readonly PERMANENT_REDIRECT: 308;
    /**
     * 200 OK
     * Standard response for successful HTTP requests
     */
    readonly OK: 200;
    /**
     * 201 Created
     * The request has been fulfilled and resulted in a new resource being created
     */
    readonly CREATED: 201;
    /**
     * 202 Accepted
     * The request has been accepted for processing, but the processing has not been completed
     */
    readonly ACCEPTED: 202;
    /**
     * 203 Non-Authoritative Information
     * The server is a transforming proxy that received a 200 OK from its origin, but is returning a modified version
     */
    readonly NON_AUTHORITATIVE_INFORMATION: 203;
    /**
     * 204 No Content
     * The server successfully processed the request and is not returning any content
     */
    readonly NO_CONTENT: 204;
    /**
     * 205 Reset Content
     * The server successfully processed the request, but is not returning any content and requires the requester to reset the document view
     */
    readonly RESET_CONTENT: 205;
    /**
     * 206 Partial Content
     * The server is delivering only part of the resource due to a range header sent by the client
     */
    readonly PARTIAL_CONTENT: 206;
    /**
     * 207 Multi-Status
     * The message body that follows is an XML message and can contain a number of separate response codes
     */
    readonly MULTI_STATUS: 207;
    /**
     * 208 Already Reported
     * The members of a DAV binding have already been enumerated in a previous reply to this request
     */
    readonly ALREADY_REPORTED: 208;
    /**
     * 226 IM Used
     * The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations
     */
    readonly IM_USED: 226;
    /**
     * 100 Continue
     * The server has received the request headers and the client should proceed to send the request body
     */
    readonly CONTINUE: 100;
    /**
     * 101 Switching Protocols
     * The requester has asked the server to switch protocols
     */
    readonly SWITCHING_PROTOCOLS: 101;
    /**
     * 102 Processing
     * The server has received and is processing the request, but no response is available yet
     */
    readonly PROCESSING: 102;
    /**
     * 103 Early Hints
     * Used to return some response headers before final HTTP message
     */
    readonly EARLY_HINTS: 103;
};
/**
 * HTTP status code categories
 */
export declare const HTTP_STATUS_CATEGORIES: {
    readonly INFORMATIONAL: "informational";
    readonly SUCCESS: "success";
    readonly REDIRECTION: "redirection";
    readonly CLIENT_ERROR: "client_error";
    readonly SERVER_ERROR: "server_error";
};
export type HttpStatusCategory = (typeof HTTP_STATUS_CATEGORIES)[keyof typeof HTTP_STATUS_CATEGORIES];
/**
 * HTTP status messages
 */
export declare const HTTP_STATUS_MESSAGES: {
    readonly 100: "Continue";
    readonly 101: "Switching Protocols";
    readonly 102: "Processing";
    readonly 103: "Early Hints";
    readonly 200: "OK";
    readonly 201: "Created";
    readonly 202: "Accepted";
    readonly 203: "Non-Authoritative Information";
    readonly 204: "No Content";
    readonly 205: "Reset Content";
    readonly 206: "Partial Content";
    readonly 207: "Multi-Status";
    readonly 208: "Already Reported";
    readonly 226: "IM Used";
    readonly 300: "Multiple Choices";
    readonly 301: "Moved Permanently";
    readonly 302: "Found";
    readonly 303: "See Other";
    readonly 304: "Not Modified";
    readonly 305: "Use Proxy";
    readonly 306: "Unused";
    readonly 307: "Temporary Redirect";
    readonly 308: "Permanent Redirect";
    readonly 400: "Bad Request";
    readonly 401: "Unauthorized";
    readonly 402: "Payment Required";
    readonly 403: "Forbidden";
    readonly 404: "Not Found";
    readonly 405: "Method Not Allowed";
    readonly 406: "Not Acceptable";
    readonly 407: "Proxy Authentication Required";
    readonly 408: "Request Timeout";
    readonly 409: "Conflict";
    readonly 410: "Gone";
    readonly 411: "Length Required";
    readonly 412: "Precondition Failed";
    readonly 413: "Payload Too Large";
    readonly 414: "URI Too Long";
    readonly 415: "Unsupported Media Type";
    readonly 416: "Range Not Satisfiable";
    readonly 417: "Expectation Failed";
    readonly 418: "I'm a teapot";
    readonly 421: "Misdirected Request";
    readonly 422: "Unprocessable Entity";
    readonly 423: "Locked";
    readonly 424: "Failed Dependency";
    readonly 426: "Upgrade Required";
    readonly 428: "Precondition Required";
    readonly 429: "Too Many Requests";
    readonly 431: "Request Header Fields Too Large";
    readonly 451: "Unavailable For Legal Reasons";
    readonly 500: "Internal Server Error";
    readonly 501: "Not Implemented";
    readonly 502: "Bad Gateway";
    readonly 503: "Service Unavailable";
    readonly 504: "Gateway Timeout";
    readonly 505: "HTTP Version Not Supported";
    readonly 506: "Variant Also Negotiates";
    readonly 507: "Insufficient Storage";
    readonly 508: "Loop Detected";
    readonly 510: "Not Extended";
    readonly 511: "Network Authentication Required";
};
/**
 * HTTP status code type
 */
export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
/**
 * HTTP status message type
 */
export type HttpStatusMessage = (typeof HTTP_STATUS_MESSAGES)[keyof typeof HTTP_STATUS_MESSAGES];
/**
 * Check if a status code is informational
 */
export declare const isInformational: (code: number) => code is (typeof HTTP_STATUS_INFO)[keyof typeof HTTP_STATUS_INFO];
/**
 * Check if a status code is successful
 */
export declare const isSuccess: (code: number) => code is (typeof HTTP_STATUS_SUCCESS)[keyof typeof HTTP_STATUS_SUCCESS];
/**
 * Check if a status code is a redirection
 */
export declare const isRedirection: (code: number) => code is (typeof HTTP_STATUS_REDIRECTION)[keyof typeof HTTP_STATUS_REDIRECTION];
/**
 * Check if a status code is a client error
 */
export declare const isClientError: (code: number) => code is (typeof HTTP_STATUS_CLIENT_ERROR)[keyof typeof HTTP_STATUS_CLIENT_ERROR];
/**
 * Check if a status code is a server error
 */
export declare const isServerError: (code: number) => code is (typeof HTTP_STATUS_SERVER_ERROR)[keyof typeof HTTP_STATUS_SERVER_ERROR];
/**
 * Get status category by code
 */
export declare const getStatusCategory: (code: number) => HttpStatusCategory | null;
/**
 * Get status message by code
 */
export declare const getStatusMessage: (code: number) => string | null;
/**
 * Check if status code is valid
 */
export declare const isValidStatusCode: (code: number) => code is HttpStatusCode;
/**
 * Check if status code indicates success (2xx)
 */
export declare const isSuccessStatusCode: (code: number) => boolean;
/**
 * Check if status code indicates an error (4xx or 5xx)
 */
export declare const isErrorStatusCode: (code: number) => boolean;
/**
 * Check if status code indicates a client error (4xx)
 */
export declare const isClientErrorStatusCode: (code: number) => boolean;
/**
 * Check if status code indicates a server error (5xx)
 */
export declare const isServerErrorStatusCode: (code: number) => boolean;
/**
 * Authentication-specific status codes
 */
export declare const AUTH_STATUS_CODES: {
    /**
     * 401 Unauthorized
     * Used when authentication is required and has failed or has not yet been provided
     */
    readonly UNAUTHORIZED: 401;
    /**
     * 403 Forbidden
     * Used when the authenticated user does not have permission to access the resource
     */
    readonly FORBIDDEN: 403;
    /**
     * 423 Locked
     * Used when the account is locked due to security reasons
     */
    readonly LOCKED: 423;
    /**
     * 429 Too Many Requests
     * Used when authentication rate limit is exceeded
     */
    readonly TOO_MANY_REQUESTS: 429;
};
/**
 * Common API status codes
 */
export declare const API_STATUS_CODES: {
    /**
     * 200 OK
     * Standard success response
     */
    readonly SUCCESS: 200;
    /**
     * 201 Created
     * Resource created successfully
     */
    readonly CREATED: 201;
    /**
     * 204 No Content
     * Success but no content to return
     */
    readonly NO_CONTENT: 204;
    /**
     * 400 Bad Request
     * Invalid request parameters
     */
    readonly BAD_REQUEST: 400;
    /**
     * 404 Not Found
     * Resource not found
     */
    readonly NOT_FOUND: 404;
    /**
     * 409 Conflict
     * Resource conflict (e.g., duplicate entry)
     */
    readonly CONFLICT: 409;
    /**
     * 422 Unprocessable Entity
     * Validation errors
     */
    readonly UNPROCESSABLE_ENTITY: 422;
    /**
     * 500 Internal Server Error
     * Server error
     */
    readonly INTERNAL_SERVER_ERROR: 500;
    /**
     * 503 Service Unavailable
     * Service temporarily unavailable
     */
    readonly SERVICE_UNAVAILABLE: 503;
};
/**
 * HTTP status code utilities
 */
export declare const HTTP_STATUS_UTILS: {
    /**
     * Check if status code is informational
     */
    readonly isInformational: (code: number) => code is (typeof HTTP_STATUS_INFO)[keyof typeof HTTP_STATUS_INFO];
    /**
     * Check if status code is successful
     */
    readonly isSuccess: (code: number) => code is (typeof HTTP_STATUS_SUCCESS)[keyof typeof HTTP_STATUS_SUCCESS];
    /**
     * Check if status code is a redirection
     */
    readonly isRedirection: (code: number) => code is (typeof HTTP_STATUS_REDIRECTION)[keyof typeof HTTP_STATUS_REDIRECTION];
    /**
     * Check if status code is a client error
     */
    readonly isClientError: (code: number) => code is (typeof HTTP_STATUS_CLIENT_ERROR)[keyof typeof HTTP_STATUS_CLIENT_ERROR];
    /**
     * Check if status code is a server error
     */
    readonly isServerError: (code: number) => code is (typeof HTTP_STATUS_SERVER_ERROR)[keyof typeof HTTP_STATUS_SERVER_ERROR];
    /**
     * Get status category
     */
    readonly getCategory: (code: number) => HttpStatusCategory | null;
    /**
     * Get status message
     */
    readonly getMessage: (code: number) => string | null;
    /**
     * Check if status code is valid
     */
    readonly isValid: (code: number) => code is HttpStatusCode;
    /**
     * Check if status code indicates success
     */
    readonly isSuccessCode: (code: number) => boolean;
    /**
     * Check if status code indicates an error
     */
    readonly isErrorCode: (code: number) => boolean;
    /**
     * Check if status code indicates client error
     */
    readonly isClientErrorCode: (code: number) => boolean;
    /**
     * Check if status code indicates server error
     */
    readonly isServerErrorCode: (code: number) => boolean;
};
/**
 * HTTP status code interface
 */
export interface HttpStatus {
    code: HttpStatusCode;
    message: HttpStatusMessage;
    category: HttpStatusCategory;
    isInformational: boolean;
    isSuccess: boolean;
    isRedirection: boolean;
    isClientError: boolean;
    isServerError: boolean;
}
/**
 * Create HTTP status object from code
 */
export declare const createHttpStatus: (code: number) => HttpStatus | null;
/**
 * All HTTP status codes for easy export
 */
export declare const ALL_STATUS_CODES: {
    readonly INFO: {
        /**
         * 100 Continue
         * The server has received the request headers and the client should proceed to send the request body
         */
        readonly CONTINUE: 100;
        /**
         * 101 Switching Protocols
         * The requester has asked the server to switch protocols
         */
        readonly SWITCHING_PROTOCOLS: 101;
        /**
         * 102 Processing
         * The server has received and is processing the request, but no response is available yet
         */
        readonly PROCESSING: 102;
        /**
         * 103 Early Hints
         * Used to return some response headers before final HTTP message
         */
        readonly EARLY_HINTS: 103;
    };
    readonly SUCCESS: {
        /**
         * 200 OK
         * Standard response for successful HTTP requests
         */
        readonly OK: 200;
        /**
         * 201 Created
         * The request has been fulfilled and resulted in a new resource being created
         */
        readonly CREATED: 201;
        /**
         * 202 Accepted
         * The request has been accepted for processing, but the processing has not been completed
         */
        readonly ACCEPTED: 202;
        /**
         * 203 Non-Authoritative Information
         * The server is a transforming proxy that received a 200 OK from its origin, but is returning a modified version
         */
        readonly NON_AUTHORITATIVE_INFORMATION: 203;
        /**
         * 204 No Content
         * The server successfully processed the request and is not returning any content
         */
        readonly NO_CONTENT: 204;
        /**
         * 205 Reset Content
         * The server successfully processed the request, but is not returning any content and requires the requester to reset the document view
         */
        readonly RESET_CONTENT: 205;
        /**
         * 206 Partial Content
         * The server is delivering only part of the resource due to a range header sent by the client
         */
        readonly PARTIAL_CONTENT: 206;
        /**
         * 207 Multi-Status
         * The message body that follows is an XML message and can contain a number of separate response codes
         */
        readonly MULTI_STATUS: 207;
        /**
         * 208 Already Reported
         * The members of a DAV binding have already been enumerated in a previous reply to this request
         */
        readonly ALREADY_REPORTED: 208;
        /**
         * 226 IM Used
         * The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations
         */
        readonly IM_USED: 226;
    };
    readonly REDIRECT: {
        /**
         * 300 Multiple Choices
         * Indicates multiple options for the resource that the client may follow
         */
        readonly MULTIPLE_CHOICES: 300;
        /**
         * 301 Moved Permanently
         * This and all future requests should be directed to the given URI
         */
        readonly MOVED_PERMANENTLY: 301;
        /**
         * 302 Found
         * The requested resource resides temporarily under a different URI
         */
        readonly FOUND: 302;
        /**
         * 303 See Other
         * The response to the request can be found under another URI using a GET method
         */
        readonly SEE_OTHER: 303;
        /**
         * 304 Not Modified
         * Indicates that the resource has not been modified since the version specified by the request headers
         */
        readonly NOT_MODIFIED: 304;
        /**
         * 305 Use Proxy
         * The requested resource is available only through a proxy, the address for which is provided in the response
         */
        readonly USE_PROXY: 305;
        /**
         * 306 Unused
         * This status code was used in a previous version of the HTTP specification, is no longer used, and is reserved
         */
        readonly UNUSED: 306;
        /**
         * 307 Temporary Redirect
         * The request should be repeated with another URI, but future requests can still use the original URI
         */
        readonly TEMPORARY_REDIRECT: 307;
        /**
         * 308 Permanent Redirect
         * The request and all future requests should be repeated using another URI
         */
        readonly PERMANENT_REDIRECT: 308;
    };
    readonly CLIENT_ERROR: {
        /**
         * 400 Bad Request
         * The server cannot or will not process the request due to an apparent client error
         */
        readonly BAD_REQUEST: 400;
        /**
         * 401 Unauthorized
         * The request requires user authentication
         */
        readonly UNAUTHORIZED: 401;
        /**
         * 402 Payment Required
         * Reserved for future use
         */
        readonly PAYMENT_REQUIRED: 402;
        /**
         * 403 Forbidden
         * The request was valid, but the server is refusing action
         */
        readonly FORBIDDEN: 403;
        /**
         * 404 Not Found
         * The requested resource could not be found
         */
        readonly NOT_FOUND: 404;
        /**
         * 405 Method Not Allowed
         * A request method is not supported for the requested resource
         */
        readonly METHOD_NOT_ALLOWED: 405;
        /**
         * 406 Not Acceptable
         * The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request
         */
        readonly NOT_ACCEPTABLE: 406;
        /**
         * 407 Proxy Authentication Required
         * The client must first authenticate itself with the proxy
         */
        readonly PROXY_AUTHENTICATION_REQUIRED: 407;
        /**
         * 408 Request Timeout
         * The server timed out waiting for the request
         */
        readonly REQUEST_TIMEOUT: 408;
        /**
         * 409 Conflict
         * The request could not be processed because of conflict in the request
         */
        readonly CONFLICT: 409;
        /**
         * 410 Gone
         * The requested resource is no longer available and will not be available again
         */
        readonly GONE: 410;
        /**
         * 411 Length Required
         * The request did not specify the length of its content, which is required by the requested resource
         */
        readonly LENGTH_REQUIRED: 411;
        /**
         * 412 Precondition Failed
         * The server does not meet one of the preconditions that the requester put on the request
         */
        readonly PRECONDITION_FAILED: 412;
        /**
         * 413 Payload Too Large
         * The request is larger than the server is willing or able to process
         */
        readonly PAYLOAD_TOO_LARGE: 413;
        /**
         * 414 URI Too Long
         * The URI provided was too long for the server to process
         */
        readonly URI_TOO_LONG: 414;
        /**
         * 415 Unsupported Media Type
         * The request entity has a media type which the server or resource does not support
         */
        readonly UNSUPPORTED_MEDIA_TYPE: 415;
        /**
         * 416 Range Not Satisfiable
         * The client has asked for a portion of the file, but the server cannot supply that portion
         */
        readonly RANGE_NOT_SATISFIABLE: 416;
        /**
         * 417 Expectation Failed
         * The server cannot meet the requirements of the Expect request-header field
         */
        readonly EXPECTATION_FAILED: 417;
        /**
         * 418 I'm a teapot
         * This code was defined in 1998 as one of the traditional IETF April Fools' jokes
         */
        readonly IM_A_TEAPOT: 418;
        /**
         * 421 Misdirected Request
         * The request was directed at a server that is not able to produce a response
         */
        readonly MISDIRECTED_REQUEST: 421;
        /**
         * 422 Unprocessable Entity
         * The request was well-formed but was unable to be followed due to semantic errors
         */
        readonly UNPROCESSABLE_ENTITY: 422;
        /**
         * 423 Locked
         * The resource that is being accessed is locked
         */
        readonly LOCKED: 423;
        /**
         * 424 Failed Dependency
         * The request failed because it depended on another request and that request failed
         */
        readonly FAILED_DEPENDENCY: 424;
        /**
         * 426 Upgrade Required
         * The client should switch to a different protocol
         */
        readonly UPGRADE_REQUIRED: 426;
        /**
         * 428 Precondition Required
         * The origin server requires the request to be conditional
         */
        readonly PRECONDITION_REQUIRED: 428;
        /**
         * 429 Too Many Requests
         * The user has sent too many requests in a given amount of time
         */
        readonly TOO_MANY_REQUESTS: 429;
        /**
         * 431 Request Header Fields Too Large
         * The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large
         */
        readonly REQUEST_HEADER_FIELDS_TOO_LARGE: 431;
        /**
         * 451 Unavailable For Legal Reasons
         * A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource
         */
        readonly UNAVAILABLE_FOR_LEGAL_REASONS: 451;
    };
    readonly SERVER_ERROR: {
        /**
         * 500 Internal Server Error
         * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable
         */
        readonly INTERNAL_SERVER_ERROR: 500;
        /**
         * 501 Not Implemented
         * The server either does not recognize the request method, or it lacks the ability to fulfill the request
         */
        readonly NOT_IMPLEMENTED: 501;
        /**
         * 502 Bad Gateway
         * The server was acting as a gateway or proxy and received an invalid response from the upstream server
         */
        readonly BAD_GATEWAY: 502;
        /**
         * 503 Service Unavailable
         * The server is currently unavailable (because it is overloaded or down for maintenance)
         */
        readonly SERVICE_UNAVAILABLE: 503;
        /**
         * 504 Gateway Timeout
         * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server
         */
        readonly GATEWAY_TIMEOUT: 504;
        /**
         * 505 HTTP Version Not Supported
         * The server does not support the HTTP protocol version used in the request
         */
        readonly HTTP_VERSION_NOT_SUPPORTED: 505;
        /**
         * 506 Variant Also Negotiates
         * The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself
         */
        readonly VARIANT_ALSO_NEGOTIATES: 506;
        /**
         * 507 Insufficient Storage
         * The server is unable to store the representation needed to complete the request
         */
        readonly INSUFFICIENT_STORAGE: 507;
        /**
         * 508 Loop Detected
         * The server detected an infinite loop while processing the request
         */
        readonly LOOP_DETECTED: 508;
        /**
         * 510 Not Extended
         * Further extensions to the request are required for the server to fulfill it
         */
        readonly NOT_EXTENDED: 510;
        /**
         * 511 Network Authentication Required
         * The client needs to authenticate to gain network access
         */
        readonly NETWORK_AUTHENTICATION_REQUIRED: 511;
    };
};
/**
 * Common HTTP methods
 */
export declare const HTTP_METHODS: {
    readonly GET: "GET";
    readonly POST: "POST";
    readonly PUT: "PUT";
    readonly DELETE: "DELETE";
    readonly PATCH: "PATCH";
    readonly HEAD: "HEAD";
    readonly OPTIONS: "OPTIONS";
    readonly CONNECT: "CONNECT";
    readonly TRACE: "TRACE";
};
export type HttpMethod = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];
/**
 * Common HTTP headers
 */
export declare const HTTP_HEADERS: {
    readonly CONTENT_TYPE: "Content-Type";
    readonly CONTENT_LENGTH: "Content-Length";
    readonly ACCEPT: "Accept";
    readonly ACCEPT_ENCODING: "Accept-Encoding";
    readonly ACCEPT_LANGUAGE: "Accept-Language";
    readonly AUTHORIZATION: "Authorization";
    readonly CACHE_CONTROL: "Cache-Control";
    readonly CONNECTION: "Connection";
    readonly COOKIE: "Cookie";
    readonly HOST: "Host";
    readonly ORIGIN: "Origin";
    readonly REFERER: "Referer";
    readonly USER_AGENT: "User-Agent";
    readonly X_FORWARDED_FOR: "X-Forwarded-For";
    readonly X_REQUESTED_WITH: "X-Requested-With";
    readonly X_CSRF_TOKEN: "X-CSRF-Token";
    readonly X_API_KEY: "X-API-Key";
    readonly LOCATION: "Location";
    readonly SET_COOKIE: "Set-Cookie";
    readonly WWW_AUTHENTICATE: "WWW-Authenticate";
    readonly ACCESS_CONTROL_ALLOW_ORIGIN: "Access-Control-Allow-Origin";
    readonly ACCESS_CONTROL_ALLOW_METHODS: "Access-Control-Allow-Methods";
    readonly ACCESS_CONTROL_ALLOW_HEADERS: "Access-Control-Allow-Headers";
    readonly ACCESS_CONTROL_MAX_AGE: "Access-Control-Max-Age";
};
export type HttpHeader = (typeof HTTP_HEADERS)[keyof typeof HTTP_HEADERS];
//# sourceMappingURL=http-status.constants.d.ts.map