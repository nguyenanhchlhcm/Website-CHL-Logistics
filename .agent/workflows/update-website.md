---
description: Quy trình tự động chỉnh sửa và cập nhật website CHL Logistics lên Internet.
---

Khi người dùng yêu cầu "Cập nhật website" hoặc "Sửa nội dung và upload", hãy làm theo các bước sau một cách chính xác:

1. **Xác nhận nội dung cần sửa:**
   Hỏi người dùng muốn sửa đoạn văn, số điện thoại, hay hình ảnh nào? (Nếu người dùng đã nói rõ thì bỏ qua bước này).

2. **Chỉnh sửa file nguồn (Code):**
   Dùng công cụ `replace_file_content` hoặc `multi_replace_file_content` thao tác vào file `d:\XUAN ANH\Antigravity\WebsitesCHLLogistics-demo\index.html` hoặc `styles.css` để cập nhật đúng đoạn nội dung mong muốn.

3. **Thông báo và Mở trình duyệt để Upload (Deploy):**
   - Thông báo cho người dùng biết nội dung đã được sửa trong code thành công.
   - Nhắc người dùng phải luôn đăng nhập Netlify bằng Email: `nguyenanhchl.hcm@gmail.com` qua Google để hệ thống nhận diện đúng dự án.
   - Hãy mở trình duyệt, điều hướng người dùng tới trang tự động Deploy của dự án:
     🔗 `https://app.netlify.com/projects/spectacular-conkies-0def4e/deploys`

4. **Hướng dẫn thao tác cuối cùng:**
   Nhắc người dùng Kéo thư mục `d:\XUAN ANH\Antigravity\WebsitesCHLLogistics-demo\` và thả (drop) vào ô nét đứt ở tuốt phía dưới cuối cùng của màn hình trên trang trình duyệt Netlify vừa mở.
   Sau khi thả xong, website `chl.vn` sẽ được tự động làm mới!
