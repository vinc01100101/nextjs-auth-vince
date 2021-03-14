import dbConnect from "@/utils/dbConnect";

export default (req, res) => {
  /*  
  return a promise to prevent stalled-request warning

  warning:
  "API resolved without sending a response for /api/initiate-connection,
  this may result in stalled requests."

  solution:
  https://github.com/vercel/next.js/issues/10439#issuecomment-583214126
  */
  return dbConnect(res);
};
