
export default (req, res) => {
  console.log(req.body.result);
  res.status(200).send({});
};
