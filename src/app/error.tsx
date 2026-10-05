"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="empty-state section">
      <h1>Let’s try that again.</h1>
      <p>
        Something interrupted this page. Your favourites are still saved on this
        device.
      </p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
