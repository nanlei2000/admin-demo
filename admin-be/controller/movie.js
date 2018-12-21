const movieModel = require('../model/movie')

exports.list = async (req, res) => {
  const pageSize = 10
  const { page } = req.query
  try {
    const result = await movieModel
      .find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({
        _id: -1
      })
    const allResult = await movieModel.countDocuments({})
    res.json({
      code: 200,
      data: {
        list_data: result,
        total_info: {
          total_count: allResult,
          total_page: Math.ceil(allResult / pageSize)
        }
      }
    })
  } catch (e) {
    res.json({ code: 201, msg: e.message })
  }
}
