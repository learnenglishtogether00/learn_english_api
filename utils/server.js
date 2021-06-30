const successRes = ({ res, msg, data }) => {
  return res.status(201).json({
    success: true,
    message: msg,
    data,
  });
};

const errRes = ({ res, err }) => {
  res.status(500).json({
    success: false,
    message: "Server error. Please try again.",
    error: err.message,
  });
};

export { successRes, errRes };
