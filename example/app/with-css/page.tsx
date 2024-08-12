import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="with-css">
      <h1>Home</h1>
      <p>
        This is an example of a Next.js app with CSS transitions using{' '}
        <a
          href="https://github.com/ismamz/next-transition-router"
          target="_blank"
        >
          next-transition-router
        </a>
        .
      </p>
      <Link href="/with-css/about">Go to About →</Link>

      <hr style={{ marginBlock: '3rem' }} />

      <Link href="https://github.com/ismamz/next-transition-router/tree/main/example/with-css">
        See source code for this example
      </Link>
    </main>
  );
}
