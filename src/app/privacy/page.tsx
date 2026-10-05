export const metadata = { title: "Privacy policy" };
export default function Privacy() {
  return (
    <div className="legal-page section prose">
      <span className="eyebrow">YOUR INFORMATION, CONSIDERED</span>
      <h1>Privacy policy</h1>
      <p>
        This policy describes the data used by this Veloura storefront. The
        merchant must publish its legal identity and privacy contact before
        enabling sales.
      </p>
      <h2>Shopping data on your device</h2>
      <p>
        Your bag and wishlist are saved in your browser’s local storage so they
        remain available when you return. These preferences are not sent to a
        mailing list. Clear your browser’s site data to remove them.
      </p>
      <h2>Payments</h2>
      <p>
        When enabled, checkout sends the selected product identifiers, sizes,
        colours and quantities to our server to create a Stripe checkout
        session. Billing, delivery and payment details are collected directly by
        Stripe. We do not store card numbers in this application.
      </p>
      <h2>Hosting and service providers</h2>
      <p>
        The hosting provider may process technical request data such as IP
        addresses and access logs for security and delivery of the website.
        Stripe processes checkout data according to its own privacy policy. No
        advertising trackers or marketing analytics are included in this
        application.
      </p>
      <h2>Your choices</h2>
      <p>
        You can browse without saving favourites, remove individual bag items,
        or clear local data at any time. For requests about payment information,
        use the merchant contact published in the help section when sales are
        enabled.
      </p>
    </div>
  );
}
