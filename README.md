# Dự án Frontend sử dụng ReactJS và Polaris

> Ứng dụng được xây dựng bằng **ReactJS** và sử dụng **Polaris** để tạo giao diện người dùng nhất quán, thân thiện.

## Mục lục

1. [Giới thiệu](#giới-thiệu)
2. [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
3. [Cài đặt và chạy ứng dụng](#cài-đặt-và-chạy-ứng-dụng)
4. [Triển khai](#triển-khai)
5. [Kiến trúc và cấu trúc thư mục](#kiến-trúc-và-cấu-trúc-thư-mục)
6. [Các tính năng chính](#các-tính-năng-chính)
7. [Ghi chú kỹ thuật](#ghi-chú-kỹ-thuật)
8. [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)
9. [Liên hệ](#liên-hệ)

---

### Giới thiệu

Ứng dụng này được phát triển nhằm đáp ứng yêu cầu của bài kiểm tra đầu vào cho vị trí Frontend Developer. Ứng dụng có chức năng [miêu tả ngắn gọn chức năng chính], với giao diện dễ sử dụng và codebase chuẩn mực, dễ bảo trì.

### Yêu cầu hệ thống

- **Node.js** phiên bản `>=18.x`
- **npm** phiên bản `>=9.x`

### Cài đặt và chạy ứng dụng

1. **Clone repo**:
   ```bash
   git clone https://github.com/xuanPhuc-1/Polaris-ReactJs.git
   cd Polaris-ReactJs
   ```
2. **Cài đặt các gói phụ thuộc**:
   ```bash
   npm install
   ```
3. **Chạy ứng dụng**:
   ```bash
   npm run dev
   ```
4. **Mở trình duyệt và truy cập vào địa chỉ**:
   ```bash
   http://localhost:3000
   ```
5. **Đăng nhập với tài khoản mặc định**:
   ```bash
   Tài khoản: admin
   Mật khẩu: 123456
   ```

### Triển khai

Ứng dụng này đã được triển khai thành công lên Vercel. Bạn có thể truy cập ứng dụng tại: [URL của ứng ](https://polaris-react-js.vercel.app/).

### Kiến trúc và cấu trúc thư mục

```text
Hooks-Admin
├─ .vscode                # Cấu hình đề xuất cho vscode
├─ public                 # Tệp tài nguyên tĩnh (bỏ qua khi đóng gói)
├─ src
│  ├─ api                 # Quản lý các API
│  ├─ assets              # Tệp tài nguyên tĩnh
│  ├─ components          # Các component toàn cục
│  ├─ config              # Cấu hình toàn cục
│  ├─ enums               # Enum cho dự án
│  ├─ hooks               # Các Hook thường dùng
│  ├─ language            # Đa ngôn ngữ
│  ├─ layouts             # Bố cục khung
│  ├─ routers             # Quản lý router
│  ├─ redux               # redux store
│  ├─ styles              # CSS toàn cục
│  ├─ typings             # Khai báo kiểu dữ liệu toàn cục
│  ├─ utils               # Thư viện tiện ích
│  ├─ views               # Tất cả các trang của dự án
│  ├─ App.tsx             # Trang chính
│  ├─ main.tsx            # Tệp khởi động
│  └─ env.d.ts            # Tệp khai báo vite
├─ .editorconfig          # Cấu hình trình soạn thảo (định dạng)
├─ .env                   # Cấu hình vite thông dụng
├─ .env.development       # Cấu hình môi trường phát triển
├─ .env.production        # Cấu hình môi trường sản xuất
├─ .env.test              # Cấu hình môi trường kiểm thử
├─ .eslintignore          # Bỏ qua kiểm tra Eslint
├─ .eslintrc.js           # Cấu hình kiểm tra Eslint
├─ .gitignore             # Bỏ qua khi đẩy lên git
├─ .prettierignore        # Bỏ qua định dạng prettier
├─ .prettierrc.js         # Cấu hình prettier
├─ .stylelintignore       # Bỏ qua định dạng stylelint
├─ .stylelintrc.js        # Cấu hình định dạng stylelint
├─ CHANGELOG.md           # Nhật ký cập nhật dự án
├─ commitlint.config.js   # Cấu hình chuẩn commit git
├─ index.html             # Trang HTML chính
├─ LICENSE                # Tệp giấy phép mở
├─ lint-staged.config     # Cấu hình lint-staged
├─ package-lock.json      # Khóa phiên bản gói
├─ package.json           # Quản lý gói
├─ postcss.config.js      # Cấu hình postcss
├─ README.md              # Giới thiệu README
├─ tsconfig.json          # Cấu hình toàn cục cho TypeScript
└─ vite.config.ts         # Cấu hình vite
```

### Các tính năng chính

- **Giao diện người dùng**: Sử dụng Polaris để tạo giao diện đơn giản và nhất quán.
- **Chức năng chính**:
  - Dashboard: Hiển thị 2 biểu đồ thống kê.
  - Product: Hiển thị danh sách sản phẩm và các hành động với sản phẩm.
- **Responsive Design**: Tương thích với các kích thước màn hình khác nhau.

### Ghi chú kỹ thuật

- **Polaris**: Được sử dụng cho các thành phần giao diện và bố cục.
- **React Router**: Điều hướng các trang bên trong ứng dụng.
- **Ant Design Components**: Sử dụng các thành phần của Ant Design để tạo giao diện người dùng.

### Hướng dẫn sử dụng

1. **Đăng nhập**:
   - Mở trình duyệt và truy cập vào địa chỉ: `http://localhost:3000`.
   - Đăng nhập với tài khoản mặc định: `admin` và mật khẩu: `123456`.
2. **Tham khảo các chức năng yêu cầu tại đề bài** tại link: [Link đề bài](https://www.figma.com/design/hRwnYxWdMKuay0lfdEjkjO/FE---Test?node-id=0-1&node-type=canvas&t=joGFQE21m7jh2nFh-0).

### Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào, vui lòng liên hệ qua:

- **Email**: phuc.ngolexuan@gmail.com
