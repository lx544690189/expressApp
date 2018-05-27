var express = require('express')
var multer = require('multer')
var upload = multer({ dest: './uploads' })
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'C:/Users/lixin/Desktop/upload')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.')[1])
//   }
// })
// var upload = multer({ storage })

var app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  console.log(req.file)
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据，如果存在的话
  res.send({success:true});
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files 是 `photos` 文件数组的信息
  // req.body 将具有文本域数据，如果存在的话
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files 是一个对象 (String -> Array) 键是文件名，值是文件数组
  //
  // 例如：
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body 将具有文本域数据，如果存在的话
})

// 下載
app.get('/video', function (req, res) {
  res.download('C:/Users/lixin/Desktop/upload/EP01-1527435379174.mp4','demovideo.mp4',);
});


app.use(express.static('public'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});