import type { Metadata } from "next";
import { SizeTable } from "@/components/product-detail";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Here to help",
  description:
    "Find your fit, care for your favourites, and learn about shipping and returns.",
};
export default function HelpPage() {
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">A LITTLE GUIDANCE</span>
        <h1>
          Here to <em>help.</em>
        </h1>
        <p>Making every part of your Veloura experience a little easier.</p>
      </div>
      <div className="help-layout section">
        <aside>
          <nav aria-label="Help topics">
            <Link href="#sizing">Finding your fit</Link>
            <Link href="#shipping">Shipping & returns</Link>
            <Link href="#care">Fabric care</Link>
            <Link href="#contact">Contact</Link>
          </nav>
        </aside>
        <div className="prose">
          <section id="sizing">
            <h2>Finding your fit</h2>
            <p>
              Using a soft measuring tape, measure your bust at its fullest
              point, your natural waist at its narrowest point, and your hips at
              their fullest point. Keep the tape comfortably level.
            </p>
            <SizeTable />
            <p>
              Measurements are in inches. If you’re between sizes, we recommend
              sizing up for a more relaxed fit. Available sizes vary by piece.
            </p>
          </section>
          <section id="shipping">
            <h2>Shipping & returns</h2>
            <h3>Delivery</h3>
            <p>
              Standard shipping is $8. Orders of $150 or more qualify for
              complimentary shipping. Available destinations, taxes and delivery
              estimates are confirmed in the payment provider’s checkout.
            </p>
            <p>
              This storefront is awaiting merchant payment and fulfillment
              configuration. Orders cannot be completed until secure checkout is
              enabled.
            </p>
            <h3>Return eligibility</h3>
            <p>
              For hygiene reasons, briefs and intimate bottoms are not
              returnable once their packaging or hygiene seal has been opened.
              Unworn bras and sleepwear with original tags may be eligible for
              return. The merchant must confirm the final return window, return
              address and return charges before accepting orders.
            </p>
          </section>
          <section id="care">
            <h2>A little care goes a long way</h2>
            <details open>
              <summary>Lace & delicate fabrics</summary>
              <p>
                Hand wash in cool water with mild detergent. Avoid soaking,
                twisting or wringing. Gently press out water with a clean towel
                and lay flat to dry.
              </p>
            </details>
            <details>
              <summary>Satin sleepwear</summary>
              <p>
                Hand wash cool, separately from other colours. Air dry away from
                direct sunlight. If needed, steam gently or use a cool iron on
                the reverse side.
              </p>
            </details>
            <details>
              <summary>Cotton essentials</summary>
              <p>
                Wash cool on a gentle cycle in a laundry bag. Reshape while damp
                and air dry. Always follow the individual garment’s care label.
              </p>
            </details>
          </section>
          <section id="contact">
            <h2>Let’s talk</h2>
            <p>
              Have a question about fit, a fabric, or your order? The merchant’s
              customer support address will be published here before the store
              starts accepting orders.
            </p>
            <p>
              In the meantime, our size and care guides are here to help you
              explore with confidence.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
