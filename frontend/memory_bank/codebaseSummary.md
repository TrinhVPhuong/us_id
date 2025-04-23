# Tóm Tắt Cấu Trúc Codebase

## Các Thành Phần Chính và Tương Tác

- **`src/`**: Chứa mã nguồn chính của ứng dụng.
- **`App.vue`**: Thành phần gốc của ứng dụng.
- **`main.ts`**: Điểm khởi đầu của ứng dụng.
- **`components/`**: Chứa các thành phần giao diện tái sử dụng.
- **`views/`**: Chứa các trang chính của ứng dụng.
- **`router/`**: Cấu hình điều hướng.
- **`stores/`**: Quản lý trạng thái ứng dụng với Pinia.

## Luồng Dữ Liệu

- Sử dụng Pinia để quản lý trạng thái toàn cục.
- Vue Router để điều hướng giữa các trang.

## Phụ Thuộc Bên Ngoài

- **Vue 3**, **Pinia**, **Vue Router**: Xây dựng và quản lý giao diện.
- **TailwindCSS**, **DaisyUI**: Tạo giao diện người dùng hiện đại.
- **Vite**: Build và phát triển ứng dụng.
- **@tailwindcss/vite**: Plugin tích hợp TailwindCSS với Vite.

## Thay Đổi Gần Đây

- Tích hợp TailwindCSS và DaisyUI.
- Cập nhật cấu hình `tailwind.config.js`, `postcss.config.js`, và `main.css`.
- Chuyển `@tailwindcss/vite` và `tailwindcss` từ `dependencies` sang `devDependencies` trong `package.json`.

## Tích Hợp Phản Hồi Người Dùng

- Đang xây dựng hệ thống tài liệu để dễ dàng quản lý và mở rộng dự án.
