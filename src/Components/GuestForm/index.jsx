import React, { useMemo } from "react";
import { countries } from "iso-3166-1-alpha-2";

const GuestForm = ({ title, type, data, onChange }) => {
  const memoizedForm = useMemo(() => {
    return (
      <div className="passenger-detail-inn">
        <h6>{title}</h6>

        <div className="row">
          <div className="col-12">
            <div className="field">
              <label>Title</label>
              <ul>
                {["Mr", "Mrs", "Ms"].map((opt, idx) => (
                  <li key={idx}>
                    <input
                      type="radio"
                      onChange={() => onChange("gender", opt?.toLowerCase())}
                      checked={data?.gender === opt?.toLowerCase()}
                    />
                    <label htmlFor="gender">{opt}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="field">
              <input
                type="text"
                value={data?.firstName}
                onChange={(e) => onChange("firstName", e.target.value)}
                placeholder="Full Name/Middle Name"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="field">
              <input
                type="text"
                value={data?.lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-6">
            <div className="field date-birth">
              <p>Date of birth</p>
              <input
                type="date"
                value={data?.dob}
                onChange={(e) => onChange("dob", e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-6">
            <div className="field date-birth">
              <select
                value={data?.nationality}
                onChange={(e) => onChange("nationality", e.target.value)}
              >
                <option value="" disabled>
                  Nationality
                </option>
                {Object.keys(countries).map((k, id) => (
                  <option value={k} key={id}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {type === "adult" && (
            <>
              <div className="col-sm-12 col-md-12">
                <div className="travel-doc-head">
                  <h6>Documents</h6>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="field date-birth">
                  <select
                    value={data?.documentType}
                    onChange={(e) => onChange("documentType", e.target.value)}
                  >
                    <option value="" disabled>
                      Document Type
                    </option>
                  </select>
                </div>
              </div>

              <div className="col-sm-12 col-md-6">
                <div className="field date-birth">
                  <select
                    value={data?.country}
                    onChange={(e) => onChange("country", e.target.value)}
                  >
                    <option value="" disabled>
                      Select Country
                    </option>
                    {Object.entries(countries).map(([k, v], id) => (
                      <option value={k} key={id}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }, [title, type, data, onChange]);

  return memoizedForm;
};

export default GuestForm;
