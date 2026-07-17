import { Link } from 'react-router-dom';

export default function Breadcrumb({ title }) {
  return (
    <section>
      <div className="breadcrumb-area d-flex justify-content-center align-items-center container-box" style={{ backgroundImage: 'url(/assets/img/bg/bdrc-bg.png)' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-wrap text-center">
                <div className="breadcrumb-title">
                  <h2>{title}</h2>
                  <div className="breadcrumb-wrap">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                          {title}
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
