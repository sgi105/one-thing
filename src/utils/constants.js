// change to production when building for deployment
const MODE = 'production'

// STRIPE KEY
const STRIPE_KEY_TEST =
  'pk_test_51LgiKSBBaTjOoNo9MoH7CmBRT2uagI0LUqJQTKP4qDGlFedXjxJK9npe2Kt9TbtXc0kvbn0NVRS6qJ4mwr0Y4Oph00BVlRwWEH'
const STRIPE_KEY_LIVE =
  'pk_live_51LgiKSBBaTjOoNo9YX9Ul9Jebf6YRnC41sS3l6g38uVd1wfN0D996ZlR3QkLQ2WRox0bcYsxxtswYFFEm0Rfjbf400sx8Mfeji'

// SERVER_URL
const SERVER_URL_TEST = 'http://localhost:8000/api'
const SERVER_URL_LIVE = 'https://onething-server-rafa.herokuapp.com/api'

export const STRIPE_KEY =
  MODE === 'development' ? STRIPE_KEY_TEST : STRIPE_KEY_LIVE
export const SERVER_URL =
  MODE === 'development' ? SERVER_URL_TEST : SERVER_URL_LIVE
