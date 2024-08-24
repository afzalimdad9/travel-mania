import Image from "next/image";
import Link from "next/link";
import thailand1 from "../../../public/images/thailand.jpeg";
import thailand2 from "../../../public/images/thailand2.png";
import thailand3 from "../../../public/images/thailand3.png";

const LocationCard = () => {
  return (
    <div className="container my-5 py-5">
      <div className="hotel-head">
        <h6 className="mb-3 text-start">Deals and Discounts</h6>
      </div>
      <div className="row">
        {[thailand2, thailand2, thailand3, thailand3].map((image, index) => (
          <div key={index} className="col-12 col-md-3 mb-4">
            <div className="card image-card">
              <div className="promotion-banner">20% OFF</div>
              <Image
                src={image}
                className="card-img-top object-fit-cover"
                alt="Hotel and Apartments"
                layout="responsive"
              />
              <div className="card-body overlay">
                <h6 className="card-title">Two seasons hotel & apartments</h6>
                <p className="card-text fs-6 mt-2">
                  From US$46.80 <del>US $65</del>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationCard;
