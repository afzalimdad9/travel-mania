import Image from "next/image";
import brazil1 from "../../../public/images/brazil.png";
import brazil2 from "../../../public/images/brazil2.png";
import brazil3 from "../../../public/images/brazil3.png";
import thailand1 from "../../../public/images/thailand.jpeg";
import thailand2 from "../../../public/images/thailand2.png";
import thailand3 from "../../../public/images/thailand3.png";

const LocationCard = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-4 mb-4">
          <div className="card image-card">
            <div className="promotion-banner">Honeymoon Package 30% off</div>
            <Image
              src={thailand1}
              className="card-img-top"
              alt="Thailand Chiang Mai"
              fill
            />
            <div className="card-body overlay">
              <h5 className="card-title">Thailand</h5>
              <p className="card-text">Chiang Mai</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 mb-4">
          <div className="card image-card">
            <Image
              src={brazil1}
              className="card-img-top"
              alt="Brazil Rio de Janeiro"
              layout="responsive"
            />
            <div className="card-body overlay">
              <h5 className="card-title">Brazil</h5>
              <p className="card-text">Rio de Janeiro</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 mb-4">
          <div className="card image-card">
            <div className="promotion-banner">30% off For Groups</div>
            <Image
              src={thailand2}
              className="card-img-top"
              alt="Thailand Chiang Mai"
              layout="responsive"
            />
            <div className="card-body overlay">
              <h5 className="card-title">Thailand</h5>
              <p className="card-text">Chiang Mai</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 mb-4">
          <div className="card image-card">
            <Image
              src={brazil2}
              className="card-img-top"
              alt="Brazil Rio de Janeiro"
              fill
            />
            <div className="card-body overlay">
              <h5 className="card-title">Brazil</h5>
              <p className="card-text">Rio de Janeiro</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 mb-4">
          <div className="card image-card">
            <Image
              src={thailand3}
              className="card-img-top"
              alt="Thailand Chiang Mai"
              layout="responsive"
            />
            <div className="card-body overlay">
              <h5 className="card-title">Thailand</h5>
              <p className="card-text">Chiang Mai</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 mb-4">
          <div className="card image-card">
            <Image
              src={brazil3}
              className="card-img-top"
              alt="Brazil Rio de Janeiro"
              fill
            />
            <div className="card-body overlay">
              <h5 className="card-title">Brazil</h5>
              <p className="card-text">Rio de Janeiro</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
