1. route trong nextjs
Đinh nghĩa file page trong nextjs sẽ tự động tạo ra route tương ứng với tên file và thư mục trong thư mục "app". Ví dụ:
```plaintext
- app/
  - page.tsx       -> route: /
  - about/
    - page.tsx        -> route: /about
  - blog/
    - [slug]/
      - page.tsx      -> route: /blog/:slug
```

2. Lấy giá trị slug trong nextjs bằng cách sử dụng useParams
ví dụ:
typescript
đây là cách trong client component:
```tsx
import { useParams } from 'next/navigation';

const BlogPost = () => {
  const { slug } = useParams();
  return <div>Blog Post: {slug}</div>;
};

export default BlogPost;
```

Còn trong server component, bạn có thể lấy giá trị slug từ tham số hàm:
typescript
```tsx
const BlogPost = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return <div>Blog Post: {slug}</div>;
};
export default BlogPost;
```

hoặc 
app/docs/[...slug]/page.tsx
```tsx
export default function DocsPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <p>Đường dẫn: {slug.join(" / ")}</p>;
}
```
Truy cập /docs/nextjs/routing → slug = ['nextjs', 'routing'].

3. bất kỳ component nào trong nextjs đều là server component theo mặc định
bất kỳ component nào có dùng hook, click event, state thì sẽ là client component, ghi chú "use client" ở đầu file.
bất kỳ component nào bên trong 1 client component đều là client component. do đó nên tách riêng client component ra file riêng để tránh việc tất cả component con bên trong đều trở thành client component.

4. share layout giữa các route trong nextjs
ví dụ bạn có cấu trúc thư mục như sau:
```plaintext
- app/
  - layout.tsx          -> layout chung cho tất cả các route
  - about/
    - layout.tsx        -> layout riêng cho route /about và các route con
    - page.tsx
  - blog/
    - [slug]/
      - page.tsx
```
nội dung file layout.tsx:
typescript
```tsx
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
        <body>
            <header>My Website Header</header>
            <main>{children}</main>
            <footer>My Website Footer</footer>
        </body>
        </html>
    );
    }
```

5. cách tạo API route trong nextjs
tạo thư mục "api" bên trong thư mục "app", sau đó tạo file tương ứng với route API bạn muốn. Ví dụ:
```plaintext
- app/
  - api/
    - hello/
      - route.ts       -> route: /api/hello
```
Nội dung file route.ts:
typescript
```ts
import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ message: 'Hello, world!' });
}
export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ receivedData: data });
}
```

cách gọi API GET route từ client component:
```tsx
import { useEffect, useState } from 'react';
const ApiExample = () => {
    const [message, setMessage] = useState('');
    useEffect(() => {
        fetch('/api/hello')
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
    }, []);
    return <div>API Message: {message}</div>;
    };
export default ApiExample;
```

cách gọi API GET route từ server component:
```tsx
import React from 'react';
const ServerApiExample = async () => {
    const res = await fetch('http://localhost:3000/api/hello');
    const data = await res.json();
    return <div>API Message: {data.message}</div>;
    };
export default ServerApiExample;
```

cách gọi API POST route từ client component:
```tsx
import { useState } from 'react';
const PostApiExample = () => {
    const [response, setResponse] = useState(null);
    const handlePost = async () => {
        const res = await fetch('/api/hello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Next.js' }),
        });
        const data = await res.json();
        setResponse(data);
    };
    return (
        <div>
        <button onClick={handlePost}>Send POST Request</button>
        {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    );
    };
export default PostApiExample;
```

cách gọi API POST route từ server component:
```tsx
import React from 'react';
const ServerPostApiExample = async () => {
    const res = await fetch('http://localhost:3000/api/hello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Next.js' }),
    });
    const data = await res.json();
    return <div>API Response: {JSON.stringify(data)}</div>;
    };
export default ServerPostApiExample;
```

6.điều hướng người dùng trong nextjs
có 2 cách để điều hướng người dùng trong nextjs:
dùng link component:
```tsx
import Link from 'next/link';
<Link href="/about">Go to About Page</Link>;
```

dùng hook useRouter trong client component:
```tsx
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/about');
```

7.search params trong nextjs
ví dụ bạn có route /products?category=shoes&sort=price_asc
lấy giá trị search params trong client component:
```tsx
import { useSearchParams } from 'next/navigation';
const SearchParamsExample = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  return (
    <div>
      <p>Category: {category}</p>
      <p>Sort: {sort}</p>
    </div>
  );
};
export default SearchParamsExample;
```

lấy giá trị search params trong server component:
```ts
import { NextRequest } from 'next/server';
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  return (
    <div>
      <p>Category: {category}</p>
      <p>Sort: {sort}</p>
    </div>
  );
}
export default GET;
```

8. thư muc public trong nextjs
ví dụ bạn có file hình ảnh logo.png trong thư mục public:
```plaintext
- public/
  - logo.png
```
bạn có thể truy cập hình ảnh này trong ứng dụng của bạn bằng đường dẫn /logo.png:
```html
<img src="/logo.png" alt="Logo" />;
```

9. group route trong nextjs
dùng ngoặc tròn () để nhóm các route mà không ảnh hưởng đến cấu trúc URL.
ví dụ:
```plaintext
- app/
  - (admin)/
    - layout.tsx      -> layout chung cho tất cả route trong nhóm admin
    - dashboard/
      - layout.tsx
      - page.tsx
    - settings/
      - page.tsx
  - layout.tsx        -> layout chung cho tất cả các route khác
  - page.tsx
```
lúc này thì layout.tsx của dashboard sẽ kế thừa từ layout.tsx của nhóm admin, và layout.tsx của nhóm admin sẽ kế thừa từ layout.tsx chung.
ví dụ trong layout.tsx của nhóm admin:
typescript
```tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <header>Admin Panel Header</header>
        <main>{children}</main>
        <footer>Admin Panel Footer</footer>
      </body>
    </html>
  );
}
```

10. server action và revalidate trong nextjs

```plaintext
app/
  products/
    page.tsx             // Server Component hiển thị sản phẩm
  admin/
    api/
      revalidate-path/
        route.ts          // Server Action revalidate path
      revalidate-tag/
        route.ts          // Server Action revalidate tag
  page.tsx               // Home page
```

1️⃣ Server Component với no-store và revalidate
```tsx
// app/products/page.tsx
export default async function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category || "all";

  // 1. Dữ liệu luôn fetch mới
  const resNoStore = await fetch(`https://api.example.com/products?category=${category}`, {
    cache: 'no-store', // luôn fetch mới
  });
  const dataNoStore = await resNoStore.json();

  // 2. Dữ liệu cache 10 giây
  const resRevalidate = await fetch(`https://api.example.com/products?category=${category}`, {
    next: { revalidate: 10 }, // cache 10 giây
  });
  const dataRevalidate = await resRevalidate.json();

  return (
    <div>
      <h2>Products (No Store)</h2>
      <ul>{dataNoStore.map((p: any) => <li key={p.id}>{p.name}</li>)}</ul>

      <h2>Products (Revalidate 10s)</h2>
      <ul>{dataRevalidate.map((p: any) => <li key={p.id}>{p.name}</li>)}</ul>
    </div>
  );
}
```

2️⃣ Server Action: revalidatePath
```ts
// app/admin/api/revalidate-path/route.ts
import { revalidatePath } from "next/cache";

export async function POST() {
  revalidatePath("/products"); // xóa cache page /products
  return new Response("Path /products revalidated!");
}
```

3️⃣ Server Action: revalidateTag
```ts
// app/admin/api/revalidate-tag/route.ts
import { revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag("products"); // xóa cache tất cả fetch có tag 'products'
  return new Response("Tag 'products' revalidated!");
}
```

Trong ProductsPage, nếu bạn muốn dùng tag:
```ts
const resTag = await fetch(`https://api.example.com/products?category=${category}`, {
  next: { tags: ["products"] }, // gắn tag
});
```
11. router.refresh() trong Next.js


Trong Next.js App Router (13+), mỗi route có server component hoặc data fetch. Khi bạn gọi:
```tsx
import { useRouter } from 'next/navigation';

const router = useRouter();
router.refresh();
```
Nó sẽ làm mới (re-fetch) dữ liệu và server component của route hiện tại, tương tự như tải lại trang
