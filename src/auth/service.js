export function initialize(err, user, res) {

  if (err)
    return res.status(400).json({'message': err});
  if (!user)
    return res.status(404).json({'message': 'Something went wrong, please try again.'});

  res.status(200).json(user)

}
