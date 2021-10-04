const mongoose = require('mongoose')
const slugify = require('slugify')
const faker = require('faker')
const { sample } = require('lodash')

require('dotenv').config()

faker.locale = 'vi'

const Blogs = mongoose.model('blogs', new mongoose.Schema({}, { strict: false }))

const fixedContent = `
![wallpapersden.com_poster-of-captain-america_3840x2160.jpg](https://res.cloudinary.com/canhdinh2302/image/upload/v1630754969/wallpapersden_com_poster_of_captain_america_3840x2160_31f75e435b.jpg)


## JavaScript ngày đó và bây giờ

JavaScript được tạo trong mười ngày bởi Brandan Eich, một nhân viên của Netscape, vào tháng 9 năm 1995. Được đặt tên đầu tiên là Mocha, tên của nó được đổi thành Mona rồi LiveScript trước khi thật sự trở thành JavaScript nổi tiếng như bây giờ. Phiên bản đầu tiên của ngôn ngữ này bị giới hạn độc quyền bởi Netscape và chỉ có các tính năng hạn chế, nhưng nó tiếp tục phát triển theo thời gian, nhờ một phần vào cộng đồng các lập trình viên đã liên tục làm việc với nó.

Trong năm 1996, JavaScript được chính thức đặt tên là ECMAScript. ECMAScript 2 phát hành năm 1998 và ECMAScript 3 tiếp tục ra mắt vào năm 1999. Nó liên tục phát triển thành JavaScript ngày nay, giờ đã hoạt động trên khắp mọi trình duyệt và trên khắp các thiết bị từ di động đến máy tính bàn.

JavaScript liên tục phát triển kể từ đó, có lục đạt đến 92% website đang sử dụng JavaScript vào năm 2016. Chỉ trong 20 năm, nó từ một ngôn ngữ lập trình riêng trở thành công cụ quan trọng nhất trên bộ công cụ của các chuyên viên lập trình web. Nếu bạn đang dùng internet, vậy chắc chắn bạn đã từng sử dụng JavaScript rồi.

## Cách hoạt động của JavaScript trên trang web là gì?

JavaScript thường được nhúng trực tiếp vào một trang web hoặc được tham chiếu qua file .js riêng. Nó là ngôn ngữ phía client, tức là script được tải về máy của khách truy cập và được xử lý tại đó thay vì phía server là xử lý trên server rồi mới đưa kết quả tới khách truy cập.

Hãy lưu ý là các trình duyệt web phổ biến cũng hỗ trợ việc người dùng có muốn tắt JavaScript hay không. Đó là lý do bạn nên biết trang web sẽ hoạt động như thế nào torng trường hợp không có JavaScript.
`

const seed = async () => {
  await mongoose.connect(process.env.DATABASE_URI)
  try {
    const imgs = await mongoose.connection.collection("upload_file").find({}).toArray()
    const categories = await mongoose.connection.collection("categories").find({}).toArray()
    const imgIDs = imgs.map(({ _id }) => _id)
    const categoryIDs = categories.map(({ _id }) => _id)

    const blogs = Array.from(Array(30).keys()).map(_index => {
      const title = faker.name.jobTitle()

      return {
        title,
        slug: slugify(title).toLowerCase(),
        content: fixedContent,
        categories: [sample(categoryIDs)],
        cover: sample(imgIDs)
      }
    })

    await Blogs.insertMany(blogs)
  } catch (error) {
    console.log(error)
  }
}

Promise.all([seed()]).then(process.exit)
